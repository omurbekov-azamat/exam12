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