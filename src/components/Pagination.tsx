import { Link } from "react-router-dom";

import arrow_left from "../assets/arrow-left.svg"
import arrow_right from "../assets/arrow-right.svg"

import '../styles/pagination.css'

type paginationProps = {
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>;
    pageArr: (string | number)[];
}

export default function Pagination({ page, setPage, pageArr }: paginationProps) {

    return (
        <>
            <div className="products-body_pagination">
                <div className="pagination-container">
                    <Link to={"?page=" + (page == "1" ? 1 : Number(page) - 1)} onClick={() => { setPage(page == "1" ? "1" : (Number(page) - 1).toString()) }} className="icon-wrapper-medium">
                        <img className="arrow-left" src={arrow_left} alt="arrow_left" />
                    </Link>

                    {pageArr.map((pageNum, index) => {
                        if (pageNum === '...') {
                            return <button key={index} className="pagination-btn">...</button>;
                        }
                        return (
                            <Link key={index} to={`?page=${pageNum}`} onClick={() => setPage(String(pageNum))}>
                                <button className={"pagination-btn " + (page == String(pageNum) ? "active-page" : "")}>
                                    {pageNum}
                                </button>
                            </Link>
                        );
                    })}

                    <Link to={"?page=" + (Number(page) == pageArr[pageArr.length - 1] ? page : Number(page) + 1)} onClick={() => { setPage(Number(page) == pageArr[pageArr.length - 1] ? page.toString() : (Number(page) + 1).toString()) }} className="icon-wrapper-medium">
                        <img className="arrow-right" src={arrow_right} alt="arrow_right" />
                    </Link>
                </div>
            </div>
        </>
    )



}