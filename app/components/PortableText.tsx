import { PortableText as SanityPortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import * as React from 'react';
import { client } from '~/sanity/client';

export type PortableTextProps = {
  value: any;
};

const PortableText: React.FC<PortableTextProps> = (props) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(props.value);
  }

  return (
    <SanityPortableText
      components={{
        types: {
          code: (props) => {
            return <pre>{props.value.content}</pre>;
          },
          image: (props) => {
            const builder = imageUrlBuilder(client);
            return <img alt="" src={builder.image(props.value).url()} />;
          },
        },
      }}
      value={props.value}
    />
  );
};

export default PortableText;
