import * as React from 'react';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex items-center p-4">
      <p className="text-sm text-slate-500">
        &copy; Richard Shackleton {new Date().getUTCFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
