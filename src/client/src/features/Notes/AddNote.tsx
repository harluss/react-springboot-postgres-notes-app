import { Box, Button, Container, makeStyles, TextField, Theme } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      minWidth: 100,
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block',
      background: theme.palette.background.paper,
    },
  };
});

const schema = yup.object().shape({
  title: yup.string().required(),
  details: yup.string().required(),
});

type Inputs = {
  title: string;
  details: string;
};

const defaultValues = {
  title: '',
  details: '',
};

const AddNote = () => {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.field}
              label="Title"
              variant="outlined"
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.field}
              label="Details"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={5}
              error={!!errors.details}
              helperText={errors.details?.message}
            />
          )}
        />
        <Box className={classes.buttonBox}>
          <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation>
            Add
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddNote;
