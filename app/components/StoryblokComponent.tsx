import * as React from 'react';

type ComponentType = 'grid' | 'feature' | 'teaser';

const components: Record<ComponentType, React.FC> = {
  grid: () => <div>Grid</div>,
  feature: () => <div>Feature</div>,
  teaser: () => <div>Teaser</div>,
};

interface IBlok {
  component: keyof typeof components;
}

export type StoryblokComponentProps = {
  data: IBlok;
};

const StoryblokComponent: React.FC<StoryblokComponentProps> = (props) => {
  const component = props.data.component;

  if (typeof component !== 'string') {
    return <pre>Invalid value for component.</pre>;
  }

  if (!(component in components)) {
    return <pre>No React component found for component type - {component}</pre>;
  }

  const Component = components[component];

  return React.createElement(Component, props.data as any);
};

export default StoryblokComponent;
