import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';
import { ApiRole } from 'ordercloud-javascript-sdk'
import OcProvider from '../ordercloud/redux/ocProvider'

// Using bootstrap and nprogress are completely optional.
//  bootstrap is used here to provide a clean layout for samples, without needing extra CSS in the sample app
//  nprogress provides a loading indicator on page/route changes
// Remove these in package.json as well if removed here.
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';

const clientId = process.env.NEXT_PUBLIC_OC_CLIENT_ID || ''
const scope = process.env.NEXT_PUBLIC_OC_SCOPE
  ? (process.env.NEXT_PUBLIC_OC_SCOPE.split(',') as ApiRole[])
  : []
const baseApiUrl = process.env.NEXT_PUBLIC_OC_BASE_API_URL
const allowAnonymous = Boolean(process.env.NEXT_PUBLIC_OC_ALLOW_ANONYMOUS)

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <OcProvider
      config={{
        clientId,
        scope,
        baseApiUrl,
        allowAnonymous,
        cookieOptions: {
          prefix: 'hds-nextjs',
          path: '/',
        },
      }}
    >
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <Component {...rest} />
    </I18nProvider>
    </OcProvider>
  );
}

export default App;
