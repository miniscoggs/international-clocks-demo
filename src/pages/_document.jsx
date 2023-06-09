import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

/**
 * Main root html document class.
 */
const Document = () => (
  <Html lang="en">
    <Head> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
