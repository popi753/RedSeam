import { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext, type contextType } from "../App";
import { onLogin } from '../model/auth';

import Input from "./Input"

import eye from "./../assets/eye.svg";

type loginProps = {
    setHaveAcc: React.Dispatch<React.SetStateAction<boolean>>;
};

type error = {
    email: string,
    password: string,
};

export default function Login({ setHaveAcc }: loginProps) {

    const navigate = useNavigate();

    const [_loggedIn, setLoggedIn] = useContext<contextType>(UserContext) || [];

    const [error, setError] = useState<error>({ email: "", password: "" });

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setError({ email: "", password: "" });
        const form = e.target as HTMLFormElement;
        if (form.email.value === "" || form.email.value.length < 3) {
            setError(prev => ({ ...prev, email: "Email must be at least 3 characters long" }));
            return;
        };
        if (form.password.value === "" || form.password.value.length < 3) {
            setError(prev => ({ ...prev, password: "Password must be at least 3 characters long" }));
            return;
        };
        const formData = {
            email: form.email.value,
            password: form.password.value
        };
        onLogin(formData).then(() => {
            setLoggedIn && setLoggedIn(true);
            navigate("/")
        }).catch((error) => {
            setError(prev => ({ ...prev, ...error }));
        });
    }, [setLoggedIn]);

    return (
        <>
            <div className="auth-form-container">
                <span className='auth-form-title'>Log In</span>
                <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="auth-input-container">
                        <Input minLength={3} type='email' placeholder=' ' id="email" required={true} error={error.email} labelPlaceholder='Email' />
                        <Input minLength={3} type='password' placeholder=' ' id="password" required={true} error={error.password} labelPlaceholder='Password'
                            icon={eye} iconClassName="eye" />
                    </div>
                    <button className='orange-btn small-btn' type="submit">Login</button>
                    <span className='register-link'>Not a member? <span onClick={() => setHaveAcc(prev => !prev)}>Register</span> </span>
                </form>
            </div>
        </>
    );
};