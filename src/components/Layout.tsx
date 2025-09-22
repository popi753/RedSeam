import {useContext} from "react";
import {Outlet, Link} from "react-router-dom"

import { UserContext, type contextType} from "../App";


import "../styles/layout.css"

import logo from "./../assets/logo.svg"
import avatar from "./../assets/avatar.svg"
import cart from "./../assets/cart.svg"
import avatar_photo from "./../assets/avatar-photo.svg"


export default function Layout() {

    
    const [user, _setUser] = useContext<contextType>(UserContext) || [];

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

            
                {user?.email ?
                    <div className="header_log-container">
                        <div className="icon-wrapper-big">
                            <img src={cart} className="cart" alt="cart" />
                        </div>
                        <div className="avatar-photo-wrapper">
                            {user?.avatar ? <img src={user.avatar} className="avatar-photo" alt="avatar-photo" /> 
                                            : <img src={avatar_photo} className="avatar-photo" alt="avatar-photo" /> }
                        </div>
                    </div>
                : 
                    <Link to={"/auth"}>
                        <div className="header_auth-container">
                            <div className="icon-wrapper-small">
                                <img src={avatar} className="avatar" alt="avatar" />
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

