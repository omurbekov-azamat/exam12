import React from 'react';
import {Link} from 'react-router-dom';
import {CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {openModal} from '../photosSlice';
import {useAppDispatch} from '../../../app/hook';
import {PhotoApi} from '../../../types';

interface Props {
    item: PhotoApi;
}

const PhotoItem: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();

    const onOpenModal = () => {
        dispatch(openModal({image: item.image, title: item.title}));
    };

    return (
        <Grid item>
            <CardActionArea onClick={onOpenModal}>
                <CardMedia
                    component="img"
                    height="200"
                    image={apiURL + '/' + item.image}
                    alt={item.title}
                />
                <CardContent>
                    <Typography variant='h5' fontWeight='bolder' color='blueviolet' component='div'
                                textTransform='capitalize'>
                        Title: {item.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Grid container>
                <Grid item>
                    <Typography textTransform='capitalize' ml={2} mr={1}>
                        By:
                    </Typography>
                </Grid>
                <Grid item textTransform='capitalize'>
                    <Link to={'/userPhotos/' + item.user._id}>{item.user.displayName}</Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PhotoItem;