import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import StoryblokComponent from '~/components/StoryblokComponent';
import storyblokService from '~/storyblok/service';
import type { PageStoryblok } from '~/storyblok/storyblok';

type ArticlesPageModel = {
  content: any[];
  title: string;
};

export const loader: LoaderFunction = async () => {
  const data = await storyblokService.getStory<PageStoryblok>('articles');

  const model: ArticlesPageModel = {
    content: data.body ?? [],
    title: data.title,
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

export default function ArticlesPage() {
  const data = useLoaderData<ArticlesPageModel>();

  return (
    <div>
      {data.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </div>
  );
}
