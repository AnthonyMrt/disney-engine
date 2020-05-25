import React, { Component, Fragment } from 'react'
import { QuizzMarvel } from '../QuizzMarvel'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QuizzOver from '../QuizzOver'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { answerSubmit, answerGood, answerFalse } from '../../actions/answerAction'
//import store from '../../store';

toast.configure();

const initialState = {
  quizzLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizzEnd: false,
  percent: null
}

const levelNames = ["debutant", "confirme", "expert"];



class Quizz extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }




  showToastMsg = pseudo => {
    if (!this.state.showWelcomeMsg) {

      this.setState({ showWelcomeMsg: true })

      toast(`Bienvenue ${pseudo}, bonne chance!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: "toastify-color-welcome"
      });
    }
  }

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizzLevel])
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizzEnd,
    } = this.state

    if ((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options
      })
    }

    if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if (quizzEnd !== prevState.quizzEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradePercent);
    }

    if (this.props.name) {
      this.showToastMsg(this.props.name)
    }
  }

  loadQuestions = quizz => {
    const fetchedArrayQuizz = QuizzMarvel[0].quizz[quizz]
    if (fetchedArrayQuizz.length >= this.state.maxQuestions) {

      this.storedDataRef.current = fetchedArrayQuizz;

      const newArray = fetchedArrayQuizz.map(({ answer, ...keepRest }) => keepRest);

      this.setState({ storedQuestions: newArray })
    }
  }

  submitAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
    const { dispatch } = this.props
    dispatch({
      type: 'ANSWER_SUBMIT',
      payload: {
        answerId: this.storedDataRef.current[this.state.idQuestion].id,
        answerSubmit: true,
        userAnswer: selectedAnswer
      }
    })
  }

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = percent => {

    if (percent >= 50) {
      this.setState({
        quizzLevel: this.state.quizzLevel + 1,
        percent,
        quizzEnd: true
      })
    } else {
      this.setState({
        percent
      })
    }
  }

  nextQuestion = () => {

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({ score: prevState.score + 1 }))

      toast.success('Bonne réponse! score +1 ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'toastify-color'
      })
      const { dispatch } = this.props
      dispatch(answerGood(this.storedDataRef.current[this.state.idQuestion].id, this.state.userAnswer, this.storedDataRef.current[this.state.idQuestion].answer))
    } else {
      toast.error('Mauvaise réponse!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      const { dispatch } = this.props
      dispatch(answerFalse(this.storedDataRef.current[this.state.idQuestion].id, this.state.userAnswer, this.storedDataRef.current[this.state.idQuestion].answer));
    }

    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      toast.warn('Quizz Terminé!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      //this.gameOver()
      this.setState({

        quizzEnd: true
      })

    } else {
      this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
    }
  }

  loadLevelQuestions = param => {
    this.setState({ ...initialState, quizzLevel: param })
    this.loadQuestions(levelNames[param])
  }

  render() {

    const {
      quizzLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizzEnd,
      percent
    } = this.state

    const displayOptions = options.map((option, index) => {
      return (
        <p key={index}
          className={`answerOptions ${userAnswer === option ? "selected" : null}`}
          onClick={() => this.submitAnswer(option)}
        ><FaChevronRight /> {option}</p>
      )
    })

    return quizzEnd ? (
      <QuizzOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizzLevel={quizzLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    )
      :
      (
        <Fragment>
          <div className="align-self-center mr-3">
            <Link style={{ color:'#4f78a4'}} to="/searchengine">Avant de commencez vous pouvez chercher des informations sur les personnages Marvel en cliquant ici.</Link>
          </div>
          <Levels
            levelNames={levelNames}
            quizzLevel={quizzLevel}
          />
          <ProgressBar
            idQuestion={idQuestion}
            maxQuestions={maxQuestions}
          />
          <h2>{question}</h2>

          {displayOptions}

          <button
            disabled={btnDisabled}
            className="btnSubmit"
            onClick={this.nextQuestion}
          >
            {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
          </button>
        </Fragment>
      )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    answerSubmit: () => dispatch(answerSubmit()),
    answerGood: () => dispatch(answerGood()),
    answerFalse: () => dispatch(answerFalse()),
  }
};

export default connect(mapDispatchToProps)(Quizz)
