import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import './Login.css';
import Login from '../api/loginApi';
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        // Handle the login logic here
        console.log("click");
        event.preventDefault();
        let res
        console.log(username, password);
        const userData = { email: username, password: password }
        res = await Login(userData);
        console.log(res);
        if (res) {
            setIsSubmitted(true);
            console.log("response :", res)
            navigate("/Home");
        }
      
    };

    const renderForm = (
        <div className="form">
            <form className="login-form">
                <input label="Username or Email" value={username} type="email" placeholder='Email'
                    onChange={e => setUsername(e.target.value)} name="username" variant="outlined" fullwidth="true" required />
                {/* {renderErrorMessage("username")} */}
                <input label="Password" value={password}
                    onChange={e => setPassword(e.target.value)} type="password" placeholder='password' name="password" variant="outlined" fullWidth required />
                {/* {renderErrorMessage("password")} */}
                <Button variant="contained" onClick={handleLogin} color="primary">Login</Button>
            </form>
        </div>
    )
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div className="card"> User is successfully logged in <Button> <Link to="/Home"><span class="close">&times;</span></Link></Button></div> : renderForm}
            </div>
        </div>
    );
}

export default LoginForm;