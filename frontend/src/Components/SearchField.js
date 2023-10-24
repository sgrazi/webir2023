import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export const SearchField = ({
  isDisabled,
  field,
  handleFieldChange,
  placeholder,
  name,
}) => {
  return (
    <TextField
      disabled={isDisabled}
      name={name}
      variant="outlined"
      value={field}
      onChange={(e) => handleFieldChange(e.target)}
      placeholder={placeholder}
      size="small"
      style={{
        width: "fit-content",
        background: "white",
        borderRadius: "4px",
      }}
      InputProps={{
        style: { color: "black" },
        startAdornment: (
          <InputAdornment position="start">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
              alt="search"
              width="20px"
              height="20px"
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
