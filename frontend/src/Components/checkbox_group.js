import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

export default function CheckboxGroup({items}) {
  const initialState = {};
  items.forEach((item) => {
    initialState[item] = false;
  });

  const [state, setState] = React.useState(initialState);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const error = !Object.values(state).some((v) => v);

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3, color: "lightgrey" }}
        variant="standard"
      >
        <FormGroup>
          <Grid container spacing={2}>
            {items.map((item, _) => (
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox checked={state[item]} onChange={handleChange} name={item} />
                  }
                  label={ item.charAt(0).toUpperCase() + item.slice(1) }
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <FormHelperText>{error ? "Debe seleccionar al menos una opción" : ""}</FormHelperText>
      </FormControl>
    </Box>
  );
}
