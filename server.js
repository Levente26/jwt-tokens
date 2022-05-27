const express = require('express');

const app = express();

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

app.get('/posts', (req, res) => {
    res.json(posts);
})


app.listen(3000);