import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

/**
 * Form input for timezone selection.
 *
 * @param {Object} props - props for the component
 * @param {Array} [props.options] - Array of strings that are options for the autocomplete
 * @param {string} [props.value] - The currently selected timezone from form state
 * @param {Function} [props.onChange] - function from form to update form state with selected value
 */
const TimezoneSelect = ({options, value, onChange}) => (
  <Autocomplete
    id="timezone-select"
    options={options}
    value={value}
    groupBy={timezone => timezone.split('/')[0]}
    renderInput={(params) => <TextField {...params} label="Timezones" />}
    onChange={onChange}
  />
);

TimezoneSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TimezoneSelect.defaultProps = {
  value: null
}

export default TimezoneSelect;