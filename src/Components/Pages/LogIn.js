import { Google, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Chip, Container, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as LinkRouter } from "react-router-dom";
import { UniversalContext } from '../../ContextSupplier/ContextSupplier';


const LogIn = () => {
    const { logInWithEmailAndPassword, signInWithGoogle } = useContext(UniversalContext);
    const { register, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => { event.preventDefault(); };

    const onSubmit = (data, e) => {
        const {email, password} = data; 
        logInWithEmailAndPassword(email, password)
        .then(response => console.log(response))
         console.log(data);
        }
    return (
        <Container maxWidth='lg'>
            <Stack
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                maxWidth='sm'
                spacing={3}
                justifyContent='center'
                alignItems={'center'}
                p={2}
                mx="auto"
                sx={{ '&.css-dgl7ja-MuiStack-root': { ml: '20px' } }}>

                <Typography variant='h5' textAlign="center">
                    Please Log In
                </Typography>

                <FormControl fullWidth>
                    <InputLabel htmlFor="email-address">Email address</InputLabel>
                    <OutlinedInput
                        {...register("email")}
                        id="email-address"
                        aria-describedby="my-helper-text"
                        type='email'
                        label='Emai address'
                    />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        {...register("password")}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <Button type='submit' variant='contained' color='success' endIcon={<Login />} sx={{ width: { xs: '100%', sm: '66%' } }}>
                    submit
                </Button>

                <Typography>
                    Don't have an account? <Link component={LinkRouter} to='/register'>sign up</Link> now
                </Typography>

                <Divider flexItem sx={{ "&::before, &::after": { borderColor: "primary.teal", } }} ><Chip variant='outlined' color='success' label="or" /></Divider>

                <Button startIcon={<Google />} variant='outlined' color='success' sx={{ width: { xs: '100%', sm: '66%' } }}>Continue with Google</Button>

            </Stack>
        </Container>
    );
};

export default LogIn;