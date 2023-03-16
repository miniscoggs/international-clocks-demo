import {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
// import individual material components to save package size in small demo
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useApi } from './hocs/ApiClient';

/**
 * Modal component to display a clock for a given timezone
 *
 * @param {Object} props - props for the component
 * @param {string} [props.timezone] - timezone string for time to be displayed
 * @param {function} [props.onRemove] - function to be called to remove clock from parent state
 */
const ClockCard = ({ timezone, onRemove }) => {
  const { apiClient } = useApi();

  // get CancelToken to gracefully cancel pending requests when component unmounts
  const cancelToken = useMemo(() => apiClient.getCancelToken(), [apiClient]);
  useEffect(() => () => cancelToken.cancel(), [cancelToken]);

  const [datetime, setDatetime] = useState(null);

  // Fetch inital time
  useEffect(() => {
    apiClient.timezone(timezone, cancelToken).then(({ data: { datetime, timezone: timezoneResponse } }) => {
      setDatetime({
        name: timezone,
        timezone: timezoneResponse,
        datetimeObject: new Date(datetime)
      });
    }).catch((error) => {
      // for demo just put errors into console
      console.error(error);
    });
  }, []);

  return (
    <Grid item>
      <Card>
        {datetime && (
          <>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {datetime.name}
              </Typography>
              <Typography>
                {datetime.datetimeObject.toLocaleTimeString('en-GB', { timeZone: datetime.timezone })}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={onRemove}>remove</Button>
            </CardActions>
          </>
        )}
      </Card>
    </Grid>
  );
};

ClockCard.propTypes = {
  timezone: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default ClockCard;