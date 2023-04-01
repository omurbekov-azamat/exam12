import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {useParams} from 'react-router-dom';
import {fetchPhotosByUserId} from '../features/photos/photosThunk';
import {selectFetchingUserGalleryLoading, selectUserGalley} from '../features/photos/photosSlice';
import PhotoItems from '../features/photos/components/PhotoItems';
import Spinner from '../components/UI/Spinner/Spinner';
import {Typography} from '@mui/material';

const UserGallery = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string};
    const loading = useAppSelector(selectFetchingUserGalleryLoading);
    const gallery = useAppSelector(selectUserGalley);

    useEffect(() => {
        dispatch(fetchPhotosByUserId(id));
    }, [dispatch, id]);

    return (
        <>
            {loading && <Spinner/>}
            {gallery && gallery.length > 0 &&
            <Typography variant='h5' component='div' textTransform='capitalize'>
                {gallery[0].user.displayName}'s gallery
            </Typography>
            }
            <PhotoItems items={gallery} idParams={id}/>
        </>
    );
};

export default UserGallery;