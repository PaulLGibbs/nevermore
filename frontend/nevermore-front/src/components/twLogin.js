import React, { Component } from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

//add your own firebase config
firebase.initializeApp({
  apiKey: "", 
  authDomain: "nevermore-291718.firebaseapp.com",
  databaseURL: "https://nevermore-291718.firebaseio.com",
  projectId: "nevermore-291718",
  storageBucket: "nevermore-291718.appspot.com",
})

var postUrl;
var credential;

class twLogin extends Component {
  state = { isSignedIn: false, value: ''}
  
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        //credential = firebase.auth.TwitterAuthProvider.credential(token, secret);
        postUrl = "https://us-west2-nevermore-291718.cloudfunctions.net/functionpython-2?acctoken=" + token + "&toksecret=" + secret + "&tbody="
        console.log("Access token: ", token, "\n", "Token secret ", secret, "\npostUrl: ", postUrl);
        //alert("token: " +  token + "\n" + "secret: " + secret);
        
        return true;
      }
    }
  }

  constructor(props) {
    super(props);
    this.tweetthis = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    }
    )
  }

  createUrl(tweetText) {
    tweetText.replace('#', "%23");
    tweetText.replace(" ", "%20");
    postUrl = postUrl + tweetText;
    this.state.value = '';
    return postUrl;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    let tweetToBeSent = this.createUrl(this.state.value);
    window.open(tweetToBeSent);
    console.log(tweetToBeSent);
    event.preventDefault();
  }
  render = () => {
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
            <form onSubmit={this.handleSubmit}>
            <label>
                <h2>Tweet:</h2>
                <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>

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

