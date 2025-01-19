import React from 'react'; // Ensure React is imported
import './styles/globals.css'; // Import global CSS here
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
