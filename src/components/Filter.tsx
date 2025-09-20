import { useEffect, useRef} from "react"

import '../styles/filter.css'

import filter from "./../assets/filter.svg"

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


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFrom((e.target as HTMLFormElement).from.value);
        setTo((e.target as HTMLFormElement).to.value);
    };

    return (
        <>
            <details ref={detailsRef}>
                <summary className="filter-summary">
                    <div className="filter-wrapper">
                        <img className="filter" src={filter} alt="filter" />
                    </div>
                    <p className="filter-label">Filter</p>
                </summary>
                <div className="filter-dropdown dropdown-menu">
                    <div className="filter-dropdown-container dropdown-container">
                        <p>Select Price</p>
                        <form className="filter-form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="filter-input-container">
                                <div className="filter-input-wrapper">
                                    <input type="number" placeholder=" " id='from' />
                                    <label htmlFor="from">From <span className="required">*</span></label>
                                </div>
                                <div className="filter-input-wrapper">
                                    <input type="number" placeholder=" " id='to' />
                                    <label htmlFor="to">To <span className="required">*</span></label>
                                </div>
                            </div>
                            <button className='filter-apply-btn' type="submit">Apply</button>
                        </form>
                    </div>
                </div>
            </details>
        </>

    )

}