import { useEffect, useState } from "react"

import "../styles/cart-item.css"

import {type productObj} from "../model/cart"

import minus from "../assets/minus.svg"
import plus from "../assets/plus.svg"


type cartItemProps = {
    item: productObj,
    deleteProduct: (token:string, id:string, open:boolean,product:productObj) => void,
    updateProduct: (token:string, id:string, open:boolean,product:productObj) => void,
    open: boolean,
}

export default function Cart_item({item,deleteProduct,updateProduct,open}: cartItemProps){

  const token = window.localStorage.getItem("token") || "";

    // console.log(item)
    const [count, setCount] = useState(item.quantity || 0);
    useEffect(() => {
        setCount(item.quantity)
    }, [ item.quantity]);

    useEffect(() => {
        if (count < 0) {
            setCount(0);
        }else{
        updateProduct(token, item.id.toString(), open, {...item, quantity: count});
            }
    }, [count]);




    return(
        <>
                    <div className="shoppingCart-item">
                              <div className="product-img shoppingCart-item-img" style={{ backgroundImage: `url(${item.cover_image})` }}/>
                             
                               <div className="shoppingCart-item-details">

                                    <div className="shoppingCart-item-title">
                                        <span>{item.name}</span>
                                        <span>{`$ ${item.price}`}</span>
                                    </div>

                                     <div className="shoppingCart-item-color">{item.color}</div>
                                     <div className="shoppingCart-item-size">{item.size}</div>

                                    <div className="shoppingCart-item-quantity">
                                        <div className="shoppingCart-item-counter">
                                                <button  className="icon-wrapper-small" onClick={() => setCount(count - 1)}>
                                                        <img className="minus" src={minus} alt="-" />
                                                </button>
                                                <span>{count}</span>
                                                <button className="icon-wrapper-small"  onClick={() => setCount(count + 1)}>
                                                   
                                                        <img className="plus" src={plus} alt="+" />
                                                </button>
                                        </div>
  
                                        <span onClick={()=>{deleteProduct(token, item.id.toString(), open,item) }} className="shoppingCart-item-remove">remove</span>
                                    </div>
                                        
                              </div>
                    </div>
        </>
    )
}