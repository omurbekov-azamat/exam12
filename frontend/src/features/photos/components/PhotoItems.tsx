import React from 'react';
import {Grid, Typography} from '@mui/material';
import PhotoItem from './PhotoItem';
import ModalCover from '../../../components/UI/ModalCover/ModalCover';
import {PhotoApi} from '../../../types';

interface Props {
    items: PhotoApi[];
    showName?: boolean;
    idParams?: string;
    ownGallery?: boolean;
}

const PhotoItems: React.FC<Props> = ({items, showName, idParams, ownGallery}) => {

    if (items.length === 0) {
        return (
            <Typography component='div' variant='h6' color='red'>
                There are no photos yet.
            </Typography>
        )
    }

    return (
        <>
            <Grid container spacing={2} mt={2}>
                {items.map(photo => (
                    <PhotoItem
                        key={photo._id}
                        item={photo}
                        showName={showName}
                        idParams={idParams}
                        ownGallery={ownGallery}
                    />
                ))}
            </Grid>
            <ModalCover/>
        </>
    );
};

export default PhotoItems;