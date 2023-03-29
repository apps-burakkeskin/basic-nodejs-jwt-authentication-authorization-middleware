import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware.js';

dotenv.config();

const app = express();

app.use(express.json());

const animalArray = [
    {
        name: "Kuş",
        createdAt: new Date()
    },
    {
        name: "Balık",
        createdAt: new Date()
    },
    {
        name: "Aslan",
        createdAt: new Date()
    }
];

app.get('/animals', authMiddleware, (req, res) => {
    console.log(req.tokenPayload);
    res.status(200).json(animalArray);
});

const user = {
    username: "admin",
    email: "admin@gmail.com",
    password: "1231234"
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(email !== user.email || password !== user.password){
        return res.status(401).json({ message: "Bilgiler Geçersiz" });
    }else{
        const accessToken = jwt.sign({ email: user.email, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' }); 
        const refreshToken = jwt.sign({ email: user.email, username: user.username }, process.env.REFRESH_TOKEN_SECRET);
        return res.status(200).json({ accessToken, refreshToken });
    }
});

app.listen(3000, () => {
    console.log('server 3000 portunda aktif');
});

