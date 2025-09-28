import { useCallback } from 'react';

import '../styles/input.css'

type inputProps = {
    type: string;
    id: string;
    placeholder: string;
    labelPlaceholder: string;
    required: boolean;
    minLength?: number;
    error: string;
    icon?: string;
    iconClassName?: string;
    checkout?: boolean;
    checkoutEmail?: boolean;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}


export default function Input({ type, id, placeholder, labelPlaceholder, required, minLength, error, icon, iconClassName, checkout, checkoutEmail, value, setValue }: inputProps) {

    const changeVisibility = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const input = (e.currentTarget as HTMLElement).parentElement?.firstElementChild as HTMLInputElement;
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        };
    }, [])


    return (
        <>
            <div className="input-wrapper">
                <input
                    value={value}
                    onChange={(e) => setValue && setValue(e.target.value)}
                    autoComplete='off'
                    minLength={minLength}
                    type={type}
                    name={id} id={id}
                    placeholder={placeholder}
                    required={required}
                    className={(error && checkoutEmail) ? "input-error checkout-email-input" :
                        checkoutEmail ? "checkout-email-input" :
                            error ? "input-error" : ""}
                />

                <label htmlFor={id} className={checkoutEmail ? "checkout-email-label" : ""}>{labelPlaceholder} {(checkoutEmail || checkout) ? null : required ? <span className="required">*</span> : null} </label>
                {(type === "password" && icon && iconClassName) ? <div className='icon-wrapper-medium' onClick={(e) => changeVisibility(e)}>
                    <img className={iconClassName} src={icon} alt="X" />
                </div> :
                    (checkoutEmail && icon && iconClassName) ? <div className='icon-wrapper-checkout icon-wrapper-medium'>
                        <img className={iconClassName} src={icon} alt="X" />
                    </div> : null}
                {error && <span className="error-msg">{error}</span>}
            </div>

        </>
    )
}




