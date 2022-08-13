import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Richtext } from '@storyblok/js';
import RichText from '~/components/RichText/RichText';
import { StoryblokService } from '~/storyblok/service';

import type { ArticleStoryblok } from '~/storyblok/storyblok';

type ArticlePageModel = {
  content: Richtext;
  date: string;
  title: string;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.slug) {
    throw new Response('Not Found', { status: 404 });
  }

  const service = new StoryblokService(request);

  const slug = `articles/${params.slug}`;
  const data = await service.getStory<ArticleStoryblok>(slug);

  const model: ArticlePageModel = {
    content: data.content.body,
    date: data.content.date,
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

export default function ArticlePage() {
  const data = useLoaderData<ArticlePageModel>();

  const date = new Date(data.date);

  return (
    <>
      <div className="mx-auto px-4 text-center">
        <h1 className="pb-4 font-bold text-2xl">{data.title}</h1>
        <div className="pb-8 font-medium text-lg">
          <time dateTime={date.toISOString()}>{formatDate(date)}</time>
        </div>
      </div>

      <RichText className="px-4" content={data.content} />
    </>
  );

  function formatDate(value: string | Date): string {
    const formatter = new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return formatter.format(
      typeof value === 'string' ? new Date(value) : value,
    );
  }
}
