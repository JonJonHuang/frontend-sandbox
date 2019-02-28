const express = require('express');
const app = express();
const port = 4000;

const path = require('path');
const fs = require('fs');

const images = [
    {
        img: fs.readFileSync(path.join(__dirname, 'api', 'image1.jpg')).toString('base64')
    },
    {
        img: fs.readFileSync(path.join(__dirname, 'api', 'image2.jpg')).toString('base64')
    }
];

const sharp = require('sharp');

const moment = require('moment');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
    let resizedImages = images.map(value => {
        imgData = Buffer.from(value.img, 'base64');
        return sharp(imgData).resize(100).toBuffer().then(buffer => buffer.toString('base64'), reason => reason);
    });

    Promise.all(resizedImages).then(value => {
        res.send(value);
    }, reason => {
        throw reason;
    })
});

app.listen(port, () => {
    console.log(`Server started at time: ${moment()}`);
});
