import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {selectCreatePhotoError, selectCreatePhotoLoading} from '../photosSlice';
import {Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import {createPhoto} from '../photosThunk';
import {enqueueSnackbar, SnackbarProvider} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {PhotoMutation} from '../../../types';

const PhotoForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreatePhotoLoading);
    const error = useAppSelector(selectCreatePhotoError);
    const navigate = useNavigate();

    const [state, setState] = useState<PhotoMutation>({
        title: '',
        image: null,
    });

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState(prevState => ({
            ...prevState, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const moveToMyGallery = () => {
        navigate('/my-gallery');
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(createPhoto(state)).unwrap();
        await setState({
            title: '',
            image: null,
        });
        await enqueueSnackbar('You have created new photo', {variant: 'success'});
        setTimeout(moveToMyGallery, 2000);
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form onSubmit={submitFormHandler}>
            <SnackbarProvider/>
            <Grid container direction='column' spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Add Photo
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        id='title' label='Title'
                        name='title'
                        value={state.title}
                        onChange={inputChangeHandler}
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name='image'
                        label='Image'
                        type='image/*'
                        error={error}
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='warning'
                        variant='outlined'
                        loading={loading}
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default PhotoForm;