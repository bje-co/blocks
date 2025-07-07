type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [prop: string]: Json };

export interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Json;
}

/**
 * A simple placeholder component that can display JSON data.
 */
export const Placeholder = ({ data, children, ...rest }: PlaceholderProps) => {
  return (
    <div {...rest}>
      {children}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
