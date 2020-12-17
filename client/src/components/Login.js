import React from 'react';
import firebase from 'firebase';
import '../style/Explore.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseConfig from '../fb-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function (authResult, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			},
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: 'popup',
		signInSuccessUrl: 'http://localhost:3000/explore',
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
		console.log(firebase.auth())
		return (
			<div style={{ textAlign: 'center', marginTop: '5rem' }}>
				<h1>A Day in NYC</h1>
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
