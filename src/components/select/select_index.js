import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const MuiSelect = ({
  name,
  label,
  options,
  value,
  valueKey,
  handleChange,
  error,
  helperText,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      size="small"
      fullWidth
      variant="outlined"
      className={classes.formControl}
    >
      <InputLabel>{name}</InputLabel>
      <Select
        labelId={name}
        value={value}
        onChange={handleChange}
        label={label}
        error={error}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option[valueKey]}
          </MenuItem>
        ))}
      </Select>
      {error && helperText && (
        <p class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
          {helperText}
        </p>
      )}
    </FormControl>
  );
};

MuiSelect.propTypes = {
  /** Name of the select field */
  name: PropTypes.string,

  /** Label of the select field */
  label: PropTypes.string,

  /** Array of option objects to show in dropdown */
  options: PropTypes.array.isRequired,

  /** Value selected */
  value: PropTypes.object.isRequired,

  /** The key in the object that determines the value associated with an option */
  valueKey: PropTypes.string.isRequired,

  /** Function to handle change of select field */
  handleChange: PropTypes.func.isRequired,

  /** If the select field has an error */
  error: PropTypes.bool,

  /** Helper/Error text to show below the field */
  helperText: PropTypes.string,
};

export default MuiSelect;
