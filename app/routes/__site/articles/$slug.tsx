import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Richtext } from '@storyblok/js';
import RichText from '~/components/RichText/RichText';
import storyblokService from '~/storyblok/service';
import type { ArticleStoryblok } from '~/storyblok/storyblok';

type ArticlePageModel = {
  content: Richtext;
  date: string;
  title: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Response('Not Found', { status: 404 });
  }

  const slug = `articles/${params.slug}`;
  const data = await storyblokService.getStory<ArticleStoryblok>(slug);

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
    <div>
      <h1>{data.title}</h1>
      <div>
        <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>
      </div>
      <RichText content={data.content} />
    </div>
  );
}
