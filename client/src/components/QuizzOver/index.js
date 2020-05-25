import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Loading from '../Loading'
import Modal from '../Modal'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { quizSucceed, quizFailed, modalOpen, modalClose } from '../../actions/quizActions'
import store from '../../store';
import { useDispatch } from "react-redux";

const QuizzOver = React.forwardRef((props, ref) => {

  const {
    levelNames,
    score,
    maxQuestions,
    quizzLevel,
    percent,
    loadLevelQuestions
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

  const hash = '65c40dc80c8b5af637556f43b748e44a';

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setAsked(ref.current)

    if (localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
  }, [ref])

  const checkDataAge = date => {

    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24)

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now());
    }

  }

  const showModal = id => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {

      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
      const heroId = id;
      store.dispatch(modalOpen(heroId));


    } else {

      axios
        .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          setCharacterInfos(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data))
          if (!localStorage.getItem('marvelStorageDate')) {
            localStorage.setItem('marvelStorageDate', Date.now());
          }
          dispatch({
            type: "DATA_LOADED",
            payload: {
              data_loaded: true
            }
          })
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type: "NO_DATA",
            payload: {
              data_loaded: false
            }
          })
        })
    }
  }


  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
    store.dispatch(modalClose())
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    setTimeout(() => { loadLevelQuestions(0) }, 3000)
    setTimeout(() => { loadLevelQuestions(quizzLevel) }, 3000)
  }

  const note = `${score}/${maxQuestions}`;

  const decision = score >= averageGrade ? (
    <Fragment>
      {store.dispatch(quizSucceed(quizzLevel, note, percent))};
      <div className="stepsBtnContainer">
        {
          quizzLevel < levelNames.length ?
            (
              <Fragment>
                <p className="successMsg"><GiTrophyCup size='50px' />Bravo, vous passez au niveau suivant!</p>
                <button
                  className="btnResult success"
                  onClick={() => loadLevelQuestions(quizzLevel)}
                >
                  Niveau suivant</button>
              </Fragment>
            )
            :
            (
              <Fragment>
                {store.dispatch(quizSucceed(quizzLevel, note, percent))};
                <p className="successMsg"><GiTrophyCup /> Bravo, vous êtes un expert!</p>
                <button
                  className="btnResult gameOver"
                  onClick={() => loadLevelQuestions(0)}
                >
                  Accueil
                </button>
              </Fragment>
            )
        }
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite: {percent}%</div>
        <div className="progressPercent">Note: {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  )
    :
    (
      <Fragment>
        {store.dispatch(quizFailed(quizzLevel, note, percent))};
        <div className="align-self-center mr-3">
          <Link style={{ color: '#4f78a4' }} to="/searchengine">Avant de recommencez vous pouvez chercher des informations sur les personnages Marvel en cliquant ici.</Link>
        </div>
        <div className="stepBtnContainer">
          <p className="successMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
      </Fragment>
    )

  const questionAnswer = score >= averageGrade ? (
    asked.map(question => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
            <button
              className="btnInfo"
              onClick={() => showModal(question.heroId)}
            >
              Infos
            </button>
          </td>
        </tr>
      )
    })
  )
    :
    (
      <tr>
        <td colSpan="3">
          <Loading
            loadingMsg={"pas de réponse"}
            styling={{ textAlign: 'center', color: 'red' }}
          />
        </td>
      </tr>
    )

  const resultModal = !loading ?
    (
      <Fragment>
        <div className="modalHeader">
          <h2>{characterInfos.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
          <div className="comicImage">
            <img
              src={characterInfos.data.results[0].thumbnail.path + '.' + characterInfos.data.results[0].thumbnail.extension}
              alt={characterInfos.data.results[0].name}
            />
            {characterInfos.attributionText}
          </div>
          <div className="comicDetails">
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
        <div className="modalFooter">
          <button className="modalBtn" onClick={hideModal}>Fermer</button>
        </div>
      </Fragment>
    )
    :
    (
      <Fragment>
        <div className="modalHeader">
          <h2>En attente des infos Marvel</h2>
          <button className="modalBtn" onClick={hideModal}>Fermer</button>
        </div>
        <div className="modalBody">
          <p><Loading /></p>
        </div>
      </Fragment>
    )


  return (
    <Fragment>

      {decision}

      <hr />

      <p>Les Réponses au questions posées:</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {questionAnswer}
          </tbody>
        </table>
      </div>

      <Modal showModal={openModal} hideModal={hideModal}>

        {resultModal}

      </Modal>

    </Fragment>
  )
})

export default React.memo(QuizzOver)
