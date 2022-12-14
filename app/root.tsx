import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';
import { useStoryblokBridge } from './storyblok/useStoryblokBridge';
import styles from './styles/app.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const Document: React.FC = (props) => {
  useStoryblokBridge();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {props.children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
};

const App: React.FC = () => {
  return (
    <Document>
      <Outlet />
    </Document>
  );
};

export default App;

export const CatchBoundary: React.FC = () => {
  const caught = useCatch();

  return (
    <Document>
      <h1>
        {caught.status}&nbsp;{caught.statusText}
      </h1>
    </Document>
  );
};

export const ErrorBoundary: React.FC<{ error: Error }> = (props) => {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{props.error.message}</pre>
    </Document>
  );
};
