import { useState,useCallback, useRef} from 'react'

import { useNavigate } from 'react-router-dom'

import CheckoutRegister from '../components/CheckoutRegister'
import Input from '../components/Input'

import { onCheckout } from '../model/cart'

import envelope from "../assets/envelope.svg"
import x from "../assets/x.svg"
import check from "../assets/check.svg"



import '../styles/checkout.css'

type error = {
    name : string;
    surname : string;
    email : string;
    address: string;
    zip_code : string;
}

export default function Checkout() {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const navigate = useNavigate();

    const token = window.localStorage.getItem("token") || "";
    const localStorageEmail = window.localStorage.getItem("email") || "";

    const [email, setEmail] = useState<string>(localStorageEmail);

    const [error, setError] = useState<error>({ name: "", surname: "", email: "", address: "", zip_code: "" });
    
     const checkout = useCallback(() => {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const surname = (document.getElementById("surname") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const address = (document.getElementById("address") as HTMLInputElement).value;
        const zip_code = (document.getElementById("zip_code") as HTMLInputElement).value;

        onCheckout(
            {token,
                data: {name, surname, email, address, zip_code}
            }
        ).then((res) => {
                    if (res instanceof Error) {
                            console.error("Product fetch failed");
                        } else {
                            // setShowModal(true);
                            dialogRef.current?.showModal();

                        };
                    }).catch((error) => {
                        console.error("Checkout failed");
                        setError(prev => ({ ...prev, ...error }));
                        });
        },[]);
    const close = useCallback(()=>{
        dialogRef.current?.close();
        navigate("/");
            },[])



    return(
        <>
            <div className="checkout-page">
                <p className='checkout-page-title' >Checkout </p>
                <div className="checkout-container">
                    <div className="checkout-form">
                        <div className="checkout-form-container">
                            <p className='checkout-form-title' >Checkout </p>
                            <div className="checkout-form-wrapper">
                                <Input minLength={1}  type="text" id='name' placeholder=' ' labelPlaceholder="Name" required={true} error={error.name} checkout={true}/>
                                <Input minLength={1}  type="text" id='surname' placeholder=' ' labelPlaceholder="Surname" required={true} error={error.surname} checkout={true}/>
                            </div>
                            <div className="checkout-form-wrapper">
                                <Input minLength={1}  type="email" id='email' placeholder=' ' labelPlaceholder="Email" required={true} error={error.email}  checkoutEmail={true}
                                       icon={envelope} iconClassName='envelope'
                                       value={email} setValue={setEmail}
                                      />
                            </div>
                            <div className="checkout-form-wrapper">
                                <Input minLength={1}  type="text" id='address' placeholder=' ' labelPlaceholder="Address" required={true} error={error.address} checkout={true}/>
                                <Input minLength={1}  type="text" id='zip_code' placeholder=' ' labelPlaceholder="Zip code" required={true} error={error.zip_code} checkout={true}/>
                            </div>
                        </div>
                    </div>

                    <CheckoutRegister open={true} type='checkout' 
                    checkout={checkout} 
                    />

                </div>

            </div>

                <dialog ref={dialogRef} className="checkout-success-modal" onClick={() => dialogRef.current?.close()}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="icon-wrapper-huge">
                            <img className='checkout-close' src={x} alt="X" onClick={()=>close()}/>
                        </div>
                            <div className="successful-checkout-container">
                                <div className="icon-wrapper-check">
                                    <img className='check' src={check} alt="Check" />
                                </div>
                                    <div className="successful-checkout-container-text">
                                        <p>Congrats!</p>
                                        <span>Your order is placed successfully.</span>
                                    </div>
                                 <button className='orange-btn small-btn' onClick={() => { close()}}>Continue shopping</button>
                            </div> 
                        
                    </div>
                </dialog>

        </>
    )
}