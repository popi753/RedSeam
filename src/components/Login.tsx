import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { onLogin } from '../model/auth';

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

    function changeVisibility(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const input = (e.currentTarget as HTMLElement)
            .parentElement?.firstElementChild as HTMLInputElement
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    };

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
            // console.log(error?.message)
            setError(prev => ({ ...prev, ...error }));
        });

    };

    return (
        <>
            <div className="auth-container">
                <span className='auth-form-title'>Log In</span>
                <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="auth-input-container">
                        <div className="auth-input-wrapper">
                            <input minLength={3} type="email" placeholder=" " name='email' id='email' autoComplete='off' required className={error.email ? "input-error" : ""}/>
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <span className="error-msg">{error.email}</span>
                        </div>
                        <div className="auth-input-wrapper">
                            <input minLength={3} type="password" placeholder=" " name='password' id='password' required className={error.password ? "input-error" : ""}/>
                            <label htmlFor="password">Password <span className="required">*</span></label>
                            <div className='icon-wrapper-small' onClick={(e) => changeVisibility(e)}>
                                <img className='eye' src={eye} alt="X" />
                            </div>
                            <span className="error-msg">{error.password}</span>
                        </div>
                    </div>
                    <button className='orange-btn' type="submit">Login</button>
                    <span className='register-link'>Not a member? <span onClick={() => setHaveAcc(prev => !prev)}>Register</span> </span>
                </form>
            </div>
        </>
    );
};