import { useEffect, useState } from "react"

import { type productObj } from "../model/cart"

import minus from "../assets/minus.svg"
import plus from "../assets/plus.svg"

import "../styles/cart-item.css"

type cartItemProps = {
    item: productObj,
    deleteProduct: (token: string, id: string, open: boolean, product: productObj) => void,
    updateProduct: (token: string, id: string, open: boolean, product: productObj) => void,
    open: boolean,
}

export default function Cart_item({ item, deleteProduct, updateProduct, open }: cartItemProps) {

    const token = window.localStorage.getItem("token") || "";

    const [count, setCount] = useState(item.quantity || 0);

    useEffect(() => {
        setCount(item.quantity)
    }, [item.quantity]);

    function updateProductQuantity(newQuantity: number) {
        setCount(newQuantity);
        updateProduct(token, item.id.toString(), open, { ...item, quantity: newQuantity });
    }



    return (
        <>
            <div className="shoppingCart-item">
                <div className="product-img shoppingCart-item-img" style={{ backgroundImage: `url(${item.cover_image})` }} />

                <div className="shoppingCart-item-details">

                    <div className="shoppingCart-item-title">
                        <span>{item.name}</span>
                        <span>{`$ ${item.price}`}</span>
                    </div>

                    <div className="shoppingCart-item-color">{item.color}</div>
                    <div className="shoppingCart-item-size">{item.size}</div>

                    <div className="shoppingCart-item-quantity">
                        <div className="shoppingCart-item-counter">
                            <button className="icon-wrapper-small" onClick={() => updateProductQuantity(count - 1)}>
                                <img className="minus" src={minus} alt="-" />
                            </button>
                            <span>{count}</span>
                            <button className="icon-wrapper-small" onClick={() => updateProductQuantity(count + 1)}>

                                <img className="plus" src={plus} alt="+" />
                            </button>
                        </div>

                        <span onClick={() => { deleteProduct(token, item.id.toString(), open, item) }} className="shoppingCart-item-remove">remove</span>
                    </div>

                </div>
            </div>
        </>
    )
}