import { Routes, Route } from "react-router-dom"
import './styles/App.css'

import Products from "./routes/Products"
import Checkout from "./routes/Checkout"
import Auth from "./routes/Auth"
import Product from "./routes/Product"


import Missing from "./routes/Missing"
import Layout from "./components/Layout"


function App() {
  return(
    <>
       

      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/product" element={<Product />} />

              
              <Route path="*" element={<Missing />} />
        </Route>



      </Routes>

   
    </>
  )
}

export default App
