import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const schema = yup.object().shape({
  firstname: yup.string().max(50).required(),
  lastname: yup.string().max(100).required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
}).required();

const defaults = {
  firstname: "",
  lastname: "",
  age: "",
  email: "",
};

export default function DriverForm({ driver, submitHandler }) {

const {
  handleSubmit,
  formState: { errors, isValid, isDirty, isSubmitting },
  reset,
  control,
} = useForm({
  resolver: yupResolver(schema),
  mode: "onChange",
  defaultValues: driver || defaults,
});

useEffect(() => {
  if (driver) {
    reset(driver);
  }  
}, [driver, reset]);

const formRowStyle = {
  marginBlockEnd: "1em",
};

let submitFn = (vals) => {
  reset();
  submitHandler(vals);
};

return (
  <form onSubmit={handleSubmit(submitFn)}>
    <div style={formRowStyle}>
        <Controller
          control={control}
          name="firstname"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="name"
              {...field}
              label="first name"
              fullWidth
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="lastname"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="name"
              fullWidth
              error={!!errors.lastname}
              {...field}
              label="last name"
              helperText={errors.lastname?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="age"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              fullWidth
              type="number"
              error={!!errors.age}
              {...field}
              label="age"
              helperText={errors.age?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="email"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              fullWidth
              type="email"
              error={!!errors.email}
              {...field}
              label="email"
              helperText={errors.email?.message}
            />
          )}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mr: 2 }}
          disabled={!isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          primary="true"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
        >
          Submit
        </Button>
      </div>
  </form>
  );
}