import profileStyles from '../styles/Profile.module.css'
import Header from './Header'
import axios from 'axios'
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import styleSignUp from "../styles/SignUp.module.css";

export default function Profile() {

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [log, setLog] = useState(false);
    const [updated, setUpdated] = useState('');
    const [id, setId] = useState('');
    const [newUser, setNewUser] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    //@ts-ignore
    async function updateUser(e) {
        let data;
        try {
            const res = await axios.put(`http://localhost:3000/api/users/${id}`,{
                name: newUser,
                email: newEmail,
                password: newPassword
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            });

            data =  await res.data
            if (data.error === null) setUpdated('success')
        } catch (e) {
            setUpdated('error')
        }
    }

    async function getUserData() {
        let data;
        try {
            const res = await axios.get('http://localhost:3000/api/users/me', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            });

            return await res.data
        } catch (e) {
            throw e;
        }
    }

    function rende() {

        getUserData().then(va => {
            console.log(va)
            setUsuario(va.data.name);
            setEmail(va.data.email)
            setRol(va.data.isAdmin ? 'Administrador' : 'Usuario')
            setId(va.data._id);
        }).catch(err => {
          setLog(true)
        })
    }

    rende()

    return (
        <>
            <Header />
            {
                //@ts-ignore
                log ? <Navigate to={'/sign-in'} /> : ""
            }
            <div className={profileStyles.box}>
                <div className={profileStyles.form}>
                    <h2>Datos personales</h2>

                    <div className={profileStyles.inputbox}>
                        <div className="actual">
                            <h4>Usuario actual</h4>
                            <p>{usuario}</p>
                        </div>
                        <input type="text" required={true}
                            onChange={e => setNewUser(e.target.value)}
                               value={newUser}
                        />
                            <span>Usuario Nuevo</span>
                            <i></i>
                    </div>
                    <div className={profileStyles.inputbox}>
                        <input type="password" required={true}
                               onChange={e => setNewPassword(e.target.value)}
                               value={newPassword}/>
                            <span>Contraseña Nueva</span>
                            <i></i>
                    </div>

                    <div className={profileStyles.inputbox}>
                        <div className="actual">
                            <h4>Email actual</h4>
                            <p>{email}</p>
                        </div>
                        <input type="text" required={true}
                               onChange={e => setNewEmail(e.target.value)}
                               value={newEmail}/>
                            <span>Email Nuevo</span>
                            <i></i>
                    </div>

                    <div className={profileStyles.inputbox}>
                        <div className="actual">
                            <h4>Rol</h4>
                            <p className="rol">{rol}</p>
                        </div>


                    </div>

                    <div className={profileStyles.login} onClick={updateUser}>
                        <a href="">Actualizar</a>
                    </div>
                    <h1 className={profileStyles.error}>
                        {
                            updated === 'success' ? "Su usuario ha sido modificado!" : (
                                updated === 'error' ? "Hubo un error!" : ""
                            )

                        }
                    </h1>
                    </div>
            </div>
        </>
    );
}