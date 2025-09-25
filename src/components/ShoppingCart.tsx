import { useEffect, useState, useMemo } from "react";
import {Link } from "react-router-dom";

import { onFetchCart, onDeleteCart,onUpdateCart, type productObj } from "../model/cart";

import Cart_item from "./Cart-item";

import x from "../assets/x.svg"
import cart from "../assets/cart.svg"


import "../styles/shoppingCart.css"


type shoppingCartProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const delivery = 5;

export default function ShoppingCart({
  open, setOpen }: shoppingCartProps) {


  const token = window.localStorage.getItem("token") || "";

  const [products, setProducts] = useState<productObj[]>([])
  const [error, setError] = useState<string>("")

 const subTotal : number = useMemo(() => {
  return products.reduce((sum, element) => sum + element.quantity * element.price, 0);
}, [products]);

  useEffect(() => {
    fetchProducts(token,open);
  }, [token, open])

  function fetchProducts(token:string, open:boolean) {
    (token && open) && onFetchCart({ token }).then(res => {
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setProducts(res)
      }
    }).catch((error) => {
      console.error(error);
      setError(error);
    });
  }

  function deleteProduct(token:string, id:string,open:boolean,product: productObj) {
    onDeleteCart({token, id:Number(id), data: product}).then(()=>{
      fetchProducts(token, open);
    }).catch(()=>alert("Product was not deleted"))
  }

  function updateProduct(token:string, id:string,open:boolean,product: productObj) {
    onUpdateCart({token, id:Number(id), data: product}).then(()=>{
      fetchProducts(token, open);
    }).catch(()=>alert("Product quantity was not updated"))
  }

  return (

    <>
      <div className="overlay" style={{ display: open ? "block" : "none" }} onClick={() => setOpen(false)} />
      <dialog
        open={open}
        onClick={() => {
          setOpen(false);

        }}
      >
        <div
          className="shoppingCart-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >

          <div className="shoppingCart-title">
            <p>Shopping cart ({products?.length || 0}) </p>
            <div className="icon-wrapper-large" onClick={()=>setOpen(false)}>
              <img className="shoppingCart-close" src={x} alt="X" />
            </div>
          </div>

          {error ? <p>{error}</p>
            : !products.length ? <div className="shoppingCart-empty">
                                          <div className="icon-wrapper-huge">
                                            <img className="huge-cart" src={cart} alt="cart" />
                                          </div>
              <p className="ops">Ooops!</p>    
              <p>You've got nothing in your cart just yet...</p>       

              <button className="orange-btn small-btn emptyCart-btn" onClick={()=>setOpen(false)}>Start shopping</button>
                                </div> :


              <div className="shoppingCart-form">


                  <div className="shoppingCart-list">
                    {products.map((item: any) => {
                      return <Cart_item item={item} key={item.id+item.size} deleteProduct={deleteProduct} updateProduct={updateProduct} open={open}/>
                    })
                    }
                  </div>


                <div className="shoppingCart-checkout">

                  <div className="shoppingCart-details">
                    <div><span>Items subtotal</span> <span>{`$ ${subTotal}`}</span></div>

                    <div><span>Delivery</span> <span>{`$ ${delivery}`}</span></div>

                    <div className="shoppingCart-details-total">
                      <span>Total</span> <span>{`$ ${subTotal + delivery}`}</span>
                    </div>

                  </div>
                  <Link to="/checkout" onClick={()=>setOpen(false)}><button className="orange-btn big-btn">Go to checkout</button></Link>
                  
                </div>

              </div>

          }



        </div>
      </dialog>





    </>
  );
}


