import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [account, setAccount] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required!';
        }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors || {});
        if (errors)
            return;

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/auth',
            data: {
                login: account.username,
                password: account.password
            }
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            handleChangeRoute();
        }).catch((error) => {
            const errors = {};
            errors.password = 'Given username doesn\'t exist or password is wrong!';
            setErrors(errors || {});
            console.log(error);
        });
    };

    const handleChange = (event) => {
        const updatedAccount = { ...account };
        updatedAccount[event.currentTarget.name] = event.currentTarget.value;
        setAccount(updatedAccount);
    };

    const handleChangeRoute = () => {
        navigate('/home');
        window.location.reload();
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        value={account.username}
                        name="username"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="Username"
                    />
                    {errors.username && <div className="alert alert-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={account.password}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                    />
                    {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                </div><br />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
