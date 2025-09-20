import {Link} from "react-router-dom";

import '../styles/card.css'

import { type product } from '../model/productsFetch'

export default function Card({props}: {props : product}) {
    return(
        <>
            <Link to={`/product/${props.id}`} className="card-container">
                <img src={props.cover_image} alt={props.name} />
                <div className="card-container_description">
                    <span>{props.name}</span>
                    <span>{`$ ${props.price}`}</span>
                </div>
            </Link>
        </>
    )    
}