import React, {useState} from 'react';
import {useAppSelector} from '../../../app/hook';
import {selectCreatePhotoError, selectCreatePhotoLoading} from '../photosSlice';
import {Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import {PhotoMutation} from '../../../types';

const PhotoForm = () => {
    const loading = useAppSelector(selectCreatePhotoLoading);
    const error = useAppSelector(selectCreatePhotoError);

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

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(state);
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