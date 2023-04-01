import {isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {PhotoApi, PhotoMutation, ValidationError} from '../../types';

export const createPhoto = createAsyncThunk<void, PhotoMutation, { rejectValue: ValidationError }>(
    'photos/createPhoto',
    async (photoData,{rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(photoData) as (keyof PhotoMutation)[];

            keys.forEach(key => {
                const value = photoData[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosApi.post('/photos', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

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