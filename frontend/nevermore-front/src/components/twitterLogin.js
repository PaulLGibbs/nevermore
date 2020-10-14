import React, { Component } from "react";
import { TwitterLoginButton } from "react-social-login-buttons";

export default class twitterLogin extends Component {
    render() {
        return (
<div>
    <h1>Hello, Welcome to nevermore.</h1>
<form>
                <h3>Sign In</h3>
                <TwitterLoginButton onClick={() => alert("Hello")} />
            </form>

</div>
        );
    }
}