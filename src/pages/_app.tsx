import { AppProps } from 'next/app';
import { Header } from '../components/Header/Header';
import { SessionProvider as NextauthProvider } from 'next-auth/react';

import '../styles/global.scss'
import { PrismicProvider } from '@prismicio/react';

function MyApp({ Component, pageProps: {session , ...pageProps} }: AppProps) {

  return (
    <NextauthProvider session={session}>
      <PrismicProvider >
        <Header />
        <Component  {...pageProps} />
      </PrismicProvider>
    </NextauthProvider>
  )
}

export default MyApp;
