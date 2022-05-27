require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// data 
const posts = [
    {
        username: 'Levi',
        title: 'post 1'
    },
    {
        username: 'Demi',
        title: 'post 2'
    },
];

// middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
        }

        req.user = user;
        next();
    })
};


app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.listen(3000);