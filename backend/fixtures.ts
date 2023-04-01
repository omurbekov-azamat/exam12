import crypto from 'crypto';
import mongoose from "mongoose";
import config from "./config";
import User from './modules/User';
import Photo from './modules/Photo';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('photos');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        password: '123',
        displayName: 'user',
        avatar: 'fixtures/noFace.jpg',
        token: crypto.randomUUID(),
    }, {
        email: 'admin@gmail.com',
        password: '123',
        displayName: 'admin',
        avatar: 'fixtures/noFace.jpg',
        token: crypto.randomUUID(),
        role: 'admin',
    });

    await Photo.create({
        user: user._id,
        title: 'Cars',
        image: 'fixtures/car-1.jpg',
    }, {
        user: user._id,
        title: 'Cars',
        image: 'fixtures/car-2.jpg',
    }, {
        user: admin._id,
        title: 'Cyberpunk',
        image: 'fixtures/cyberpunk-1.jpg',
    }, {
        user: admin._id,
        title: 'Cyberpunk',
        image: 'fixtures/cyberpunk-2.jpg',
    });

    await db.close();
}

void run();