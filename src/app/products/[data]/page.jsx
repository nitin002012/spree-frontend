'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../productCard";

const ProductItem = ({ params }) => {
    console.log(params);
    const [products, setProducts] = useState([]);
    const [addToCart, setAddToCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/products");
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (item) => {
        setAddToCart([...addToCart, item]);
        alert(`Added to cart successfully`);
    };

    return (
        <>
            <h1 className="p-2">This is a product page of category of {params.data}</h1>
            {products.filter((item) => item.meta_keywords === params.data).map((item) => (
                <div className="flex">
                <ProductCard key={item.id} handleClick={handleClick} product={item} />

                </div>
            ))}
        </>
    );
};
export default ProductItem;
