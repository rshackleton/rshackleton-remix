import { storyblokEditable } from '@storyblok/js';
import * as React from 'react';
import type { HeroBannerStoryblok } from '~/storyblok/storyblok';
import type { ComponentData } from '../StoryblokComponent';
import StoryblokLink from '../StoryblokLink/StoryblokLink';

export type HeroBannerProps = ComponentData & HeroBannerStoryblok;

const HeroBanner: React.FC<HeroBannerProps> = (props) => {
  return (
    <div {...storyblokEditable(props)}>
      <h1>{props.title}</h1>
      {props.content && <p>{props.content}</p>}
      {props.cta && (
        <StoryblokLink link={props.cta}>{props.ctaText}</StoryblokLink>
      )}
    </div>
  );
};

export default HeroBanner;
