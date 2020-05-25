import React, { Fragment, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch } from "react-redux";


const Character = props => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    dispatch({
      type: "CHARACTER_CLICK",
      payload: {
        id: props.id,
        name: props.name,
        univers: props.univers
      }
    });
  }



  return (

    <Fragment>
      <button className="searchDisneyButton"><img className='searchDisneyImg' src={props.image} onClick={handleShow} alt='logo' /></button>
      <Modal
        {...props}
        className='searchModal'
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: '#4f78a4', color: 'white'}} closeButton>
          <Modal.Title style={{ fontFamily: 'Bangers'}} id="contained-modal-title-vcenter">
            Personnage infos
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{fontWeight: 'bold'}}>Name : {props.name}</p>
          <p style={{fontWeight: 'bold'}}>username: {props.username}</p>
          <p style={{fontWeight: 'bold'}}>Univers: {props.univers}</p>
          <div className="modalImage">
            <img
              src={props.image}
              alt={props.name}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#4f78a4'}}onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default Character
