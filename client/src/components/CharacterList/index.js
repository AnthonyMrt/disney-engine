import React from 'react'
import Character from '../Character'

const CharacterList = (props) => {

  const characters = props.charactersFiltered.slice(0, 10).map((character, id) => {
    return <Character key={id} id={character.id} name={character.name} username={character.username} yearCreation={character.yearCreation} image={character.image} univers={character.univers} />
  })

  return (
    <div>
      {characters}
    </div>
  )
}

export default CharacterList
