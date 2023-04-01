import {promises as fs} from 'fs';
import express from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Photo from '../modules/Photo';

const photosRouter = express.Router();

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const photo = await Photo.create({
            user: user._id,
            title: req.body.title,
            image: req.file && req.file.filename,
        });
        return res.send({message: 'Created successfully', photo});
    } catch (e) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

photosRouter.get('/', async (req, res, next) => {
    if (req.query.user) {
        const photos = await Photo.find({user: req.query.user}).populate({path: 'user', select: 'displayName'});

        if (!photos) {
            return res.status(404).send({error: 'Photos are not found'});
        }

        return res.send(photos);
    }

    try {
        const photos = await Photo.find().populate({path: 'user', select: 'displayName'});
        if (!photos) {
            return res.status(404).send({error: 'Photos are not found'});
        }
        return res.send(photos);
    } catch (e) {
        return next(e);
    }
});

photosRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
        return res.status(404).send({error: 'Photo is not found'});
    }

    try {
        if (user.role === 'user') {
            if (photo.user.toString() === user._id.toString()) {
                await Photo.deleteOne(photo._id);
                return res.send({message: 'Delete was successfully'});
            } else {
                return res.send({message: 'Sorry you can not delete these photo, Its not yours!'});
            }
        }

        if (user.role === 'admin') {
            await Photo.deleteOne(photo._id);
            return res.send({message: 'Delete was successfully'});
        }
    } catch (e) {
        return next(e);
    }
});

export default photosRouter;