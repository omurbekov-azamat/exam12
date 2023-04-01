import React from 'react';
import {Link} from 'react-router-dom';
import {CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {openModal, selectDeletePhotoLoading} from '../photosSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {selectUser} from '../../users/usersSlice';
import {LoadingButton} from '@mui/lab';
import {deletePhoto} from '../photosThunk';
import {PhotoApi} from '../../../types';

interface Props {
    item: PhotoApi;
}

const PhotoItem: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectDeletePhotoLoading);

    const onOpenModal = () => {
        dispatch(openModal({image: item.image, title: item.title}));
    };

    const onDeletePhoto = async (id: string) => {
        await dispatch(deletePhoto(id));
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
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Grid container textTransform='capitalize'>
                        <Grid item>
                            <Typography ml={2} mr={1}>
                                By:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link to={'/userPhotos/' + item.user._id}>{item.user.displayName}</Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {user && user.role === 'admin' &&
                        <LoadingButton
                            type='button'
                            color='error'
                            onClick={() => onDeletePhoto(item._id)}
                            loading={deleteLoading ? deleteLoading === item._id : false}
                        >
                            delete
                        </LoadingButton>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PhotoItem;