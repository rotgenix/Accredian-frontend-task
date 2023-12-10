import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css'
import { Context } from '../main';
import Loader from '../Components/Loader';
import { server } from '../App';
import AlertBox from '../Components/AlertBox';
const LoginPage = () => {
    const [loader, setLoader] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [message, setMessage] = useState(false);
    const Navigate = useNavigate();
    const { isAuthenticated, setAuthenticated, } = useContext(Context)
    useEffect(() => {
        if (isAuthenticated) {
            Navigate('/');
        }
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const callLogin = async (e) => {
        e.preventDefault();
        setLoader(true);
        const { data } = await axios.post(`${server}/user/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })
        if (data.success) {
            setLoader(false);
            setAuthenticated(true);
        }
        else {
            setMessage(data.message);
            setIsAlert(true);
            setLoader(false);
            setAuthenticated(false);
        }
    }
    return (
        <>
            <div className="player-login">
                {
                    loader ? <Loader /> :
                        <div className="player-login-container">
                            <div className="img-form">
                                <div className="player-login-image">
                                    {/* <img src={playerimg} alt="" /> */}
                                </div>
                                <form onSubmit={callLogin}>

                                    <input type="email" name='email' required
                                        placeholder='Email'
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <input type="password" name='password' required
                                        placeholder='Password'
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />

                                    <button type='submit'>Login</button>
                                </form>
                            </div>
                            {
                                isAlert ? <AlertBox message={message} /> : <div></div>
                            }
                            <div className='register-here'>
                                <p>Not Registered?
                                    <Link to={'/register'}>Register here</Link>
                                </p>
                            </div>
                        </div>

                }

            </div>
        </>
    )
}

export default LoginPage