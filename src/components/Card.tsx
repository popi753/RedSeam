import { Link } from "react-router-dom";

import { type product } from '../model/productsFetch'

import '../styles/card.css'

export default function Card({ props }: { props: product }) {

    return (
        <>
            <Link to={`/products/${props.id}`} className="card-container"  >
                <div className="product-img card-img" style={{ backgroundImage: `url(${props.cover_image})` }}></div>

                <div className="card-container_description">
                    <span title={props.name} >{props.name}</span>
                    <span>{`$ ${props.price}`}</span>
                </div>
            </Link>

        </>

    )

}