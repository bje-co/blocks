export interface ExternalLinkProperties
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'rel'> {
  rel?: string;
}

/**
 * A component for rendering external links with appropriate attributes.
 * It sets the `target` to `_blank` and adds `noopener` and `noreferrer` to the `rel` attribute.
 */
export function ExternalLink(props: ExternalLinkProperties) {
  return (
    <a
      {...props}
      target='_blank'
      rel={['noopener', 'noreferrer', props.rel]
        .filter((e) => e != null)
        .join(' ')}
    />
  );
}
