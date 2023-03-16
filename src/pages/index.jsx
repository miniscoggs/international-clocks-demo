import { useMemo, useEffect, useState } from 'react';
import Head from 'next/head'
// import individual material components to save package size in small demo
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// import individual lodash functions to save package size in small demo
import includes from 'lodash/includes';
import filter from 'lodash/filter';

import { useApi } from '../components/hocs/ApiClient';

/**
 * Index page for displaying international times.
 */
const Index = () => {
  const { apiClient } = useApi();

  const cancelToken = useMemo(() => apiClient.getCancelToken(), [apiClient]);
  useEffect(() => () => cancelToken.cancel(), [cancelToken]);

  const [timezones, setTimezones] = useState([]);

  // onmount fetch the timezone options
  useEffect(() => {
    apiClient.timezones(cancelToken).then(({ data }) => {
      setTimezones(
        filter( // reduce data set for demo
          data,
          timezone => (
            includes(
              [
                'Africa',
                'America',
                'Antarctica',
                'Asia',
                'Atlantic',
                'Australia',
                'Europe',
                'Indian',
                'Pacific'
              ],
              timezone.split('/')[0]
            )
          )
        )
      );
    }).catch((error) => {
      // for demo just put errors into console
      console.error(error);
    });
  }, []);

  return (
    <>
      <Head>
        <title>International Clocks</title>
        <meta name="description" content="International clock display" />
      </Head>
      <main>
        <div>
          <Typography component="h1" variant="h2">
            International Clocks
          </Typography>
          <ul>
            {timezones ? timezones.map(timezone => <li key={timezone}>{timezone}</li>) : <CircularProgress />}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Index;
