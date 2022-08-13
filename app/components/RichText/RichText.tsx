import type { Richtext } from '@storyblok/js';
import * as React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export type RichTextProps = {
  content: Richtext;
};

const RichText: React.FC<RichTextProps> = (props) => {
  return <div>{render(props.content)}</div>;
};

export default RichText;
