import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';

import type { PageStoryblok } from '~/storyblok/storyblok';

type ContentPageModel = {
  content: any[];
  title: string;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.slug) {
    throw new Response('Not Found', { status: 404 });
  }

  const service = new StoryblokService(request);

  const data = await service.getStory<PageStoryblok>(params.slug);

  const model: ContentPageModel = {
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

export default function ContentPage() {
  const data = useLoaderData<ContentPageModel>();

  return (
    <>
      {data.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </>
  );
}
