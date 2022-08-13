import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';

import type { ArticleStoryblok, PageStoryblok } from '~/storyblok/storyblok';

type ArticleModel = {
  id: string;
  date: Date;
  summary: string;
  title: string;
  url: string;
};

type ArticlesPageModel = {
  content: any[];
  items: ArticleModel[];
  title: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const service = new StoryblokService(request);

  const data = await service.getStory<PageStoryblok>('articles');

  const itemData = await service.getStories<ArticleStoryblok>({
    is_startpage: 0,
    starts_with: 'articles/',
  });

  const model: ArticlesPageModel = {
    content: data.content.body ?? [],
    items: itemData.map((item) => ({
      id: item.content._uid,
      date: new Date(item.content.date),
      summary: item.content.summary,
      title: item.content.title,
      url: `/${item.full_slug}`,
    })),
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

export default function ArticlesPage() {
  const data = useLoaderData<ArticlesPageModel>();

  return (
    <>
      {data.items.map((item) => (
        <article key={item.id}>
          <Link prefetch="intent" to={item.url}>
            <h2>{item.title}</h2>
          </Link>
        </article>
      ))}
      {data.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </>
  );
}
