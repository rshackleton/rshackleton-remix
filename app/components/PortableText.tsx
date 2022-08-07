import { PortableText as SanityPortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import * as React from 'react';
import { client } from '~/sanity/client';
import ArticleSummary from './ArticleSummary';
import Tweet from './Tweet';

export type PortableTextProps = {
  value: any;
};

const PortableText: React.FC<PortableTextProps> = (props) => {
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('PortableText :: Nodes ::', props.value.length);
    console.dir(props.value);
    console.groupEnd();
  }

  return (
    <SanityPortableText
      components={{
        types: {
          articleSummary: (props) => {
            return <ArticleSummary id={props.value.article._ref} />;
          },
          code: (props) => {
            return <pre>{props.value.content}</pre>;
          },
          image: (props) => {
            const builder = imageUrlBuilder(client);
            return <img alt="" src={builder.image(props.value).url()} />;
          },
          tweet: (props) => {
            return <Tweet url={props.value.url} />;
          },
        },
      }}
      value={props.value}
    />
  );
};

export default PortableText;
