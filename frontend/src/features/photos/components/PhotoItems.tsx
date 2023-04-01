import React from 'react';
import {Grid, Typography} from '@mui/material';
import PhotoItem from './PhotoItem';
import {PhotoApi} from '../../../types';

interface Props {
    items: PhotoApi[];
}

const PhotoItems: React.FC<Props> = ({items}) => {

    if (items.length === 0) {
        return (
            <Typography component='div' variant='h6' color='red'>
                There are no photos yet.
            </Typography>
        )
    }

    return (
        <Grid container spacing={2}>
            {items.map(photo => (
                <PhotoItem key={photo._id} item={photo}/>
            ))}
        </Grid>
    );
};

export default PhotoItems;