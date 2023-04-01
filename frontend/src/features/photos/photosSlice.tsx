import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {deletePhoto, fetchPhotos, fetchPhotosByUserId} from './photosThunk';
import {Fullscreen, PhotoApi, ValidationError} from '../../types';

interface PhotosState {
    photos: PhotoApi[];
    fetchPhotosLoading: boolean;
    modal: boolean;
    fullscreenPreview: Fullscreen | null;
    deletePhotoLoading: string | false;
    userGallery: PhotoApi[];
    fetchUserGalleryLoading: boolean;
    createPhotoLoading: boolean;
    createPhotoError: ValidationError | null;
}

const initialState: PhotosState = {
    photos: [],
    fetchPhotosLoading: false,
    modal: false,
    fullscreenPreview: null,
    deletePhotoLoading: false,
    userGallery: [],
    fetchUserGalleryLoading: false,
    createPhotoLoading: false,
    createPhotoError: null,
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
        builder.addCase(deletePhoto.pending, (state, {meta}) => {
            state.deletePhotoLoading = meta.arg;
        });
        builder.addCase(deletePhoto.fulfilled, (state) => {
            state.deletePhotoLoading = false;
        });
        builder.addCase(deletePhoto.rejected, (state) => {
            state.deletePhotoLoading = false;
        });
        builder.addCase(fetchPhotosByUserId.pending, (state) => {
            state.userGallery = [];
            state.fetchUserGalleryLoading = true;
        });
        builder.addCase(fetchPhotosByUserId.fulfilled, (state, {payload: photos}) => {
            state.fetchUserGalleryLoading = false;
            state.userGallery = photos;
        });
        builder.addCase(fetchPhotosByUserId.rejected, (state) => {
            state.fetchUserGalleryLoading = false;
        });
    },
});

export const photosReducer = photosSlice.reducer;

export const {openModal, closeModal} = photosSlice.actions;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectFetchingPhotosLoading = (state: RootState) => state.photos.fetchPhotosLoading;
export const selectModal = (state:RootState) => state.photos.modal;
export const selectFullscreenPreview = (state: RootState) => state.photos.fullscreenPreview;
export const selectDeletePhotoLoading = (state: RootState) => state.photos.deletePhotoLoading;
export const selectUserGalley = (state: RootState) => state.photos.userGallery;
export const selectFetchingUserGalleryLoading = (state: RootState) => state.photos.fetchUserGalleryLoading;
export const selectCreatePhotoLoading = (state: RootState) => state.photos.createPhotoLoading;
export const selectCreatePhotoError = (state: RootState) => state.photos.createPhotoError;