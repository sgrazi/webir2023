import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

export default function CheckboxGroup({ checkedItems, onChange }) {
  const [state, setState] = React.useState(checkedItems);

  const handleChange = (event) => {
    const newState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(newState);
    onChange(newState);
  };

  const error = !Object.values(state).some((v) => v);

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3, color: "lightgrey" }}
        variant="standard"
      >
        <FormGroup>
          <Grid container spacing={2}>
            {Object.entries(checkedItems).map(([key, value]) => (
              <Grid item xs={4} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state[key]}
                      onChange={handleChange}
                      name={key}
                    />
                  }
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <FormHelperText>
          {error ? "Debe seleccionar al menos una opción" : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
