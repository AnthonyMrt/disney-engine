import React from 'react'
import AuthOptions from '../Auth/AuthOptions'


const Landing = () => {

  return (
    <main className="landingPage" >
      <AuthOptions />
    </main>
  )
}

export default React.memo(Landing)
