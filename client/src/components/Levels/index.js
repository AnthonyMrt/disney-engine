import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({ levelNames, quizzLevel }) => {

  const [levels, setLevels] = useState([]);

  useEffect(() => {

    const quizSteps = levelNames.map(level => ({ title: level.toUpperCase() }))
    setLevels(quizSteps)
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: 'transparent' }}>
      <Stepper
        steps={levels}
        activeStep={quizzLevel}
        circleTop={0}
        activeTitleColor={'#4f78a4'}
        activeColor={'#4f78a4'}
        completeTitleColor={'#E0E0E0'}
        defaultTitleColor={'#E0E0E0'}
        completeColor={'#E0E0E0'}
        completeBarColor={'#E0E0E0'}
        barStyle={'dashed'}
        circleFontSize={20}
      />
    </div>
  )
}

export default React.memo(Levels)
