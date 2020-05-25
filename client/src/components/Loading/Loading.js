import React, { Fragment } from 'react'
import './Loader.css'

const Loading = ({ loadingMsg, styling }) => {
  return (
    <Fragment>
      <div className="loader">
        <p style={styling}>
          {loadingMsg}
        </p>
      </div>
    </Fragment>
  )
}

export default Loading
