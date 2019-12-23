import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Headline5, Subtitle1, Subtitle2 } from "@material/react-typography";
const InputForm = ({ name, label, value, onChange, error, type }) => {
  return (
    <div>
      <TextField
        value={value}
        id={name}
        onChange={onChange}
        name={name}
        type={type}
        label={label}
        style={{ width: "100%" }}
      />
      <Subtitle2
        style={{
          marginTop: "0.5em",
          color: "#616161",
          float: "left"
        }}
      >
        {error && <div> {error} </div>}
      </Subtitle2>
    </div>
  );
};

export default InputForm;
