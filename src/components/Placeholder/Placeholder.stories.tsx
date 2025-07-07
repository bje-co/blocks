import { Placeholder } from './Placeholder';

const DATA = [
  {
    id: 1,
    title: 'Placeholder Title',
    body:
      'This is a placeholder body text that can be used to demonstrate the component.',
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Placeholder',
  component: Placeholder,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Data = {
  args: {
    data: DATA,
  },
};

export const Children = {
  args: {
    children: 'Hello there!',
  },
};

export const Both = {
  args: {
    data: DATA,
    children: 'This is some great placeholder content!',
  },
};
