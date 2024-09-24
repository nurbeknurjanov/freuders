import React, { PropsWithChildren } from 'react';

//Template works after layout
//it should work after page
//but page seems cached, so template cached too
export default function Template({ children }: PropsWithChildren) {
  return <>{children}</>;
}
