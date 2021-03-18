import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
else{
  firebase.app();
}

function App() {
  const [user, setUser] = useState({});
  // const [faUser, setFbUser] = useState({});


  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();


  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
  .then(res => {
    const user = res.user;
    setUser(user);
    console.log(res.user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
  }

  //  FACEBOOK SIGN WITH FIREBASE
  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
    const credential = result.credential;
    const user = result.user;
    const accessToken = credential.accessToken;
    setUser(user);
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
  }

  // SIGN IN WITH GITHUB
  const handleGithubSignIn = () => {
    firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
    console.log(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
    
  });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In With Google</button><br/>
      <button onClick={handleFbSignIn}>Sign In with facebook</button>
      <br/>
      <button onClick={handleGithubSignIn}>Sign In with Github</button>
      <p>Name: {user.displayName}</p>
      <p>email: {user.email}</p>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
