import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import StoryblokComponent from '~/components/StoryblokComponent';
import storyblokService from '~/storyblok/service';
import type { PageStoryblok } from '~/storyblok/storyblok';

type HomePageModel = {
  content: any[];
  title: string;
};

export const loader: LoaderFunction = async () => {
  const data = await storyblokService.getStory<PageStoryblok>('home');

  const model: HomePageModel = {
    content: data.content.body ?? [],
    title: data.content.title,
  };

  return json(model);
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: `Richard Shackleton - Page Not Found`,
    };
  }

  return {
    title: `Richard Shackleton - ${data.title}`,
  };
};

export default function HomePage() {
  const data = useLoaderData<HomePageModel>();

  return (
    <>
      {data.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </>
  );
}
