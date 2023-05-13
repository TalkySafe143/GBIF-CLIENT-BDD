import React, {useRef, useState} from 'react';
import '../styles/SignUp.css';
import axios from 'axios'
import {redirect} from "react-router-dom";

export default function SignUp() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setAdmin] = useState(false);

    async function register(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const res = await axios.post('http://localhost:3000/api/auth/sign-up', {
            name: username,
            email,
            password,
            isAdmin
        })
        console.log(res)

        redirect('/home');
    }

    return (
        <div className="boxP">
            <div className="formP">
                <h2>Sign up</h2>
                <div className="inputboxP">
                    <input
                        type="text"
                        required={true}
                        onChange={ e => setUserName(e.target.value)}
                        value={username}
                    />
                    <span>Username</span>
                    <i></i>
                </div>
                <div className="inputboxP">
                    <input
                        type="email"
                        required={true}
                        onChange={ e => setEmail(e.target.value)}
                        value={email}
                    />
                    <span>Email</span>
                    <i></i>
                </div>
                <div className="inputboxP">
                    <input
                        type="password"
                        required={true}
                        onChange={ e => setPassword(e.target.value)}
                        value={password}
                    />
                    <span>Password</span>
                    <i></i>
                </div>
                <div className="inputboxP">
                    <input
                        type="checkbox"
                        required={true}
                        onChange={ e => setAdmin(e.target.checked)}
                    />
                    <label>Administrador</label>
                </div>
                <div className="loginP">
                    <a onClick={register}>Sign up</a>
                </div>
                <div className="signupP">
                    <a href="/sign-in">Sign in</a>
                </div>
            </div>
        </div>
    )
}