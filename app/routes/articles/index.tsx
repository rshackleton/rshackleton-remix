import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return {
    title: `Richard Shackleton - Articles`,
  };
};

export default function ArticlesIndex() {
  return (
    <div>
      <h1>Articles</h1>
    </div>
  );
}
