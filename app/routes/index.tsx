import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return {
    title: `Richard Shackleton - Home`,
  };
};

export default function Index() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
