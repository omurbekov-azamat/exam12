import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {selectUser} from '../features/users/usersSlice';
import {selectFetchingUserGalleryLoading, selectUserGalley} from '../features/photos/photosSlice';
import {fetchPhotosByUserId} from '../features/photos/photosThunk';
import PhotoItems from '../features/photos/components/PhotoItems';
import Spinner from '../components/UI/Spinner/Spinner';
import {Typography} from '@mui/material';

const MyGallery = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const gallery = useAppSelector(selectUserGalley);
    const loading = useAppSelector(selectFetchingUserGalleryLoading);

    useEffect(() => {
        if (user) {
            dispatch(fetchPhotosByUserId(user._id));
        }
    }, [dispatch, user]);
    return (
        <>
            {loading && <Spinner/>}
            <Typography variant='h5' component='div' textTransform='capitalize'>
                My Gallery
            </Typography>
            <PhotoItems items={gallery} idParams={user?._id}/>
        </>
    );
};

export default MyGallery;