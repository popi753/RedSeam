import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import { onFetchProducts, type product, type meta } from '../model/productsFetch'

import '../styles/products.css'

import arrow_left from "../assets/arrow-left.svg"
import arrow_right from "../assets/arrow-right.svg"

import Filter from '../components/Filter'
import Sorter from '../components/Sorter'
import Card from '../components/Card'


export default function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<product[]>([]);
    const [meta, setMeta] = useState<meta>();

    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [sort, setSort] = useState<string>("");

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<string>(searchParams.get("page") || "");

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        onFetchProducts({ page, from, to, sort }).then((res) => {
            if (res instanceof Error) {
                console.error(res.message);
                setError(true);
            } else {
                if (res.meta.last_page < Number(page)) {
                    setPage(String(res.meta.last_page));
                    navigate(`?page=${res.meta.last_page}`, { replace: true });
                }
                setProducts(res.products);
                setMeta(res.meta);
            }
        }).catch((err) => { console.error(err.message); setError(true) });
    }, [page, sort, from, to]);


    return (
        <>
            <div className="products-container">
                <header className="products-header">
                    <p className="products-title">Products</p>
                    <div className="products-sort-container">
                        <div className="result-found_container">
                            {meta ? <p className="results-found">
                                Showing {meta?.from}-{meta?.to} of {meta?.total} results
                            </p> : null}

                        </div>
                        <div className="line"></div>

                        <Filter setFrom={setFrom} setTo={setTo} />
                        <Sorter sort={sort} setSort={setSort} />

                    </div>
                </header>
                <div className="products-body">
                    {error ? "something went wrong" :
                        <>
                            <div className="products-body_list">
                                {meta?.total ? products.map((product) => (
                                    <Card
                                        key={product.id}
                                        props={product}>
                                    </Card>
                                )) : "No products found"
                                }
                            </div>

                            <div className="products-body_pagination">
                                <div className="pagination-container">
                                    {meta?.total ? <>
                                        <Link to={"?page=" + (page == "1" ? 1 : Number(page) - 1)} onClick={() => { setPage(String(Number(page) - 1)) }} className="icon-container">
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
                                        <Link to={"?page=" + (Number(page) == meta?.last_page ? page : Number(page) + 1)} onClick={() => { setPage(String(Number(page) + 1)) }} className="icon-container">

                                            <img className="arrow-right" src={arrow_right} alt="arrow_right" />
                                        </Link>
                                    </>
                                        : null
                                    }
                                </div>
                            </div>
                        </>}
                </div>
            </div>

        </>
    )
}