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


type user = {
  email : string,
  avatar: string | null,
}

function App() {

  const token = window.localStorage.getItem("token");


  useEffect(() => {
      token && setUser({ email: " ", avatar: null });
    }, [token]);

  
  const [user, setUser] = useState<user>({ email: "", avatar: null });
  const [open,setOpen] = useState<boolean>(false);

  return(
    <>
        <UserContext.Provider value={[user, setUser]}>
            
                <Routes>
                    <Route path="/" element={<Layout 
                     setOpen={setOpen}/>}>
                        <Route index  element={<Products />} />
                        <Route path="/products/:id" element={<Product setOpen={setOpen} />} />
                        {user?.email ? 
                                   <> 
                                   <Route path="/checkout" element={<Checkout />} />
                                   </>
                                   :
                                   <Route path="/auth" element={<Auth />} />
                        }
                        
                        <Route path="*" element={<Missing />} />
                  </Route>
            
                </Routes>

                        {user?.email && <ShoppingCart 
                         open={open} setOpen={setOpen} />}

        </UserContext.Provider>
   
    </>
  );
};


export type contextType = null | [
  user: user,
  setUser: React.Dispatch<React.SetStateAction<user>>,
];

export const UserContext = createContext<contextType>(null);

export default App;
