import { Link } from '@remix-run/react';
import * as React from 'react';

export type NavigationItem = {
  id: string;
  title: string;
  url: string;
};

export type NavigationProps = {
  items: NavigationItem[];
};

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <nav>
      <ul>
        {props.items.map((item) => (
          <li key={item.id}>
            <Link prefetch="intent" to={item.url}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
