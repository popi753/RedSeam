import { useState, useEffect, createContext} from 'react'

import { Routes, Route } from "react-router-dom"
import './styles/App.css'

import Products from "./routes/Products"
import Checkout from "./routes/Checkout"
import Auth from "./routes/Auth"
import Product from "./routes/Product"
import Missing from "./routes/Missing"
import Layout from "./components/Layout"
import ShoppingCart from "./components/ShoppingCart";


function App() {

  const token = window.localStorage.getItem("token");


    useEffect(() => {
        token && setLoggedIn(true);
    }, [token]);

  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [open,setOpen] = useState<boolean>(false);

  return(
    <>
        <UserContext.Provider value={[loggedIn, setLoggedIn]}>
            
                <Routes>
                    <Route path="/" element={<Layout 
                     setOpen={setOpen}/>}>
                        <Route index  element={<Products />} />
                        <Route path="/products/:id" element={<Product/>} />
                        {loggedIn ? 
                                   <> 
                                   <Route path="/checkout" element={<Checkout />} />
                                   </>
                                   :
                                   <Route path="/auth" element={<Auth />} />
                        }
                        
                        <Route path="*" element={<Missing />} />
                  </Route>
            
                </Routes>

                        {loggedIn && <ShoppingCart 
                         open={open} setOpen={setOpen} />}

        </UserContext.Provider>
   
    </>
  );
};


export type contextType = null | [
  loggedIn: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
];

export const UserContext = createContext<contextType>(null);

export default App;
