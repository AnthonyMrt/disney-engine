import React, { Fragment, useEffect, useState } from 'react'
import Loading from '../Loading'
import axios from 'axios'
import Logout from '../Logout';
import { Link } from 'react-router-dom'

const SearchEngine = () => {


  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = '65c40dc80c8b5af637556f43b748e44a'

  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState('');
  const [btn, setBtn] = useState(false);

  const name = localStorage.getItem('name');


  useEffect(() => {
    if (inputs.length > 2) {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }

    if (localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
  }, [inputs, btn])

  const checkDataAge = date => {

    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24)

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now());
    }

  }

  const handleChange = (event) => {
    setInputs(event.target.value);

  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  //  const results = searchTerm.length <= 2
  //  ? characterInfos
  //  : characterInfos.filter(character =>
  //      character.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  //    );


  const getCharacters = (event) => {


    event.preventDefault()
    setInputs.toString();
    if (localStorage.getItem(inputs)) {

      setCharacterInfos(JSON.parse(localStorage.getItem(inputs)));
      setLoading(false);

    } else {
      event.preventDefault()
      setInputs.toString();
      axios
        .get(
          `https://gateway.marvel.com:443/v1/public/characters?name=${inputs}&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then(response => {
          setCharacterInfos(response.data);
          console.log(response.data.data);
          setLoading(false)
          // response.data.data.results.map((item) => {
          //   return characterInfos.push(item)
          // })

          console.log(response.data.data.results[0].name);

          localStorage.setItem(response.data.data.results[0].name, JSON.stringify(response.data))
          if (!localStorage.getItem('marvelStorageDate')) {
            localStorage.setItem('marvelStorageDate', Date.now());
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  const displayResult = !loading ? (
    <Fragment>
    <div className="searchModalContainer">
      <div className="searchHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className="searchBody">
        <div className="searchImage">
          <img
            src={characterInfos.data.results[0].thumbnail.path + '.' + characterInfos.data.results[0].thumbnail.extension}
            alt={characterInfos.data.results[0].name}
          />
          {characterInfos.attributionText}
        </div>
        <div className="searchDetails">
          <h3>Description</h3>
          {
            characterInfos.data.results[0].description ?
              <p>{characterInfos.data.results[0].description}</p>
              :
              <p>Description indisponible...</p>
          }
          <h3>Plus d'info</h3>
          {
            characterInfos.data.results[0].urls &&
            characterInfos.data.results[0].urls.map((url, index) => {
              return <a
                key={index}
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {capitalizeFirstLetter(url.type)}
              </a>
            })
          }
        </div>
      </div>
    </div>
    </Fragment>
  )
    :
    (
      <Fragment>
        <div className="searchModalContainer">
          <div className="searchHeader">
            <h2>En attente des infos Marvel</h2>
          </div>
          <div className="searchBody">
            <Loading />
          </div>
        </div>
      </Fragment>
    )



  return (
    <Fragment>
      <h1>Personnage Infos</h1>
        <Logout />
      <form className='search-character-form' style={{marginBottom: '15px'}} onSubmit={getCharacters}>
        <input
          name="search"
          type="text"
          placeholder="Chercher un personnage"
          value={inputs}
          onChange={handleChange}
        />
        {btn ? <button>Confirmer</button> : <button disabled>Confirmer</button>}
      </form>
      {displayResult}
        <Link style={{ position: 'relative', top: '40px', left: '26%', color: 'white' }} to={{
          pathname: '/welcome',
          state: { pseudo: name }
        }}>Répondre au quiz Marvel</Link>
        <Link style={{ position: 'relative', top: '40px', left: '38%', color: 'white' }} to={{
          pathname: '/home',
          state: { pseudo: name }
        }}>retour à l'accueil</Link>
        <Link style={{ position: 'relative', top: '40px', left: '50%', color: 'white' }} to={{
          pathname: '/searchDisney',
          state: { pseudo: name }
        }}>Bibliothèque disney</Link>
    </Fragment>
  )
}


export default React.memo(SearchEngine)




