import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {

    // displaying password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => { setShowPassword(!showPassword); };

    // displaying confirm password
    const [showPasswordCfm, setShowPasswordCfm] = useState(false);
    const handleShowPasswordCfm = () => { setShowPasswordCfm(!showPasswordCfm); };

    // React-hook-form
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onTouched' });
    const password = watch('password');
    const handleRegistration = (data, e) => { console.log(data); }

    return (
        <Container maxWidth='sm'>
            <Stack spacing={2} component={'form'} onSubmit={handleSubmit(handleRegistration)} alignItems='center'>
                <Typography>
                    Create your account
                </Typography>
                <FormControl fullWidth>
                    <InputLabel> Your Name </InputLabel>
                    <OutlinedInput label='Your Name' {...register("name")} autoFocus />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel> Your Email </InputLabel>
                    <OutlinedInput type='email' label=' Your Email' {...register("email")} />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel > Your Password </InputLabel>
                    <OutlinedInput
                        endAdornment={<InputAdornment position='end' >
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>}
                        type={showPassword ? 'text' : 'password'} label='Your Password' placeholder='Type Your Password' {...register("password")} />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel >Confirm Password</InputLabel>
                    <OutlinedInput
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPasswordCfm}>
                                    {showPasswordCfm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        type={showPasswordCfm? 'text' : 'password'} label='Confirm Password' placeholder='Retype Your Password' {...register("passwordCfm", { validate: (value) => value === password || "The Password doesn't match" })} />
                    {errors.passwordCfm && <Typography color='error'> {errors.passwordCfm.message} </Typography>}
                </FormControl>
                <Button type='submit' variant='contained' color='success' sx={{ width: { xs: '100%', sm: '66%' } }} > Register </Button>
            </Stack>
        </Container>
    );
};

export default Register;