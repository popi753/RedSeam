import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { onLogin } from '../model/auth';

import Input from "./Input"

import { UserContext, type contextType } from "../App";

import eye from "./../assets/eye.svg";

type loginProps = {
    setHaveAcc: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setHaveAcc }: loginProps) {

    const navigate = useNavigate();

    const [_user, setUser] = useContext<contextType>(UserContext) || [];

    type error = {
        email: string,
        password: string,
    }

    const [error, setError] = useState<error>({ email: "", password: "" });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError({ email: "", password: "" });
        const form = e.target as HTMLFormElement;
        const formData = {
            email: form.email.value,
            password: form.password.value
        }

        onLogin(formData).then((res) => {
            setUser && setUser({ email: res.user.email || "", avatar: res.user.avatar || null });
            navigate("/")
        }).catch((error) => {
            setError(prev => ({ ...prev, ...error }));
        });

    };

    return (
        <>
            <div className="auth-form-container">
                <span className='auth-form-title'>Log In</span>
                <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="auth-input-container">

                        <Input minLength={3} type='email' placeholder=' ' id="email" required={true} error={error.email} labelPlaceholder='Email'/>

                        <Input minLength={3} type='password' placeholder=' ' id="password" required={true} error={error.password} labelPlaceholder='Password' 
                                icon={eye} iconClassName="eye"/>


                    </div>
                    <button className='orange-btn small-btn' type="submit">Login</button>
                    <span className='register-link'>Not a member? <span onClick={() => setHaveAcc(prev => !prev)}>Register</span> </span>
                </form>
            </div>
        </>
    );
};