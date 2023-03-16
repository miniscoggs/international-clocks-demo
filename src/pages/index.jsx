import { useMemo, useEffect, useState } from 'react';
import Head from 'next/head'
// import individual material components to save package size in small demo
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import individual lodash functions to save package size in small demo
import uniq from 'lodash/uniq';
import reject from 'lodash/reject';

import AddClockModal from '../components/modals/AddClockModal';
import ClockCard from '../components/ClockCard';

/**
 * Index page for displaying international times.
 */
const Index = () => {
  const [displayTimezones, setDisplayTimezones] = useState(['Local']);

  return (
    <>
      <Head>
        <title>International Clocks</title>
        <meta name="description" content="International clock display" />
      </Head>
      <main>
        <Grid container justifyContent="left" alignItems="center">
          <Grid item>
            <Typography component="h1" variant="h2">
              International Clocks
            </Typography>
          </Grid>
          <Grid item>
            <AddClockModal
              onAdd={(newTimezone)=> {
                setDisplayTimezones(uniq([...displayTimezones, newTimezone]));
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          {displayTimezones.map(timezone => (
            <ClockCard
              timezone={timezone}
              key={timezone}
              onRemove={() => setDisplayTimezones(reject(displayTimezones, displayTimezone => timezone === displayTimezone))}
            />
          ))}
        </Grid>
      </main>
    </>
  );
};

export default Index;
