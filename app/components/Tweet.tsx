import * as React from 'react';

export type TweetProps = {
  url: string;
};

const Tweet: React.FC<TweetProps> = (props) => {
  return (
    <div>
      <a href={props.url}>{props.url}</a>
    </div>
  );
};

export default Tweet;
