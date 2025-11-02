import React, { useContext, useState } from 'react'
import axios from 'axios'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currState === "Sign Up") {
            newUrl += "/api/user/register";
        } else {
            newUrl += "/api/user/login";
        }

        // Call API
        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-popup-inputs'>
                    {
                        currState === "Sign Up" ? <input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder='Your name' required /> : <></>
                    }
                    <input onChange={onChangeHandler} value={data.email} name="email" type="email" placeholder='Your email' required />
                    <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder='Your password' required />
                </div>
                <button>{currState === "Sign Up" ? "Create Account" : "Sign In"} </button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, you agree to our Terms of Use and Privacy Policy</p>
                </div>
                {
                    currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click me</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup