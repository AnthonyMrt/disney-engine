var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');


router.get('/', verify, function (req, res, next) {


  // const API_PUBLIC_KEY = process.env.MARVEL_API_KEY;
  // const hash = '65c40dc80c8b5af637556f43b748e44a';

  // const callHero = async () => {
  //   await axios
  //     .get(
  //       `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_PUBLIC_KEY}&hash=${hash}`
  //     )
  //     .then(response => {
  //       return console.log(response.data)
  //     }
  //     )
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  var characters = [
    [
      {
        "id": 1,
        "name": "Mickey",
        "username": "Mouse",
        "yearCreation": 1928,
        "image": 'http://localhost:9000/images/mickey.png',
        "univers": "Disney"
      },
      {
        "id": 2,
        "name": "Donald",
        "username": 'Duck',
        "yearCreation": 1934,
        "image": 'http://localhost:9000/images/donald.png',
        "univers": "Disney"
      },
      {
        "id": 3,
        "name": "Minnie",
        "username": 'Mouse',
        "yearCreation": 1928,
        "image": 'http://localhost:9000/images/minnie.png',
        "univers": "Disney"
      }
    ],
    [
      {
        "id": 4,
        "name": "Luke",
        "username": "Skywalker",
        "image": 'http://localhost:9000/images/Luke.jpg',
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.py4e.com/api/planets/1/:name/",
        "films": [
          "https://swapi.py4e.com/api/films/1/:title/",
          "https://swapi.py4e.com/api/films/2/:title/",
          "https://swapi.py4e.com/api/films/3/:title/",
          "https://swapi.py4e.com/api/films/6/:title/",
          "https://swapi.py4e.com/api/films/7/:title/"
        ],
        "species": [
          "https://swapi.py4e.com/api/species/1/:name/"
        ],
        "vehicles": [
          "https://swapi.py4e.com/api/vehicles/14/:name/",
          "https://swapi.py4e.com/api/vehicles/30/:name/"
        ],
        "starships": [
          "https://swapi.py4e.com/api/starships/12/:name/",
          "https://swapi.py4e.com/api/starships/22/:name/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.py4e.com/api/people/1/",
        "univers": "StarWars"
      },
      {
        "id": 5,
        "name": "C-3PO",
        "username": '',
        "image": 'http://localhost:9000/images/c3po.jpg',
        "height": "167",
        "mass": "75",
        "hair_color": "n/a",
        "skin_color": "gold",
        "eye_color": "yellow",
        "birth_year": "112BBY",
        "gender": "n/a",
        "homeworld": "https://swapi.py4e.com/api/planets/1/:name/",
        "films": [
          "https://swapi.py4e.com/api/films/1/:title/",
          "https://swapi.py4e.com/api/films/2/:title/",
          "https://swapi.py4e.com/api/films/3/:title/",
          "https://swapi.py4e.com/api/films/4/:title/",
          "https://swapi.py4e.com/api/films/5/:title/",
          "https://swapi.py4e.com/api/films/6/:title/"
        ],
        "species": [
          "https://swapi.py4e.com/api/species/2/:name/"
        ],
        "vehicles": [],
        "starships": [],
        "created": "2014-12-10T15:10:51.357000Z",
        "edited": "2014-12-20T21:17:50.309000Z",
        "url": "https://swapi.py4e.com/api/people/2/",
        "univers": "StarWars"
      },
      {
        "id": 6,
        "name": "Dark Vador",
        "image": 'http://localhost:9000/images/darkVador.jpg',
        "height": "202",
        "mass": "136",
        "hair_color": "none",
        "skin_color": "white",
        "eye_color": "yellow",
        "birth_year": "41.9BBY",
        "gender": "male",
        "homeworld": "http://swapi.dev/api/planets/1/",
        "films": [
          "http://swapi.dev/api/films/1/",
          "http://swapi.dev/api/films/2/",
          "http://swapi.dev/api/films/3/",
          "http://swapi.dev/api/films/6/"
        ],
        "species": [],
        "vehicles": [],
        "starships": [
          "http://swapi.dev/api/starships/13/"
        ],
        "created": "2014-12-10T15:18:20.704000Z",
        "edited": "2014-12-20T21:17:50.313000Z",
        "url": "http://swapi.dev/api/people/4/",
        'univers': 'Starwars'
      },
    ],
    [
      {
        "id": 7,
        "name": "iron man",
        "username": '',
        "image": 'http://localhost:9000/images/ironMan.jpg',
        "univers": "Marvel"
      },
      {
        "id": 8,
        "name": "spiderman",
        "username": '',
        "image": 'http://localhost:9000/images/spiderman.jpg',
        "univers": "Marvel"
      },
      {
        "id": 9,
        "name": "thor",
        "username": '',
        "image": 'http://localhost:9000/images/thor.jpg',
        "univers": "Marvel"
      }
    ],
  ];


  // var characterList = characters.reduce(function (characterList, character)  {
  //   characterList.push(character)
  //   return characterList;
  // }, [])

  var characterList = characters.reduce((character, characterValue) => character.concat(characterValue),
  []);

  res.render('map', {
    characterList: JSON.stringify(characterList),
  });

  res.send(characterList);
});


module.exports = router;
