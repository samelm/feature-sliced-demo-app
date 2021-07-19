import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Pages } from '@brunhild/pages';
import './index.css';

export function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}
