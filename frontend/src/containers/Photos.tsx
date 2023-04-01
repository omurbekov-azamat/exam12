import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {fetchPhotos} from '../features/photos/photosThunk';
import {selectFetchingPhotosLoading, selectPhotos} from '../features/photos/photosSlice';
import PhotoItems from '../features/photos/components/PhotoItems';
import Spinner from '../components/UI/Spinner/Spinner';

const Photos = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectFetchingPhotosLoading);
    const photos = useAppSelector(selectPhotos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <>
            {loading && <Spinner/>}
            <PhotoItems items={photos}/>
        </>
    );
};

export default Photos;