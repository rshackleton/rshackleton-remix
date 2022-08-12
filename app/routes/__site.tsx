import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import * as React from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import type { NavigationItem } from '~/components/Navigation/Navigation';
import storyblokService from '~/storyblok/service';

type MasterModel = {
  navigation: NavigationItem[];
};

export const loader: LoaderFunction = async () => {
  const data = await storyblokService.get<any>('cdn/links');

  const navigation: NavigationItem[] = Object.values(data.links).map(
    (link: any) => ({
      id: link.id,
      title: link.name,
      url: link.real_path,
    }),
  );

  const master: MasterModel = {
    navigation,
  };

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
      <Header items={data.navigation} />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SiteLayout;
