import { Studio } from 'sanity';
import config from '~/sanity/sanity.config';
import styles from '~/styles/sanity.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function StudioPage() {
  return <Studio config={config} />;
}
