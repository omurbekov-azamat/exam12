import {model, Schema, Types} from 'mongoose';
import User from './User';
import {IPhoto} from '../types';

const PhotoSchema = new Schema<IPhoto>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Photo = model<IPhoto>('Photo', PhotoSchema);

export default Photo;