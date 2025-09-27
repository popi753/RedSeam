import { useState,useCallback} from 'react'

import { useNavigate } from 'react-router-dom'

import CheckoutRegister from '../components/CheckoutRegister'
import Input from '../components/Input'

import { onCheckout } from '../model/cart'

import envelope from "../assets/envelope.svg"

import '../styles/checkout.css'

type error = {
    name : string;
    surname : string;
    email : string;
    address: string;
    zip_code : string;
}

export default function Checkout() {

    const navigate = useNavigate();

    const token = window.localStorage.getItem("token") || "";

    const [error, setError] = useState<error>({ name: "", surname: "", email: "", address: "", zip_code: "" });
    
    const [showModal, setShowModal] = useState(false);

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
                            setShowModal(true);

                        };
                    }).catch((error) => {
                        console.error("Checkout failed");
                        setError(prev => ({ ...prev, ...error }));
                        });
        },[]);


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

            {showModal && (
                <dialog open className="checkout-success-modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Congrats!</h2>
                    <p>Your order is placed successfully.</p>
                    <button className='orange-btn small-btn' onClick={() => { setShowModal(false); navigate("/"); }}>Continue shopping</button>
                    </div>
                </dialog>
            )}

        </>
    )
}