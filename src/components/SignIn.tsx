import React, {useEffect, useState} from 'react';
import appStyles  from '../styles/App.module.css'
import axios, {AxiosError} from 'axios'
import {Navigate} from "react-router-dom";

function SignIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [signin, setSignIn] = useState('no')

  async function Login(e: { preventDefault: () => void; }) {
    e.preventDefault();
    //@ts-ignore
    let apiRes;
      try {
          const res = await axios.post(`http://localhost:3000/api/auth/sign-in`, {
              apiKeyToken: apiKey
          }, {
              auth: {
                  username,
                  password
              }
          })
          apiRes = await res.data
          console.log(apiRes)
          if (apiRes.error === null) {
              setSignIn('yes');
          }
          else setSignIn(apiRes.error.message);
          // @ts-ignore
      } catch (e: AxiosError) {
          setSignIn(e.response.data.error.message)
      } finally {
              //@ts-ignore
              localStorage.setItem('jwt', apiRes.data.token || "");
      }
  }

  return (
      <>
      <img src="ardilla.png" alt="ardilla" className={appStyles.ardilla}
           style={{ left: window.innerHeight + 310}}
      />
      <img src="colibri.png" alt="colibri" className={appStyles.colibri}
           style={{ left: window.innerHeight - (window.innerHeight + 450) }}
      />
      <div className={appStyles.box}>
        <div className={appStyles.form}>
          <h2>Sign in</h2>
          <div className={appStyles.inputbox}>
            <input type="text" required={true}
                onChange={e => setUsername(e.target.value)}
                   value={username}
            />
              <span>Email</span>
              <i></i>
          </div>
          <div className={appStyles.inputbox}>
            <input type="password" required={true}
                onChange={e => setPassword(e.target.value)}
                   value={password}
            />
              <span>Password</span>
              <i></i>
          </div>
            <div className={appStyles.inputbox}>
                <input type="text" required={true}
                       onChange={e => setApiKey(e.target.value)}
                       value={apiKey}
                />
                <span>Api Key</span>
                <i></i>
            </div>
          <div className={appStyles.login}>
            <a onClick={Login}>Sign in</a>
          </div>
          <div className={appStyles.signup}>
            <a href="/sign-up">Sign up</a>
          </div>
        </div>
      </div>
          <h1 className={appStyles.error}>
              {
                  signin === 'yes' ? <Navigate to={'/home'} /> : (
                      signin === 'no' ? "" : signin
                  )
              }
          </h1>
      </>
  );
}

export default SignIn;
