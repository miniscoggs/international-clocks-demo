import { useMemo, useEffect, useState } from 'react';
import Head from 'next/head'
// import individual material components to save package size in small demo
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AddClockModal from '../components/modals/AddClockModal';

/**
 * Index page for displaying international times.
 */
const Index = () => (
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
              console.log(newTimezone);
            }}
          />
        </Grid>
      </Grid>
    </main>
  </>
);

export default Index;
