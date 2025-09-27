import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import '../styles/product.css'

import { UserContext, type contextType} from "../App";


import { onFetchProduct, type productObj } from "../model/productsFetch";
import { onPostCart } from '../model/cart';


import AvailableColor from "../components/AvailableColor";
import AvailableSize from "../components/AvailableSize";

import cart from "../assets/cart.svg"

const colorMap = {
    White: "#ededed",
    Red: "#FF0000",
    Multi: "linear-gradient(90deg, red, yellow, green, blue)",
    Blue: "#0000FF",
    "Navy Blue": "#001F54",
    Grey: "#808080",
    Black: "#000000",
    Purple: "#800080",
    Orange: "#FFA500",
    Beige: "#F5F5DC",
    Pink: "#FFC0CB",
    Green: "#008000",
    Cream: "#FFFDD0",
    Maroon: "#800000",
    Brown: "#A52A2A",
    Peach: "#FFE5B4",
    "Off White": "#F8F8F0",
    Mauve: "#E0B0FF",
    Yellow: "#FFFF00",
    Magenta: "#FF00FF",
    Khaki: "#F0E68C",
    Olive: "#808000",
};
    
  type formError = {
        color: string,
        size: string,
        quantity: string,
    };


export default function Product() {

    const [_user,setUser] = useContext<contextType>(UserContext) || [null, () => {}];

    const { id } = useParams();
    const [product, setProduct] = useState<productObj | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [formError, setFormError] = useState<formError>({ color: "", size: "", quantity: "" });

    const [imgArr, setImgArr] = useState<string[]>([]);
    const [selectedImg, setSelectedImg] = useState<string>("");

    const [colorArr, setColorArr] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<string>("");

    const [sizeArr, setSizeArr] = useState<string[]>([])
    const [selectedSize, setSelectedSize] = useState<string>("");



    useEffect(() => {
        if (!Boolean(Number(id))) {
            setError(true);
            return;
        }


        onFetchProduct({ id: id! }).then((res) => {
            if (res instanceof Error) {
                console.error(res.message);
            } else {
                setSelectedImg(res.cover_image);
                setImgArr(res.images);

                setSelectedColor(res.available_colors[0]);
                setColorArr(res.available_colors);

                setSelectedSize(res.available_sizes[0]);
                setSizeArr(res.available_sizes);

                setProduct(res);

            }
        }).catch((err) => { console.error(err.message); setError(true) });

    }, []);
    useEffect(() => {
        const index = colorArr.indexOf(selectedColor);
        index !== -1 && setSelectedImg(imgArr[index]);

    }, [selectedColor])


        function handleSubmit(e:React.FormEvent) {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    if (Number(product?.quantity) < 1 || !product?.quantity) {
                            alert("Product is out of stock");
                            return;
                        }
                    const data = {
                                    quantity:form.quantity.value,
                                    color:selectedColor,
                                    size:selectedSize}
                    const token = window.localStorage.getItem("token") || "";

                    if(!token){
                        setUser && setUser({email: "", avatar: null});
                        alert("Please log in to add items to your cart.");
                        return;
                    }

                    onPostCart({token, data,id:product?.id}).then(res => {
                        if (res instanceof Error) {
                            console.error("Product fetch failed");
                        } else {
                            alert("Product is added to the cart")
                        };

                    }).catch(error => {
                        console.error("Product fetch failed");
                        setFormError(prev => ({ ...prev, ...error }));
                    });
    }


    return (
        <>
            {error ? <p className="error-message">Product not found, please try again later.</p> :

                <div className="product-page">
                    <p className="product-page_title">Listing/Product</p>
                    <div className="product-container">
                        <div className="product-container_img-list">

                            <div className="product-container_img-list_scroll">
                                {imgArr.map((img, index) => {
                                    return (
                                        <div key={index} className="product-img" style={{ backgroundImage: `url(${img})` }} />
                                    )
                                })}

                            </div>

                        </div>
                        <div className="product-img cover-img" style={{ backgroundImage: `url(${selectedImg})` }}/>

                        <div className="product-details">
                        <form className="add-to-cart-form" onSubmit={(e)=>{handleSubmit(e)}}>
                            <div className="product-details_title">

                                <p >
                                    {product?.name}
                                </p>
                                <p >
                                    ${product?.price}
                                </p>
                            </div>
                            <div className="product-details_form">

                                <div className="product-details_form-wrapper">
                                    <div>
                                        <p>Color: {selectedColor}</p>
                                        <span className="cart-error-msg">{formError.color}</span>
                                    </div>
                                    <div className="product-details_available-colors-list">
                                        {colorArr.length ? colorArr.map((colorName, index) => (
                                            <AvailableColor key={index}
                                                colorName={colorName}
                                                color={colorMap[colorName as keyof typeof colorMap] || ""}
                                                selectedColor={colorName === selectedColor}
                                                setSelectedColor={setSelectedColor} />
                                        )) : "Colors not available"}
                                        
                                    </div>
                                </div>
                                <div className="product-details_form-wrapper">
                                    <div>
                                        <p>Size: {selectedSize}</p>
                                            <span className="cart-error-msg">{formError.size}</span>
                                    </div>

                                    <div className="product-details_available-size-list">
                                        {sizeArr.length ? sizeArr.map((size, index) => (
                                            <AvailableSize key={index}
                                                size={size}
                                                selectedSize={selectedSize === size}
                                                setSelectedSize={setSelectedSize} />
                                        )) : "Sizes not available"}
                                    </div>
                                </div>

                                <div className="product-details_form-wrapper">
                                    <div>
                                        <p>Quantity</p>  <span className="cart-error-msg">{formError.quantity}</span>
                                    </div>
                                    {product?.quantity ?
                                        <select name="quantity" defaultValue={1}>
                                            {new Array(Number(product?.quantity > 10 ? 10 : product.quantity)).fill(0).map((_, index) => {
                                                return (<option key={index} value={index + 1}>{index + 1}</option>)
                                            })
                                            }

                                        </select> : <p className="out-of-stock">Out of Stock</p>}
                                   
                                </div>
                            </div>
                            <button  type="submit" className="orange-btn big-btn add-to-cart-btn" >
                                <img src={cart} alt="cart icon" />
                                Add to cart
                            </button>
                        </form>
                            <div className="horizontal-line"></div>
                            <div className="product-details_description">
                                <div>
                                    <p className="product-details_description-title">Details</p>
                                    <div className="product-details_description-brand-logo" style={{ backgroundImage: `url(${product?.brand.image})` }}></div>
                                </div>

                                <p className="product-details_description-brand">Brand: {product?.brand.name || "Unknown"}</p>
                                <p className="product-details_description-text">{product?.description || "Description not available"}</p>

                            </div>
                        </div>
                    </div>

                </div>


            }

        </>
    )
}

