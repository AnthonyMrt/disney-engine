import React from 'react'
import Logout from '../Logout'
import Quizz from '../Quizz'



const Welcome = (props) => {

  const name = props.location.state.pseudo


  return (
    <div className="quiz-bg">
      <div className="container">
        <Logout name={name} />
        <Quizz name={name} />
      </div>
    </div>
  )
}

export default Welcome
