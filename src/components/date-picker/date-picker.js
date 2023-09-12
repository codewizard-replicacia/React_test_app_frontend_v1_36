import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  makeStyles,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const MuiDatePicker = ({
  name,
  value,
  handleChange
}) => {
  const classes = useStyles();

  return (
    <FormControl
      size="small"
      fullWidth
      variant="outlined"
      className={classes.formControl}
    >
      <TextField
        type="datetime-local"
        name={name}
        value={value}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};

MuiDatePicker.propTypes = {
  /** Name of the date field */
  name: PropTypes.string,

  /** Date value */
  value: PropTypes.string.isRequired,

  /** Function to handle change of date field */
  handleChange: PropTypes.func.isRequired,
};

export default MuiDatePicker;
