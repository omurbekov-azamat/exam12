import React from 'react';
import {closeModal, selectFullscreenPreview, selectModal} from '../../../features/photos/photosSlice';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {Box, Button, CardMedia} from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import {apiURL} from '../../../constants';

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 'auto',
    border: '2px solid black',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
};

const ModalCover = () => {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(selectModal);
    const fullscreen = useAppSelector(selectFullscreenPreview);

    const onCloseModal = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            open={modal}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Box textAlign='right'>
                    <Button onClick={onCloseModal}><CloseIcon/></Button>
                </Box>
                {fullscreen &&
                    <CardMedia
                        component="img"
                        image={apiURL + '/' + fullscreen.image}
                        alt={fullscreen.title}
                    />
                }
            </Box>
        </Modal>
    );
};

export default ModalCover;