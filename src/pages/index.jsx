import Head from 'next/head'
// import individual material components to save package size in small demo
import Typography from '@mui/material/Typography';

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
      <div>
        <Typography component="h1" variant="h2">
          International Clocks
        </Typography>
      </div>
    </main>
  </>
);

export default Index ;
