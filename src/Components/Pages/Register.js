import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactImageUploading from 'react-images-uploading';


const Register = () => {

    const [images, setImages] = useState([]);
    console.log(images[0]?.data_url);
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        
        setImages(imageList);
    };

    // displaying password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => { setShowPassword(!showPassword); };

    // displaying confirm password
    const [showPasswordCfm, setShowPasswordCfm] = useState(false);
    const handleShowPasswordCfm = () => { setShowPasswordCfm(!showPasswordCfm); };

    // React-hook-form
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onTouched' });
    const password = watch('password');

    const imgbbKey = process.env.REACT_APP_imgbb;

    const handleRegistration = (data, e) => {
        console.log(data);

        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

        axios.post(url, images[0]?.data_url)
            .then(imgData => {console.log(imgData)})
    };

    return (
        <Container maxWidth='sm'>
            <Stack spacing={2} component={'form'} onSubmit={handleSubmit(handleRegistration)} alignItems='center'>
                <Typography>
                    Create your account
                </Typography>
                {/* <FormControl fullWidth>
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
                        type={showPasswordCfm ? 'text' : 'password'} label='Confirm Password' placeholder='Retype Your Password' {...register("passwordCfm", { validate: (value) => value === password || "The Password doesn't match" })} />
                    {errors.passwordCfm && <Typography color='error'> {errors.passwordCfm.message} </Typography>}
                </FormControl>
                <OutlinedInput type='file'></OutlinedInput> */}

                <ReactImageUploading value={images} onChange={onChange} dataURLKey="data_url">
                    {
                        ({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) =>
                        (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </button>
                                &nbsp;
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)}>Update</button>
                                            <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </ReactImageUploading>

                <Button type='submit' variant='contained' color='success' sx={{ width: { xs: '100%', sm: '66%' } }} > Register </Button>
            </Stack>
        </Container>
    );
};

export default Register;