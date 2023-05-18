import React, {useRef, useState} from 'react';
import styleSignUp from '../styles/SignUp.module.css';
import axios, {AxiosError} from 'axios'
import { Navigate } from "react-router-dom";

export default function SignUp() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const [isLogged, setLogged] = useState('no');

    async function Register(e: { preventDefault: () => void; }) {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:3000/api/auth/sign-up`, {
                name: username,
                email,
                password,
                isAdmin
            })
            const apiRes = await res.data
            if (apiRes.error === null) setLogged('yes');
            else setLogged(apiRes.error.message);
            // @ts-ignore
        } catch (e: AxiosError) {
            setLogged(e.response.data.error.message)
        }
    }

    return (
        <>
        <img src="ardilla.png" alt="ardilla" className={styleSignUp.ardilla}
            style={{ left: window.innerHeight + 310}}
        />
        <img src="colibri.png" alt="colibri" className={styleSignUp.colibri}
             style={{ left: window.innerHeight - (window.innerHeight + 450) }}
        />
        <div className={styleSignUp.boxP}>
            <div className={styleSignUp.formP}>
                <h2>Sign up</h2>
                <div className={styleSignUp.inputboxP}>
                    <input
                        type="text"
                        required={true}
                        onChange={ e => setUserName(e.target.value)}
                        value={username}
                    />
                    <span>Username</span>
                    <i></i>
                </div>
                <div className={styleSignUp.inputboxP}>
                    <input
                        type="email"
                        required={true}
                        onChange={ e => setEmail(e.target.value)}
                        value={email}
                    />
                    <span>Email</span>
                    <i></i>
                </div>
                <div className={styleSignUp.inputboxP}>
                    <input
                        type="password"
                        required={true}
                        onChange={ e => setPassword(e.target.value)}
                        value={password}
                    />
                    <span>Password</span>
                    <i></i>
                </div>
                <div className={styleSignUp.inputboxPCheck}>
                    <input
                        type="checkbox"
                        required={true}
                        onChange={ e => setAdmin(e.target.checked)}
                    />
                    <label>Administrador</label>
                </div>
                <div className={styleSignUp.loginP}>
                    <a onClick={Register}>Sign up</a>
                </div>
                <div className={styleSignUp.signupP}>
                    <a href="/sign-in">Sign in</a>
                </div>
                <h1 className={styleSignUp.error}>
                    {
                        isLogged === 'yes' ? <Navigate to={'/sign-in'} /> : (
                            isLogged === 'no' ? "" : isLogged
                        )
                    }
                </h1>
            </div>
        </div>
        </>
    )
}