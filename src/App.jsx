import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Routes from './Routes'
import { HashRouter } from 'react-router-dom'
import MainPage from './components/MainPage'
import Authentication from './components/Authentication'
import * as firebase from 'firebase'


class App extends React.Component {
  render() {

  const config = {
      apiKey: "AIzaSyC2WRJdUlG4KVQF2TJb1Jz4St2iSeVoImY",
      authDomain: "pepper-2c787.firebaseapp.com",
  };
  firebase.initializeApp(config);

    return (
      <React.Fragment>
        <HashRouter>
          <React.Fragment>
            <MainPage></MainPage>
            <Authentication firebase={firebase}></Authentication>
            <Routes />
          </React.Fragment>
        </HashRouter>
      </React.Fragment>
    )
  }
}

export default App;
