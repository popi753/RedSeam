import {useContext} from "react";
import {Outlet, Link} from "react-router-dom"

import { UserContext, type contextType} from "../App";


import "../styles/layout.css"

import logo from "./../assets/logo.svg"
import avatar_svg from "./../assets/avatar.svg"
import cart from "./../assets/cart.svg"
import avatarPhoto from "./../assets/avatarPhoto.svg"

type layoutProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Layout({
    setOpen}: layoutProps) {

    
    const avatar = localStorage.getItem("avatar");

    
    const [loggedIn, _setLoggedIn] = useContext<contextType>(UserContext) || [null, () => {}];


    return (
        <>
        <header className="header">
            
                <nav className="header_nav">
                    <Link to={"/"}>
                        <div className="header_logo-container">
                            <div className="icon-wrapper-big">
                                <img src={logo} className="logo" alt="logo" />
                            </div>
                            <span className="header_logo-text">
                                RedSeam Clothing
                            </span>
                        </div>
                    </Link>

            
                {loggedIn ?
                    <div className="header_log-container">
                        <div className="icon-wrapper-big" onClick={()=>{
                            setOpen(true);
                            }}>
                            <img src={cart} className="cart" alt="cart" />
                        </div>
                        <div className="avatar-photo-wrapper">
                            {(loggedIn && avatar) ? <img src={avatar} className="avatar-photo" alt="avatar-photo" /> 
                                            : <img src={avatarPhoto} className="avatar-photo" alt="avatar-photo" /> }
                        </div>
                    </div>
                : 
                    <Link to={"/auth"}>
                        <div className="header_auth-container">
                            <div className="icon-wrapper-medium">
                                <img src={avatar_svg} className="avatar" alt="avatar" />
                            </div>
                            Log in
                        </div>
                    </Link> 
                }


                    </nav>
        </header>
           <main className="main-container">
                           <Outlet/>
           </main>

               

        </>
    )
}

