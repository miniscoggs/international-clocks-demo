import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
// import individual material components to save package size in small demo
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CasinoIcon from '@mui/icons-material/Casino';
import AddIcon from '@mui/icons-material/Add';
// import individual lodash functions to save package size in small demo
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import sample from 'lodash/sample';

import { useApi } from '../hocs/ApiClient';
import TimezoneSelect from '../inputs/TimezoneSelect';

/**
 * Form to select a timezone to create a new clock from.
 *
 * @param {Object} props - props for the component
 * @param {function} [props.onSubmit] - function to add the timezone once selected, accepts 1 param: data object
 */
const NewClockForm = ({ onSubmit }) => {
  const { apiClient } = useApi();

  // get CancelToken to gracefully cancel pending requests when component unmounts
  const cancelToken = useMemo(() => apiClient.getCancelToken(), [apiClient]);
  useEffect(() => () => cancelToken.cancel(), [cancelToken]);

  const [timezones, setTimezones] = useState(null);

  const [selectedTimezone, setSelectedTimezone] = useState(null);

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

  if (!timezones) {
    return <CircularProgress />;
  }
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item md={8}>
        <TimezoneSelect
          options={timezones}
          value={selectedTimezone}
          onChange={(event, value) => {
            setSelectedTimezone(value);
          }}
        />
      </Grid>
      <Grid item md={1}>
        <IconButton onClick={() => setSelectedTimezone(sample(timezones))}>
          <CasinoIcon />
        </IconButton>
      </Grid>
      <Grid item md={3}>
        <Button
          disabled={!selectedTimezone}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => onSubmit({ timezone: selectedTimezone })}
        >
          Add
        </Button>
      </Grid>
      
    </Grid>
  )
}

NewClockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default NewClockForm;