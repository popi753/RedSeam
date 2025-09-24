import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/register.css';

import { onRegister } from '../model/auth';

import { UserContext, type contextType } from "../App";

import eye from "./../assets/eye.svg";

type registerProps = {
    setHaveAcc: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function Register({ setHaveAcc }: registerProps) {

    const navigate = useNavigate();

    const [_user, setUser] = useContext<contextType>(UserContext) || [];

    type error = {
        username: string,
        email: string,
        password: string,
        password_confirmation: string,
        avatar: string
    };

    const [error, setError] = useState<error>({ username: "", email: "", password: "", password_confirmation: "", avatar: "" });

    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        setAvatar(file);
        setAvatarUrl(file ? URL.createObjectURL(file) : null);
    };

    function handleRemoveAvatar() {
        setAvatar(null);
        setAvatarUrl(null);
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError({ username: "", email: "", password: "", password_confirmation: "", avatar: "" });
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        if (avatar) {
            const sizeMB = (avatar!.size / 1024 / 1024).toFixed(2);
            if (Number(sizeMB) > 1) {
                setError(prev => ({ ...prev, avatar: "Avatar size should be less than 1MB" }));
                return;
            }
            formData.append('avatar', avatar);
        }
        if (formData.get('password') !== formData.get('password_confirmation')) {
            setError(prev => ({ ...prev, password_confirmation: "Passwords do not match" }));
            return;
        };



        onRegister({ formData }).then((res) => {
            setUser && setUser({ email: res.user.email || "", avatar: res.user.avatar || null });
            navigate("/")
        }).catch((error) => {
            setError(prev => ({ ...prev, ...error }));
        });

    };

    function changeVisibility(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const input = (e.currentTarget as HTMLElement)
            .parentElement?.firstElementChild as HTMLInputElement
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    };

    return (
        <>
            <div className="auth-container">
                <span className='auth-form-title'>Registration</span>
                <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="auth-input-container">
                        <div className="auth-input-wrapper avatar-wrapper">
                            <input
                                className='avatar-input'
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                            <div className="avatar-preview">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="avatar" className="avatar-img" />
                                ) : (
                                    <span className="avatar-placeholder">No Avatar</span>
                                )}
                            </div>
                            <div className="avatar-actions">
                                <label htmlFor="avatar" className="upload">Upload New</label>
                                {avatar && (
                                    <span className="remove" onClick={handleRemoveAvatar}>
                                        Remove
                                    </span>
                                )}
                            </div>
                            <span className="error-msg">{error.avatar}</span>
                        </div>
                        <div className="auth-input-wrapper">
                            <input minLength={3} type="text" placeholder=" " name='username' id='username' autoComplete='off' required className={error.username ? "input-error" : ""}/>
                            <label htmlFor="username">Username <span className="required">*</span></label>
                            <span className="error-msg">{error.username}</span>
                        </div>
                        <div className="auth-input-wrapper">
                            <input minLength={3} type="email" placeholder=" " name='email' id='email' autoComplete='off' required className={error.email ? "input-error" : ""}/>
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <span className="error-msg">{error.email}</span>
                        </div>
                        <div className="auth-input-wrapper">
                            <input minLength={3} type="password" placeholder=" " name='password' id='password' required className={(error.password || error.password_confirmation) ? "input-error" : ""}/>
                            <label htmlFor="password">Password <span className="required">*</span></label>
                            <div className='icon-wrapper-small' onClick={(e) => changeVisibility(e)}>
                                <img className='eye' src={eye} alt="X" />
                            </div>
                            <span className="error-msg">{error.password}</span>
                        </div>
                        <div className="auth-input-wrapper">
                            <input minLength={3} type="password" placeholder=" " name='password_confirmation' id='password_confirmation' required className={(error.password || error.password_confirmation) ? "input-error" : ""}/>
                            <label htmlFor="password_confirmation">Confirm Password <span className="required">*</span></label>
                            <div className='icon-wrapper-small' onClick={(e) => changeVisibility(e)}>
                                <img className='eye' src={eye} alt="X" />
                            </div>
                            <span className="error-msg">{error.password_confirmation}</span>
                        </div>
                    </div>
                    <button className='orange-btn' type="submit">Register</button>
                    <span className='register-link'>Already member? <span onClick={() => setHaveAcc(prev => !prev)}>Log in</span> </span>
                </form>
            </div>
        </>
    )
}