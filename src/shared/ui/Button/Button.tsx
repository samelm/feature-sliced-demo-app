import React from 'react';

interface Props {
  children: React.ReactNode;
}

export function Button({ children }: Props): JSX.Element {
  return <button type="button">{children}</button>;
}
