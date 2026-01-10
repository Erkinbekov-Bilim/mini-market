import type React from 'react';
import type { PropsWithChildren } from 'react';
import './Layout.css';
import Header from '../components/Header/Header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
