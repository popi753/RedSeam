import { useState, useEffect, createContext} from 'react'

import { Routes, Route } from "react-router-dom"
import './styles/App.css'

import Products from "./routes/Products"
import Checkout from "./routes/Checkout"
import Auth from "./routes/Auth"
import Product from "./routes/Product"
import Missing from "./routes/Missing"
import Layout from "./components/Layout"


type user = {
  email : string,
  avatar: string | null,
}

function App() {

  useEffect(() => {
      token && setUser({ email: " ", avatar: null });
    }, []);

  const token = window.localStorage.getItem("token");
  
  const [user, setUser] = useState<user>({ email: "", avatar: null });

  return(
    <>
        <UserContext.Provider value={[user, setUser]}>
            
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index  element={<Products />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/product/:id" element={<Product />} />
            
                        
                        <Route path="*" element={<Missing />} />
                  </Route>
            
                </Routes>
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
