import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";

import { onFetchProducts, type product, type meta } from '../model/productsFetch'

import '../styles/products.css'

import x from "../assets/x.svg"

import Filter from '../components/Filter'
import Sorter from '../components/Sorter'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

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
    }, [page, sort, from, to, navigate]);


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

                            {(from || to) && <div className="filter-applied">
                                    <p>Price: <span>{from || 0} - {to}</span></p>
                                    <div className="icon-wrapper-tiny" onClick={() => { setFrom(""); setTo("") }}>
                                        <img src={x} alt="X" className='x-icon'/>
                                    </div>
                                    
                                    </div>}

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

                            <Pagination meta={meta} page={page || "1"} setPage={setPage} />

                        </>}
                </div>
            </div>

        </>
    )
}