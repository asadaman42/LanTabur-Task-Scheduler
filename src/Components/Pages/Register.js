import { Upload, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardActions, CardMedia, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactImageUploading from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';
import { UniversalContext } from '../../ContextSupplier/ContextSupplier';


const Register = () => {
    const { createUserByEmailAndPassword, updatePhotoAndName } = useContext(UniversalContext);

    const [images, setImages] = useState("");
    const onChange = (imageList) => { setImages(imageList); };

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

    const navigate = useNavigate();
    const postUserToDB = async (data) => {
        const url = 'http://localhost:5000/user'
        await axios.post(url, data)
            .then(() => { })
            .catch(err => console.log(err));
    };

    const handleRegistration = (data, e) => {
        const image = images[0].file;
        const name = `taskSchedulerUser${data.displayName}`;
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}&name=${name}`;

        axios.post(url, formData)
            .then(imgData => {
                if (imgData.data.success) {
                    const photoURL = imgData.data.data.display_url;
                    data.photoURL = photoURL;
                    const { email, password, displayName } = data;
                    // 1. post userInfo to mongodb
                    postUserToDB(data);
                    // 2. create user to firebase
                    createUserByEmailAndPassword(email, password)
                        .then(result => {
                            toast.success('1-Successfully created account');
                            updatePhotoAndName({ displayName, photoURL });
                            e.target.reset();
                            navigate('/');
                        })
                        .catch(er => console.error(er));
                }
            })
    };

    return (
        <Container maxWidth='sm'>
            <Stack spacing={2} component={'form'} onSubmit={handleSubmit(handleRegistration)} alignItems='center'>
                <Typography variant='h5'>
                    Create your account
                </Typography>
                <FormControl fullWidth>
                    <InputLabel> Your Name </InputLabel>
                    <OutlinedInput label='Your Name' {...register("displayName")} autoFocus />
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

                <ReactImageUploading value={images} onChange={onChange} dataURLKey="data_url">
                    {
                        ({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) =>
                        (
                            // write your building UI
                            <Stack border={'1px solid'} spacing={1} width='100%' alignItems='center' py={1} style={isDragging ? { color: 'red' } : undefined} {...dragProps}>
                                <Typography>Your Profile Picture</Typography>
                                <Button variant='outlined' color='success' onClick={onImageUpload} endIcon={<Upload />}>Click or Drop here</Button>
                                {imageList.map((image, index) => (
                                    <Card key={index} sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 140 }} image={image['data_url']} title="Profile Picture" />
                                        <CardActions>
                                            <Button variant='outlined' color='success' onClick={() => onImageUpdate(index)}>Update</Button>
                                            <Button variant='outlined' color='success' onClick={() => onImageRemove(index)}>Remove</Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Stack>
                        )
                    }
                </ReactImageUploading>
                <Button type='submit' variant='contained' color='success' sx={{ width: { xs: '100%', sm: '66%' } }} > Register </Button>
            </Stack>
        </Container>
    );
};

export default Register;