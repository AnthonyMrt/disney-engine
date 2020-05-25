import React from 'react'
import { Button} from 'react-bootstrap';


const SearchBox = (props) => {
  return (
    <div>
      <input placeholder='Chercher votre personnage préféré' value={props.inputs} onChange={props.handleChange} type="text" />
      <br></br>
      <h4 className='franchise'>Filtrer par Franchise</h4>
        <Button className='filterButton' variant="light" type="radio" name="radio" value="disney" onClick={props.handleCheck}>
          Disney
        </Button>
        <Button className='filterButton' variant="light" type="radio" name="radio" value="starwars" onClick={props.handleCheck}>
          Starwars
        </Button>
        <Button className='filterButton' variant="light" type="radio" name="radio" value="marvel" onClick={props.handleCheck}>
          Marvel
        </Button>
        <Button className='filterButton' variant="light" type="radio" name="radio" value="" onClick={props.handleCheck}>
          Toutes les franchises
        </Button>
    </div>
  )
}


export default SearchBox
