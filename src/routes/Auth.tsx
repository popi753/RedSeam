import { useState} from 'react'

import '../styles/auth.css'

import Login from '../components/Login'
import Register from '../components/Register'

export default function Auth() {
    const [haveAcc, setHaveAcc] = useState<boolean>(true);

    return(
        <>
            <div className="auth-page">
                <div className="auth-img-container">
                </div>
                <div className="auth-component-container">
                    {haveAcc ? 
                                <Login setHaveAcc={setHaveAcc} /> 
                                : <Register setHaveAcc={setHaveAcc}/>}
                </div>
            </div>
        </>
    );
};