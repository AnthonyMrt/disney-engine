import React, { useEffect, useState, Fragment } from 'react'
import { Card, Button } from 'react-bootstrap'

const EmailVerification = (props) => {

  const [userStatus, setUserStatus] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    callAPI();

  }, [])

  const callAPI = async () => {
    const token = props.match.params.token;
    await fetch(`http://localhost:9000/emailConfirmation/${token}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.etat === 'noToken') {
          setUserStatus({ etat: "Aucun token correspondant à cette email n'a été trouvé, veuillez recommencez la procédure de vérification d'email.", msg: 'Vous allez être redirigez vers la page correspondante.', lien: '/resendToken', bg: 'warning'})
          setTimeout(() => {
            props.history.push('/resendToken');
          }, 5000)
        }
        else if (res.etat === 'noUser') {
          setUserStatus({
            etat: "Aucun utilisateur correspond à cette email n'a été trouvez, veuillez recommencez la procédure d'inscription.", msg: 'Vous allez être redirigez vers la page correspondante', lien: ' / register', bg: 'warning'})
          setTimeout(() => {
            props.history.push('/register');
          }, 5000)
        }
        else if (res.etat === 'alreadyDone') {
          setUserStatus({etat: "Ce compte à déja été vérifier, vous pouvez connectez.", msg: 'Vous allez être redirigez vers la page correspondante', lien: ' / login', bg: 'primary'})
          setTimeout(() => {
            props.history.push('/login');
          }, 5000)
        }
        else {
          setUserStatus({etat: "Votre compte est vérifier, veuillez-vous connectez.", msg: 'Vous allez être redirigez vers la page correspondante', lien: ' / register', bg: 'success'})
          console.log(res.etat);
          setTimeout(() => {
            props.history.push('/login');
          }, 5000)
        }
      })
      .catch(err => {
        setError(err);
        console.log(error);
      })
  }



  return (
    <Fragment>

      <Card style={{ width: '50rem', marginLeft: 'auto',marginRight: 'auto'}} bg={userStatus.bg} className="text-center">
        <Card.Header style={{fontWeight:'bold', fontSize: '40px'}}>Confirmation d'email</Card.Header>
        <Card.Body>
          <Card.Text>
            {userStatus.etat}
            <br></br>
            {userStatus.msg}
          </Card.Text>
          <Button href={userStatus.lien} variant="link">Si vous n'êtes pas redirigez cliquez-ici</Button>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default EmailVerification
