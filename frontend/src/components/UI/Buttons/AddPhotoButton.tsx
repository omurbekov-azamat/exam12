import React from 'react';
import {Box, Button} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';

const AddPhotoButton = () => {
    return (
        <Box textAlign='right'>
            <Button
                component={NavLink}
                to='/addPhoto'
                variant='outlined'
            >
                Add new Photo
            </Button>
        </Box>
    );
};

export default AddPhotoButton;