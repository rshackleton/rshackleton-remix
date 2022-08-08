import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const url = new URL(request.url);

  let markup: string;

  // Handle styled components SSR for studio.
  if (url.pathname.startsWith('/studio')) {
    const sheet = new ServerStyleSheet();

    markup = renderToString(
      sheet.collectStyles(
        <RemixServer context={remixContext} url={request.url} />,
      ),
    );

    // Replace placeholder.
    const styles = sheet.getStyleTags();
    markup = markup.replace('__STYLES__', styles);
  } else {
    markup = renderToString(
      <RemixServer context={remixContext} url={request.url} />,
    );

    // Remove placeholder.
    markup = markup.replace('__STYLES__', '');
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
