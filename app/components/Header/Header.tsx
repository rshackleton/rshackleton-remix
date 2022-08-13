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
    <header className="flex items-center p-4 text-base">
      <Link className="inline-block underline-offset-2 hover:underline" to="/">
        Richard Shackleton
      </Link>
      <Navigation className="ml-auto" items={props.items} />
    </header>
  );
};

export default Header;
