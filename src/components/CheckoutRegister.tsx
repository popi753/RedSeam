import { useEffect, useState, useMemo} from "react";

import { Link } from "react-router-dom";
import Cart_item from "./Cart-item";

import { onFetchCart, onDeleteCart,onUpdateCart,type productObj } from "../model/cart";

import cart from "../assets/cart.svg"

type checkoutRegisterProps = {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLength?: React.Dispatch<React.SetStateAction<number>>;
  type: "checkout" | "cart";

  checkout?: any;
}

const delivery = 5;

export default function CheckoutRegister({open,setOpen,setLength,type, checkout}: checkoutRegisterProps) {

  const token = window.localStorage.getItem("token") || "";


  const [products, setProducts] = useState<productObj[]>([])

  const [error, setError] = useState<string>("")

    useEffect(() => {
    fetchProducts(token,open);
  }, [token, open])


const subTotal : number = useMemo(() => {
  return products.reduce((sum, element) => sum + element.quantity * element.price, 0);
}, [products]);



  function fetchProducts(token:string, open:boolean) {
    (token && open) && onFetchCart({ token }).then(res => {
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setProducts(res)
        setLength && setLength(res.length);
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

  function updateProduct(token:string, id:string,_open:boolean,product: productObj) {
    onUpdateCart({token, id:Number(id), data: product}).then(()=>{
        setProducts(products.map((p) => p.id === product.id && p.size === product.size && p.color === product.color ? {...p, quantity: product.quantity} : p));
    }).catch(()=>alert("Product quantity was not updated"))
  }



    return(
        <>

         {error ? <p>{error}</p>
            : !products.length ? <div className="shoppingCart-empty">
                                          <div className="icon-wrapper-huge">
                                            <img className="huge-cart" src={cart} alt="cart" />
                                          </div>
              <p className="ops">Ooops!</p>    
              <p>You've got nothing in your cart just yet...</p>       
        {type === "cart" ? 
                            <button className="orange-btn small-btn emptyCart-btn" onClick={()=>setOpen && setOpen(false)}>Start shopping</button>
        : type ==="checkout" ? 
                            <Link to={"/"} onClick={()=>setOpen && setOpen(false)}><button className="orange-btn small-btn emptyCart-btn">Start shopping</button></Link>
                             : null}
              
                                </div> :

            <div className="shoppingCart-form">

                  <div className="shoppingCart-list">
                    {products.map((item: any) => {
                      return <Cart_item item={item} key={item.id+item.size+item.color} deleteProduct={deleteProduct} updateProduct={updateProduct} open={open}/>
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
                 
                  {type === "cart" ? 
                             <Link to="/checkout" onClick={()=>setOpen && setOpen(false)}><button className="orange-btn big-btn">Go to checkout</button></Link>
                   : type ==="checkout" ? 
                            <button className="orange-btn big-btn" onClick={()=>checkout()}>Pay</button>
                             : null}

                </div>

              </div>
}
        </>
    )

}