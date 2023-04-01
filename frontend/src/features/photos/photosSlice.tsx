import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchPhotos} from './photosThunk';
import {Fullscreen, PhotoApi} from '../../types';

interface PhotosState {
    photos: PhotoApi[];
    fetchPhotosLoading: boolean;
    modal: boolean;
    fullscreenPreview: Fullscreen | null;
}

const initialState: PhotosState = {
    photos: [],
    fetchPhotosLoading: false,
    modal: false,
    fullscreenPreview: null,
};

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        openModal: (state, {payload: fullscreen}: PayloadAction<Fullscreen>) => {
            state.fullscreenPreview = fullscreen;
            state.modal = true;
        },
        closeModal: (state) => {
            state.fullscreenPreview = null;
            state.modal = false;
        },
    },
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

export const {openModal, closeModal} = photosSlice.actions;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectFetchingPhotosLoading = (state: RootState) => state.photos.fetchPhotosLoading;
export const selectModal = (state:RootState) => state.photos.modal;
export const selectFullscreenPreview = (state: RootState) => state.photos.fullscreenPreview;