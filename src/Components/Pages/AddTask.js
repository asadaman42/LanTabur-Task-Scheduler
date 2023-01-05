import { Button, Container, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddTask = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => { console.log(data); }
    return (
        <Container maxWidth='sm'>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" onSubmit={handleSubmit(onSubmit)} component="form" >
                <Grid item>
                    <FormControl >
                        <InputLabel htmlFor="component-outlined">Name</InputLabel>
                        <OutlinedInput id="component-outlined" label="Name" {...register("task")} />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button type="submit"> Submit </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddTask;