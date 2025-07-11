#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as reactDocgen from 'react-docgen';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse = traverseModule.default;

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Load package.json ===
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);
const packageName = packageJson.name || 'Component Documentation';
const packageDescription = packageJson.description || '';

// === Setup paths ===
const SRC_DIR = path.resolve(__dirname, '../src');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.ts');
const OUTPUT_FILE = path.resolve(__dirname, '../README.md');

const visitedFiles = new Set();
const componentFiles = new Set();

// === Step 1: Collect reachable exports ===
function collectExportedFiles(filePath) {
  if (visitedFiles.has(filePath)) return;
  visitedFiles.add(filePath);

  const content = fs.readFileSync(filePath, 'utf8');
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const source = path.node.source?.value;
      if (source) resolveAndCollect(filePath, source);
    },
    ExportAllDeclaration(path) {
      const source = path.node.source?.value;
      if (source) resolveAndCollect(filePath, source);
    },
  });
}

function resolveAndCollect(currentFile, importPath) {
  const dir = path.dirname(currentFile);
  const resolvedPath = path.resolve(dir, importPath);
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  const variants = [
    resolvedPath,
    resolvedPath + '/index',
    resolvedPath + '/index.ts',
    resolvedPath + '/index.tsx',
  ];

  for (const variant of variants) {
    for (const ext of extensions) {
      const file = variant.endsWith(ext) ? variant : variant + ext;
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        componentFiles.add(file);
        collectExportedFiles(file); // Recursive
        return;
      }
    }
  }
}

// === Step 2: Parse components ===
collectExportedFiles(ENTRY_FILE);

const tocSections = {};
const sectionContentMap = {};

Array.from(componentFiles)
  .filter((file) => /\.(ts|tsx)$/.test(file) && !file.includes('.stories'))
  .forEach((filePath) => {
    let parsed;
    try {
      parsed = reactDocgen.parse(fs.readFileSync(filePath, 'utf8'), {
        filename: filePath,
      });
    } catch {
      return;
    }

    const relPath = path.relative(SRC_DIR, filePath).replace(/\\/g, '/');
    const section = relPath.split('/')[0];
    const components = Array.isArray(parsed) ? parsed : [parsed];

    components.forEach((component) => {
      const displayName = component.displayName || 'UnnamedComponent';
      const description =
        component.description?.trim() || '*No description provided.*';
      const props = component.props || {};

      tocSections[section] ||= [];
      sectionContentMap[section] ||= [];

      if (!tocSections[section].includes(displayName)) {
        tocSections[section].push(displayName);
      }

      const propKeys = Object.keys(props);
      const table =
        propKeys.length > 0
          ? `### Props\n\n| Name | Type | Required | Default | Description |\n|------|------|----------|---------|-------------|\n` +
            propKeys
              .map((key) => {
                const prop = props[key];
                const type = prop.tsType?.raw || prop.tsType?.name || '-';
                const required = prop.required ? 'Yes' : 'No';
                const defaultValue = prop.defaultValue?.value?.trim() || '-';
                const defaultFormatted =
                  defaultValue === '-' ? '-' : 'Custom function';
                const desc = prop.description || '';
                return `| ${key} | \`${type}\` | ${required} | ${defaultFormatted} | ${desc} |`;
              })
              .join('\n')
          : '';

      const sectionBlock = [
        `### [${displayName}](${relPath})`,
        ``,
        description,
        ``,
        table,
        ``,
      ].join('\n');

      sectionContentMap[section].push({ displayName, content: sectionBlock });
    });
  });

// === Step 3: Assemble markdown ===
const sortedSections = Object.keys(tocSections).sort();
let toc = [];
let markdown = `# ${packageName}\n\n${packageDescription}\n\n## Table of Contents\n\n`;

sortedSections.forEach((section) => {
  toc.push(`- [${section}](#${section.toLowerCase()})`);

  const sortedNames = tocSections[section].sort((a, b) => a.localeCompare(b));
  sortedNames.forEach((name) => {
    toc.push(`  - [${name}](#${name.toLowerCase()})`);
  });

  sectionContentMap[section].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );
});

markdown += toc.join('\n') + '\n\n';

sortedSections.forEach((section) => {
  markdown += `## ${section}\n\n`;
  sectionContentMap[section].forEach((entry) => {
    markdown += entry.content + '\n---\n\n';
  });
});

// === Step 4: Write file ===
fs.writeFileSync(OUTPUT_FILE, markdown.trim() + '\n', 'utf8');
console.log(`✅ Documentation written to ${OUTPUT_FILE}`);
