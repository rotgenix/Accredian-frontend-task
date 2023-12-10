import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import '../Styles/RegisterPage.css'
import Loader from '../Components/Loader';
import { Context } from '../main';
import { server } from '../App';
import AlertBox from '../Components/AlertBox';


const RegisterPage = () => {
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const loginChecker = async () => {
      const { data } = await axios.get(`${server}/user/checklogin`, {
        withCredentials: true,
      });

      if (data.success) {
        Navigate('/');
      }
    }
    loginChecker();
  })

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const callRegister = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password is not Same");
      setIsAlert(true);
    }
    else {
      setLoader(true);

      const { data } = await axios.post(`${server}/user/register`, {
        name, email, password, username
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (data.success) {
        setMessage(data.message);
        setIsAlert(true);
        setLoader(false);
      }
      else {
        setMessage(data.message);
        setIsAlert(true);
        setLoader(false);
      }
    }

  }
  return (
    <>
      <div className="player-register">
        {
          loader ? <Loader /> : <div>
            <div className="background-image">
            </div>

            <div className="player-register-container">
              <h3>Register Now</h3>
              <div className="form-container">
                <form onSubmit={callRegister}>

                  <input type="text" name='name' required
                    placeholder='Name'
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />

                  <input type="text" name='username' required
                    placeholder='Username'
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />

                  <input type="email" name='email' required
                    placeholder='Email'
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />

                  <input type="password" name='password' required
                    placeholder='Password'
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />

                  <input type="password" name='confirmPassword' required
                    placeholder='Confirm Password'
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (password != e.target.value) {
                        setMessage("Password is not Same");
                        setIsAlert(true);
                      }
                      else {
                        console.log("true")
                        setIsAlert(false);
                      }
                    }}
                  />
                  <button type='submit'>Register</button>
                </form>
              </div>
              {
                isAlert ? <AlertBox message={message} /> : <div></div>
              }
              <div className='login-here'>
                <p>Already registered?
                  <Link to={'/login'}>Login here</Link>
                </p>
              </div>
            </div>
          </div>
        }

      </div>
    </>
  )
}

export default RegisterPage