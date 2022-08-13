import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import StoryblokComponent from '~/components/StoryblokComponent';
import storyblokService from '~/storyblok/service';
import type { PageStoryblok } from '~/storyblok/storyblok';

type ContentPageModel = {
  content: any[];
  title: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await storyblokService.getStory<PageStoryblok>(params.slug);

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
    <div>
      {data.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </div>
  );
}
