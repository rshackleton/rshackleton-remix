import * as React from 'react';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <p>&copy; Richard Shackleton {new Date().getUTCFullYear()}</p>
    </footer>
  );
};

export default Footer;
