import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const schema = yup.object().shape({
  title: yup.string().max(200).required(),
  creator: yup.string().max(100).required(),
  image: yup.string().url(),
}).required();

const defaults = {
  title: "",
  creator: "",
  image: "",
};

export default function CartoonForm({ cartoon, submitHandler }) {

const {
  handleSubmit,
  formState: { errors, isValid, isDirty, isSubmitting },
  reset,
  control,
} = useForm({
  resolver: yupResolver(schema),
  mode: "onChange",
  defaultValues: cartoon || defaults,
});

useEffect(() => {
  if (cartoon) {
    reset(cartoon);
  }  
}, [cartoon, reset]);

const formRowStyle = {
  marginBlockEnd: "1em",
};

let submitFn = (vals) => {
  reset();
  cartoon ? submitHandler(cartoon.id, vals) : submitHandler(vals);
};

return (
  <form onSubmit={handleSubmit(submitFn)}>
    <div style={formRowStyle}>
        <Controller
          control={control}
          name="title"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="name"
              {...field}
              label="title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="creator"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="name"
              fullWidth
              error={!!errors.creator}
              {...field}
              label="creator"
              helperText={errors.creator?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="image"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              fullWidth
              type="text"
              error={!!errors.image}
              {...field}
              label="image"
              helperText={errors.image?.message}
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