import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchPhotos} from './photosThunk';
import {PhotoApi} from '../../types';

interface PhotosState {
    photos: PhotoApi[];
    fetchPhotosLoading: boolean;
}

const initialState: PhotosState = {
    photos: [],
    fetchPhotosLoading: false,
};

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.pending, (state) => {
            state.fetchPhotosLoading = true;
        });
        builder.addCase(fetchPhotos.fulfilled, (state, {payload: photos}) => {
            state.fetchPhotosLoading = false;
            state.photos = photos;
        });
        builder.addCase(fetchPhotos.rejected, (state) => {
            state.fetchPhotosLoading = false;
        });
    },
});

export const photosReducer = photosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectFetchingPhotosLoading = (state: RootState) => state.photos.fetchPhotosLoading;