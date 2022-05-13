import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import icon from './icon2.png';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                });
                sessionStorage.setItem("token",JSON.stringify(result.user))
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
               <img src={icon} alt=""/> 
                <div className="login_text">
                    <h1> Sign in to say Hello !</h1>
                </div>
                <Button onClick={signIn}>Sign in With Google</Button>
           </div>
        </div>
    )
}

export default Login
