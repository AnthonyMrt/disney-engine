import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const Home = (props) => {

  const name = localStorage.getItem('name');

  return (
    <Fragment>
      <main className="homePage" >
        <div className="leftBoxHome">
          <Link className="btn-home" to={{
            pathname: '/searchdisney',
            state: { pseudo: name }
          }}>Rechercher des infos sur un personnage disney</Link>
        </div>
        <div className="rightBoxHome">
          <Link className="btn-home" to={{
            pathname: '/welcome',
            state: { pseudo: name }
          }}>Répondre au quizz Marvel pour tester ses connaissances</Link>
        </div>
      </main>
    </Fragment>
  )
}

export default React.memo(Home)
