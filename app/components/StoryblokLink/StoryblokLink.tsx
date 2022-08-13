import { Link } from '@remix-run/react';
import * as React from 'react';
import type { MultilinkStoryblok } from '~/storyblok/storyblok';

export type StoryblokLinkProps = {
  link: MultilinkStoryblok;
};

const StoryblokLink: React.FC<StoryblokLinkProps> = (props) => {
  switch (props.link.linktype) {
    case 'story':
      return (
        <Link prefetch="intent" to={sanitiseSlug(props.link.cached_url ?? '')}>
          {props.children}
        </Link>
      );

    case 'asset':
      return (
        <a href={props.link.cached_url} rel="noreferrer" target="_blank">
          {props.children}
        </a>
      );

    case 'url':
      return (
        <a href={props.link.cached_url} rel="noreferrer" target="_blank">
          {props.children}
        </a>
      );

    case 'email':
      return <a href={`mailto:${props.link.cached_url}`}>{props.children}</a>;

    default:
      return <span>{props.children}</span>;
  }

  function sanitiseSlug(input: string): string {
    const slug = input.endsWith('/')
      ? input.substring(0, input.length - 1)
      : input;

    return `/${slug}`;
  }
};

export default StoryblokLink;
