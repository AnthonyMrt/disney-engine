import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../../App.css';
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import EmailVerification from '../EmailVerification'
import ForgetPassword from '../ForgetPassword'
import RedefinePassword from '../RedefinePassword'
import ResendToken from '../ResendToken'
import Home from '../Home'
import Welcome from '../Welcome'
import Quizz from '../Quizz'
import SearchDisney from '../SearchDisney'
import SearchEngine from '../SearchEngine'
import ErrorPage from '../ErrorPage'
import { IconContext } from 'react-icons'
import  PrivateRoute  from '../PrivateRoute'




function App() {

  return (
    <div className="App">
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Header />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/emailConfirmation/:token" component={EmailVerification} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route path="/redefinepassword/:token" component={RedefinePassword} />
            <Route path="/resendToken" component={ResendToken} />
            <Route path="/home" component={Home} />
            <Route path="/quizz" component={Quizz} />
            <PrivateRoute path="/welcome" component={Welcome} />
            <Route path="/searchdisney" component={SearchDisney} />
            <Route path="/searchengine" component={SearchEngine} />
            <Route component={ErrorPage} />
          </Switch>

          <Footer />
        </IconContext.Provider>
      </Router>
    </div>
  );
}

export default App;
