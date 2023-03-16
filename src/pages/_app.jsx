
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import PropTypes from 'prop-types';

import { ApiClientProvidor } from '../components/hocs/ApiClient';

/**
 * Root of Next app.
 */
const App = ({ Component, pageProps }) => (
  <ApiClientProvidor>
    <Component {...pageProps} />
  </ApiClientProvidor>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape().isRequired
};

export default App;