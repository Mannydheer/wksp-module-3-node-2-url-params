'use strict';

const morgan = require('morgan');
const express = require('express');

const {
    top50
} = require('./data/top50');
//import books.
const {
    books
} = require('./data/books');
// -----------------------------------------

const topFifty = (req, res) => res.render('pages/top50', {
    title: "Top 50 Songs Streamed on Spotify",
    topSongs: top50
    // here we are taking the array top50 and storing it in topsongs for access later. Keep in mind that is it an array of objects. 
});
const popularArtist = (req, res) => {

    let artistArray = [];
    let countedArtists = {};
    top50.forEach((current) => {
        let streamCount = 0;
        //Now artist is holding the artist name of each item.
        top50.forEach((compared) => {
            if (current.artist === compared.artist) {
                streamCount += compared.streams;
            }
        })
        //Here, we are taking the current artist name and putting it in the object counted Artists with that KEY. The KEY now is equal to the streamcount.
        countedArtists[current.artist] = streamCount;
    })

    // -------
    //this will give them all
    //need to give put into an array. 
    Object.values(countedArtists).forEach((artistCount, id) => {
        const artistName = Object.keys(countedArtists)[id];
        artistArray.push({
            artistName: artistName,
            artistCount: artistCount

        });
    })

    //sort modifies the original. 
    artistArray.sort(function (a, b) {
        return b.artistCount - a.artistCount
    })


    //now we know that justin BEIBER is the MOST POPULAR.!!! 


    const filterArray = top50.filter(current => current.artist === artistArray[0].artistName)

    //---------------------
    res.render('pages/top50pop', {
        title: "Most Pop Songs Streamed on Spotify",
        popSongs: filterArray
    });
}
const rankedSongs = (req, res) => {

    //could be used as the rank. 
    const number = req.params.number;
    let chosenSong = top50[number - 1];
    if (chosenSong) {
        res.render('pages/rankedSongs', {
            title: `Song #${number}`,
            pickedSong: chosenSong
        });
    } else {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
}
// -----------------------------------------
const allBooks = (req, res) => res.render('pages/allbooks', {
    title: "Lists of All Books!",
    listBooks: books

})
const rankedBooks = (req, res) => {

    const value = req.params.value;
    let chosenBook = books[value - 101];


    if (chosenBook) {
        res.render('pages/rankedBooks', {
            title: "Book#",
            listBooks: chosenBook

        });
    }
}
const typeBook = (req, res) => {
    //store the string type book. 
    let type = req.params.type;
    
    //holder for the books types.
    let typeHolder = [];

    books.forEach((current) => {
        if (type === current.type) {
            typeHolder.push(current);
        }

    

    })
    res.render('pages/allbooks', {
        title: "Book Types",
        listBooks: typeHolder
    })








}

// -----------------------------------------

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', topFifty);
//popular artists.
app.get('/top50pop', popularArtist);
//ranked sons.
app.get('/top50/:number', rankedSongs)
// --------------------------

app.get('/allbooks/value/:value', rankedBooks)

app.get('/allbooks/type/:type', typeBook)
// 

app.get('/allbooks', allBooks)
//
//

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));