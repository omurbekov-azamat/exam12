import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {deletePhoto, fetchPhotos, fetchPhotosByUserId} from '../photosThunk';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {openModal, selectDeletePhotoLoading} from '../photosSlice';
import {selectUser} from '../../users/usersSlice';
import {CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {apiURL} from '../../../constants';
import {PhotoApi} from '../../../types';

interface Props {
    item: PhotoApi;
    showName?: boolean;
    idParams?: string;
    ownGallery?: boolean;
}

const PhotoItem: React.FC<Props> = ({item, showName, idParams, ownGallery}) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectDeletePhotoLoading);

    const onOpenModal = () => {
        dispatch(openModal({image: item.image, title: item.title}));
    };

    const onDeletePhoto = async (id: string) => {
        try {
            await dispatch(deletePhoto(id));
        } finally {
            if (location.pathname === '/' || location.pathname === '/photos') {
                await dispatch(fetchPhotos());
            } else {
                if (idParams) {
                    await dispatch(fetchPhotosByUserId(idParams));
                }
            }
        }
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
            </CardActionArea>
            <CardContent>
                <Grid container color='blueviolet'>
                    <Grid item>
                        <Typography variant='h6' component='div' sx={{mr: 1}}>Title:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h6"
                            component='div'
                            sx={{textDecoration: 'underline'}}
                            onClick={onOpenModal}
                        >
                            {item.title}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    {showName &&
                        <Grid container textTransform='capitalize'>
                            <Grid item>
                                <Typography ml={2} mr={1}>By:</Typography>
                            </Grid>
                            <Grid item>
                                <Link to={'/userGallery/' + item.user._id}>{item.user.displayName}</Link>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <Grid item>
                    {user && ((user.role === 'admin') || (ownGallery && user._id === item.user._id && user.role !== 'admin')) && (
                        <LoadingButton
                            type='button'
                            color='error'
                            onClick={() => onDeletePhoto(item._id)}
                            loading={deleteLoading ? deleteLoading === item._id : false}
                        >
                            delete
                        </LoadingButton>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PhotoItem;