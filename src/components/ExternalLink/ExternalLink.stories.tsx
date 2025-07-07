import { ExternalLink } from './ExternalLink';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/ExternalLink',
  component: ExternalLink,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default = {
  args: {
    children: 'Link to Google',
    href: 'https://www.google.com',
  },
};

export const ExtraRel = {
  args: {
    children: 'Link to Google',
    href: 'https://www.google.com',
    rel: 'test',
  },
};
