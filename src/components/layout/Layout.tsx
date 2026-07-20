import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: Readonly<LayoutProps>) => {
  return <div className={className}>{children}</div>;
};
