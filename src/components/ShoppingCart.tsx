import {useState} from "react";


import CheckoutRegister from "./CheckoutRegister";

import x from "../assets/x.svg"


import "../styles/shoppingCart.css"


type shoppingCartProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function ShoppingCart({open, setOpen }: shoppingCartProps) {

  const [length,setLength] = useState<number>(0);


  return (

    <>
      <div className="overlay" style={{ display: open ? "block" : "none" }} onClick={() => setOpen(false)} />
      <dialog
        className="ShoppingCart-dialog"
        open={open}
        onClick={() => {
          setOpen(false);

        }}
      >
        <div className="shoppingCart-container"
              onClick={(e) => { e.stopPropagation(); }}>

          <div className="shoppingCart-title">
            <p>Shopping cart ({length || 0}) </p>
            <div className="icon-wrapper-large" onClick={()=>setOpen(false)}>
              <img className="shoppingCart-close" src={x} alt="X" />
            </div>
          </div>


          <CheckoutRegister setOpen={setOpen} open={open} setLength={setLength} type="cart"/>
              



        </div>
      </dialog>





    </>
  );
}



