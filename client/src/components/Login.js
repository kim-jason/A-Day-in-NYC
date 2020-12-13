import React from 'react';
import firebase from 'firebase';
import '../style/Dashboard.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

var firebaseui = require('firebaseui');
//Really should put this in another file
var firebaseConfig = {
    apiKey: "AIzaSyCqotvPiCbft4mE-o3qd16k0bCFtGi_ihc",
    authDomain: "cis550project-3b56f.firebaseapp.com",
    projectId: "cis550project-3b56f",
    storageBucket: "cis550project-3b56f.appspot.com",
    messagingSenderId: "493805368946",
    appId: "1:493805368946:web:aae9b0158b9639b3e6b4eb",
    measurementId: "G-D4G93BLSMW"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default class Login extends React.Component {
    constructor(props){
        super(props);
    }

 uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'http://localhost:3000/dashboard',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    // Privacy policy url.
    privacyPolicyUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  };

// The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

    render() {
        return (
            <div>
                <h1>New York Trips</h1>
                {/* <div id="firebaseui-auth-container"></div> */}
                {/* <div id="loader">Loading...</div> */}
                <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        )
    }
}
