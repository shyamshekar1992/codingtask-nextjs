// pages/_app.js
import React from 'react';  // Ensure React is imported

import './styles/globals.css'; // Import global CSS here

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
