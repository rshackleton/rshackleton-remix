import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import * as React from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import type { GetMasterResult, MasterModel } from '~/queries/GetMaster';
import { GetMaster } from '~/queries/GetMaster';
import { graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async () => {
  const result = await graphqlClient.request<GetMasterResult>(GetMaster);

  const master = result.Master;

  if (!master) {
    throw json('Page Not Found', { status: 404, statusText: 'Page Not Found' });
  }

  return json(master);
};

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    description: ``,
    'twitter:image': '',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@shackleberry112',
    'twitter:site': '@shackleberry112',
    'twitter:title': ``,
    'twitter:description': ``,
  };
};

export type SiteLayoutProps = {};

const SiteLayout: React.FC<SiteLayoutProps> = () => {
  const data = useLoaderData<MasterModel>();

  return (
    <div id="root">
      <Header
        items={data.navigation.map((item) => ({
          id: item._key,
          title: item.title,
          url: item.toUrl ?? '',
        }))}
      />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SiteLayout;
