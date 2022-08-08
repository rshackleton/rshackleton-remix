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
    <header>
      <Link to="/">Richard Shackleton</Link>
      <Navigation items={props.items} />
    </header>
  );
};

export default Header;
