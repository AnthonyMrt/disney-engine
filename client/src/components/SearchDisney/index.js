import React, { Fragment, useEffect, useState } from 'react'
import SearchBox from '../SearchBox'
import CharacterList from '../CharacterList'
import { useQueryState } from 'react-router-use-location-state'
import Logout from '../Logout'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
//import axios from 'axios'


const SearchDisney = (props) => {

  const [inputs, setInputs] = useState('');
  const [btn, setBtn] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [searchUnivers, setSearchUnivers] = useState('');
  const [checked, setChecked] = useState('');
  const [queryString, setQueryString] = useQueryState("q", "")
  const [univers, setUnivers] = useQueryState('univers', []);
  const [result, setResult] = useState(false);
  const [allCharacter, setAllCharacter] = useState([])
  //const [hero, setHero] = useState([])
  const dispatch = useDispatch();

  const out = localStorage.getItem("user")
  const name = localStorage.getItem("name")



  useEffect(() => {

    callAPI();
    //callHero();

    if (inputs.length > 2) {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }



  }, [inputs, btn])



  // const callHero = async () => {
  //   axios
  //     .get(
  //       'https://gateway.marvel.com:443/v1/public/characters?apikey=a995b6f09ea93a47a40ba6b846a634bf'
  //     )
  //     .then(response => {
  //       setHero(response.data);
  //       console.log(response.data.data);
  //       console.log(hero.map((h, id) => {
  //         return h.data.results.name
  //       }

  //       ));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //   })
  // }

  const callAPI = () => {
    try {
      if (localStorage.getItem("user")) {
        fetch("http://localhost:9000/disneyCharacter", {
          headers: {
            "authToken": JSON.parse(localStorage.getItem("user"))
          }
        })
          .then(res => res.json())
          .then(res => setApiResponse(res))
          .then(res => setAllCharacter(res))
          .then(setResult(true))
          dispatch({
            type: "DATA_LOADED",
            payload: {
              data_loaded: true
            }
        })
      } else {
        fetch("http://localhost:9000/disneyCharacter", {
        })
          .then(res => res.json())
          .then(res => setApiResponse(res))
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "NO_DATA",
        payload: {
          data_loaded: false
        }
      })
    }
  }


  const handleChange = (event) => {
    setInputs(event.target.value);
    setQueryString(event.target.value)
    setSearchCharacter(inputs)
    event.preventDefault();
    if (searchCharacter.length > 2) {
      localStorage.removeItem('search')
      localStorage.setItem('search', inputs)
      dispatch({
        type: "SEARCH_SUBMIT",
        payload: {
          searchSubmit: searchCharacter
        }
      });
    }
  }

  const handleInput = (e) => {
    setSearchCharacter(inputs)
    e.preventDefault();
    localStorage.setItem(inputs, inputs)
  }

  const handleCheck = (e) => {
    setSearchUnivers(e.target.value)
    setChecked(e.target.checked)
    const franchise = e.target.value;
    setUnivers(franchise);
    dispatch({
      type: "UNIVERS_SELECT",
      payload: {
        univers: franchise
      }
    });
  };



  const charactersFiltered = checked === false ?
    (
      searchCharacter.length <= 1 ?
        (
          allCharacter
        )
        :
        (
          apiResponse
            .filter((character) => {
              return character.name.toLowerCase().includes(searchCharacter.toLowerCase())
            })
        )
    )
    :
    (
      searchCharacter.length <= 1 ?
        (
          apiResponse
            .filter((character) => {
              return character.univers.toLowerCase().includes(searchUnivers.toLowerCase())
            })
        )
        :
        (
          apiResponse
            .filter((character) => {
              return character.name.toLowerCase().includes(searchCharacter.toLowerCase())
            })
            .filter((character) => {
              return character.univers.toLowerCase().includes(searchUnivers.toLowerCase())
            })
        )
    )

  const display = result === true ? (
    <Fragment>
      <SearchBox handleInput={handleInput} handleCheck={handleCheck} handleChange={handleChange} btn={btn} inputs={inputs} />
      <CharacterList className="search-result-display" charactersFiltered={charactersFiltered} />
      <Link style={{ position: 'relative', top: '50px', right: '50px', color: 'white' }} to={{
        pathname: '/welcome',
        state: { pseudo: name }
      }}>Répondre au quiz Marvel</Link>
      <Link style={{ position: 'relative', top: '50px', right: '20px', color: 'white' }} to={{
        pathname: '/home',
        state: { pseudo: name }
      }}>retour à l'accueil</Link>
    </Fragment>
  )
    :
    (
      <p>Veuillez-vous connecter pour accéder à ce service!</p>
    )


  return (
    <Fragment>
      <div className="searchBackground">
        <div className="search-result">
          <h1>Bibliothèque Personnage</h1>

          <Logout name={out} />
          {display}

        </div>
      </div>
    </Fragment>
  )
}



export default SearchDisney


// <form className='search-character-form'>
// <input
//   name="search"
//   type="text"
//   placeholder="Chercher un personnage"
//   value={inputs}
//   onChange={handleChange}
// />
// {btn ? <button>Confirmer</button> : <button disabled>Confirmer</button>}
// </form>
// <p style={{ color: 'white' }}>
// {apiResponse.map(character => (<div className='search-result'><p>Prénom: {character.name}</p> <p> Nom: {character.username}</p> <p> Date de création: {character.yearCreation}</p></div>)
// )}
// </p>



  // const filteredCharacters = () => {
  //     return apiResponse.filter((character) => {
  //      return character.name.toLowerCase().includes(searchCharacter.toLowerCase())
  //   })
  // }

  // const charactersFiltered = searchCharacter.length <= 2 ?
  //   (
  //     apiResponse
  //   )
  //   :
  //   (
  //     checked === false ? (
  //       apiResponse
  //       .filter((character) => {
  //         return character.name.toLowerCase().includes(searchCharacter.toLowerCase())
  //       })
  //     )
  //     :
  //     (
  //       apiResponse
  //       .filter((character) => {
  //         return character.name.toLowerCase().includes(searchCharacter.toLowerCase())
  //       })
  //       .filter((character) => {
  //         return character.univers.toLowerCase().includes(searchUnivers.toLocaleLowerCase())
  //       })
  //     )
  //   )



    //  const results = searchTerm.length <= 2
  //  ? characterInfos
  //  : characterInfos.filter(character =>
  //      character.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  //    );
