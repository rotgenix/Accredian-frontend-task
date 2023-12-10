import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { Context } from '../main'
import { server } from '../App'
import '../Styles/Navbar.css'

const Navbar = () => {
    const { isAuthenticated, setAuthenticated } = useContext(Context);
    useEffect(() => {
        const loginChecker = async () => {
            const { data } = await axios.get(`${server}/user/checklogin`, {
                withCredentials: true,
            });
            if (data.success) {
                setAuthenticated(true);
            }
            else {
                setAuthenticated(false);
            }
        }
        loginChecker();
    })


    const logOutHandler = async () => {
        const { data } = await axios.get(`${server}/user/logout`, {
            withCredentials: true,
        })
        if (data.success) {
            setAuthenticated(false);
        }
        else {
            setAuthenticated(true);
        }
    }

    return (
        <>
            <nav className='navbar'>
                <div className="navbar-container">
                    <div className="left">
                        <h1>
                            <Link to={'/'}>Accredian</Link>
                        </h1>
                    </div>
                    <div className="right">
                        <ul className='navigation'>
                            <li>
                                {
                                    isAuthenticated ? "" : <Link to={'register'}>
                                        <button className='nav-btn'>Register</button>
                                    </Link>
                                }
                            </li>
                            <li>
                                {
                                    isAuthenticated ? <Link >
                                        <button onClick={logOutHandler} className='nav-login-btn'>LOGOUT</button>
                                    </Link> : <Link to={'/login'}>
                                        <button className='nav-login-btn'>LOGIN</button>
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar