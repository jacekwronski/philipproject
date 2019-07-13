import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase'

const authManager =  {
    getUIConfig: () => {
      return {
            signInSuccessUrl: 'localhost:3000',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: '[YOUR_TOS_URL]',
            // Privacy policy url/callback.
            privacyPolicyUrl: function () {
                window.location.assign('[YOUR_PRIVACY_POLICY_URL]');
            }
        };
    }
}

export default authManager