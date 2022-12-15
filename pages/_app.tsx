import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Layout } from '../components/layout'
import { AuthenticationLayout } from '../components/layout/authentication'

import { trpc } from '../utils/trpc';


const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return <SessionProvider session={session}>
    <Layout {...pageProps}>
      <AuthenticationLayout {...pageProps}>
        <Component {...pageProps} />
      </AuthenticationLayout>
    </Layout>
  </SessionProvider>;
};
export default trpc.withTRPC(MyApp);