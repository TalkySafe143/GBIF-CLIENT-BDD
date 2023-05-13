import React from 'react';
import '../styles/App.css'
import axios from 'axios'

function SignIn() {

  function login(e: { preventDefault: () => void; }) {
    e.preventDefault();
  }

  return (
      <div className="box">
        <div className="form">
          <h2>Sign in</h2>
          <div className="inputbox">
            <input type="text" required={true}></input>
              <span>Username</span>
              <i></i>
          </div>
          <div className="inputbox">
            <input type="password" required={true}></input>
              <span>Password</span>
              <i></i>
          </div>
          <div className="login">
            <a onClick={login}>Sign in</a>
          </div>
          <div className="signup">
            <a href="/sign-up">Sign up</a>
          </div>
        </div>
      </div>
  );
}

export default SignIn;
