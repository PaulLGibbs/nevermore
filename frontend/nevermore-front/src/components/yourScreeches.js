import React, { Component } from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Timeline, Tweet } from 'react-twitter-widgets'
import Button from 'react-bootstrap/Button';
import ReactDOM from "react-dom";
import { render } from "react-dom";


var deleteUrl;
var credential;

class twLogin extends Component {
  state = { isSignedIn: false, value: '', seconds: 0}
  
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
        deleteUrl = "https://us-west2-nevermore-291718.cloudfunctions.net/tweetDelete?acctoken=" + token + "&toksecret=" + secret + "&tweetId="
        console.log("Access token: ", token, "\n", "Token secret ", secret, "\npostUrl: ", deleteUrl);
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

    this.tick = this.tick.bind(this);
    this.state.seconds = props.seconds;
  }

  componentDidMount = () => {
    this.timer = setInterval(this.tick, 1000);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
      
    }
    )
  }

  componentDidMount(){
    this.timer = setInterval(this.tick, 1000);
  }
  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1});
      console.log(this.state.seconds);
    } else {
      //clearInterval(this.timer);
      //window.location.reload();
    }
  }
  createUrl(tweetId) {
    deleteUrl = deleteUrl + tweetId;
    this.state.value = '';
    return deleteUrl;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    let tweetToBeDeleted = this.createUrl(this.state.value);
    
    window.open(tweetToBeDeleted );
    console.log(tweetToBeDeleted );
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
                <h2>Tweet ID to delete:</h2>
                <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Delete Tweet" />
            </form>
            
            <h1>Your screeches: </h1>
            <Tweet tweetId= {this.state.value} />
            <Button variant="outline-danger">Delete in 5 minutes</Button>
            <Button variant="outline-success">Add 5 minutes</Button>{' '}
            <Button variant="outline-danger">Delete in 1 hour</Button>
            <Button variant="outline-success">Add 1 hour</Button>{' '}
            
                <h3 value={this.state.seconds}>Timer: Broken :(</h3>
            

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
render(<twLogin seconds={60} />, document.getElementById("root"));

export default twLogin
