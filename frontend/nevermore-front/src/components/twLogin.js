import React, { Component } from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyDEEHsDmEOVCMl0R08pJYzrE6UU1GZUAQk",
  authDomain: "nevermore-291718.firebaseapp.com"
})

class twLogin extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(result){
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        console.log("Access token: ", token , "\n" , "Token secret", secret)
        //alert("token: " +  token + "\n" + "secret: " + secret)
      }
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    }
    )
  }
  render() {
    return (
      <div className="App">
        <div>Hello, Welcome to Nevermore</div>
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile pic"
              src={firebase.auth().currentUser.photoURL}
            />
            <p>
            <textarea name="message" rows="5" id="message" ></textarea>
            </p>
            <p>
            <button>Post Screech</button>
            </p>
          
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default twLogin
