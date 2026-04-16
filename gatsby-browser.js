import React from 'react';

import './src/styles/global.css';
import RootElement from './src/components/root-element';

export const wrapPageElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};

// gatsby-browser.tsx
