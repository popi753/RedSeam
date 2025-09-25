import { Link } from "react-router-dom";

import { type meta } from '../model/productsFetch'

import '../styles/pagination.css'

import arrow_left from "../assets/arrow-left.svg"
import arrow_right from "../assets/arrow-right.svg"

type paginationProps = {
    meta: meta | undefined,
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Pagination({ meta, page, setPage }: paginationProps ) {
    return(<>
    
            <div className="products-body_pagination">
                                <div className="pagination-container">
                                    {meta?.total ? <>
                                        <Link to={"?page=" + (page == "1" ? 1 : Number(page) - 1)} onClick={() => { setPage(String(Number(page) - 1)) }} className="icon-wrapper-medium">
                                            <img className="arrow-left" src={arrow_left} alt="arrow_left" />
                                        </Link>

                                        {(meta?.last_page) &&
                                            new Array(Number(meta.last_page)).fill(0).map((_, index) => {
                                                return (
                                                    <Link key={index} to={`?page=${index + 1}`} onClick={() => { setPage(String(index + 1)) }}>
                                                        <button className={"pagination-btn " + (page == String(index + 1) ? "active-page" : "")} >{index + 1}</button>
                                                    </Link>
                                                )
                                            })}
                                        {/* <button className="pagination-btn">...</button> */}
                                        <Link to={"?page=" + (Number(page) == meta?.last_page ? page : Number(page) + 1)} onClick={() => { setPage(String(Number(page) + 1)) }} className="icon-wrapper-big">

                                            <img className="arrow-right" src={arrow_right} alt="arrow_right" />
                                        </Link>
                                    </>
                                        : null
                                    }
                                </div>
                            </div>
    </>)
}