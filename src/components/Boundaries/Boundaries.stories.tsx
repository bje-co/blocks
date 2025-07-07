import { ComponentWithError, ComponentWithLazy } from '../../test-components';
import { Boundaries } from './Boundaries';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Boundaries',
  component: Boundaries,
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
    children: (
      <div>I am a component with no problems. I should render just fine.</div>
    ),
  },
};

export const ErrorBoundary = {
  args: {
    children: <ComponentWithError />,
  },
};

export const SuspenseBoundary = {
  args: {
    children: <ComponentWithLazy />,
  },
};
