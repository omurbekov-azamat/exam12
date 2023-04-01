import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {PhotoApi} from '../../types';

export const fetchPhotos = createAsyncThunk<PhotoApi[]>(
    'photos/fetchAll',
    async () => {
        try {
            const response = await axiosApi.get<PhotoApi[]>('/photos');
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const deletePhoto = createAsyncThunk<void, string>(
    'photos/deletePhoto',
    async (id) => {
        try {
            await axiosApi.delete('/photos/' + id);
        } catch (e) {
            throw e;
        }
    }
);

export const fetchPhotosByUserId = createAsyncThunk<PhotoApi[], string>(
    'photos/fetchPhotosByUserId',
    async (id) => {
        try {
            const response = await axiosApi.get<PhotoApi[]>('/photos?user=' + id);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
)