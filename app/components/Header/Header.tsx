import { Link } from '@remix-run/react';
import * as React from 'react';
import Navigation from '../Navigation/Navigation';

export type NavigationItem = {
  id: string;
  title: string;
  url: string;
};

export type HeaderProps = {
  items: NavigationItem[];
};

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="flex flex-col items-center px-4 py-12 text-base">
      <Link
        className="inline-block pb-4 font-bold underline-offset-4 text-xl hover:underline"
        to="/"
      >
        Richard Shackleton
      </Link>
      <Navigation items={props.items} />
    </header>
  );
};

export default Header;
