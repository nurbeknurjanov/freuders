import React, { PropsWithChildren } from 'react';

//Layout works before template, one time
//layout works after page
export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
