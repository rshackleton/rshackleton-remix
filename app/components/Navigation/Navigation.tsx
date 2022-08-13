import { Link } from '@remix-run/react';
import * as React from 'react';

export type NavigationItem = {
  id: string;
  title: string;
  url: string;
};

export type NavigationProps = {
  className?: string;
  items: NavigationItem[];
};

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <nav className={props.className}>
      <ul className="flex gap-6">
        {props.items.map((item) => (
          <li key={item.id}>
            <Link
              className="inline-block underline-offset-2 hover:underline"
              prefetch="intent"
              to={item.url}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
