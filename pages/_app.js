import "../styles/globals.css";
import '../styles/multiselect.min.css'
import Head from 'next/head';

//INTERNAL IMPORT
import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from '../Components/index';
import { I18nextProvider } from 'react-i18next';
import i18n from '../pages/i18n';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Head>
        <title>Chat Circuit</title>
    </Head>
    <I18nextProvider i18n={i18n}>
      <ChatAppProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChatAppProvider>
    </I18nextProvider>
  </div>
);

export default MyApp;
