import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {fetchPhotos} from '../features/photos/photosThunk';
import {selectFetchingPhotosLoading} from '../features/photos/photosSlice';
import Spinner from '../components/UI/Spinner/Spinner';

const Photos = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectFetchingPhotosLoading);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <>
            {loading && <Spinner/>}
        </>
    );
};

export default Photos;