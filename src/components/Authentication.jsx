import React from 'react';
import authManager from '../authManager'
import * as firebaseui from 'firebaseui'


const Authentication = ({ firebase }) => {

    // UI Configuration
    var uiConfig = authManager.getUIConfig()
    const auth = firebase.auth()
    // Initialize the UI Components.
    var ui = new firebaseui.auth.AuthUI(auth);
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    const initApp = function () {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log('user', user)
                user.getIdToken().then(function (accessToken) {
                    console.log('access token', accessToken)
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('user', user.email);
                });
            }
        }, function (error) {
            console.log(error);
        });
    };

    window.addEventListener('load', function () {
        initApp();
    });

    return (<div id="firebaseui-auth-container">
        <h1>Welcome to My Awesome App</h1>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <pre id="account-details"></pre>
    </div>)
}

export default Authentication;