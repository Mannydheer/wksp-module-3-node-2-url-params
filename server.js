'use strict';

const morgan = require('morgan');
const express = require('express');

const {
    top50
} = require('./data/top50');

const topFifty = (req, res) => res.render('pages/top50', {
    title: "Top 50 Songs Streamed on Spotify",
    topSongs: top50
    // here we are taking the array top50 and storing it in topsongs for access later. Keep in mind that is it an array of objects. 
});

const popularArtist = (req, res) => res.render('pages/top50',

        const PORT = process.env.PORT || 8000;

        const app = express();

        app.use(morgan('dev')); app.use(express.static('public')); app.use(express.urlencoded({
            extended: false
        })); app.set('view engine', 'ejs');

        // endpoints here
        app.get('/top50', topFifty);
        //popular artists.
        app.get('/top50', popularArtist);

        // handle 404s
        app.get('*', (req, res) => {
            res.status(404);
            res.render('pages/fourOhFour', {
                title: 'I got nothing',
                path: req.originalUrl
            });
        });

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));