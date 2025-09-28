import { useEffect, useRef, useCallback } from "react"

import Input from "./Input"

import filter from "./../assets/filter.svg"

import '../styles/filter.css'

type filterProps = {
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    setTo: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filter({ setFrom, setTo }: filterProps) {

    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const details = detailsRef.current;
            if (details && details.open && !details.contains(event.target as Node)) {
                details.open = false;
            };
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setFrom((e.target as HTMLFormElement).from.value);
        setTo((e.target as HTMLFormElement).to.value);
    }, []);

    return (
        <>
            <details ref={detailsRef}>
                <summary className="filter-summary">
                    <div className="icon-wrapper-big">
                        <img className="filter" src={filter} alt="filter" />
                    </div>
                    <p className="filter-label">Filter</p>
                </summary>
                <div className="filter-dropdown dropdown-menu">
                    <div className="filter-dropdown-container dropdown-container">
                        <p>Select Price</p>
                        <form className="filter-form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="filter-input-container">

                                <Input type="number" placeholder=" " error="" labelPlaceholder="From" id="from" required={false}></Input>

                                <Input type="number" placeholder=" " error="" labelPlaceholder="To" id="to" required={false}></Input>
                            </div>
                            <button className='orange-btn small-btn apply-btn' type="submit">Apply</button>
                        </form>
                    </div>
                </div>
            </details>
        </>

    )

}