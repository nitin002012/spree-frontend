'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "./productCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/products");
        const data = response.data;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  console.log("products are ", products);

  const handleClick = (item) => {
    setAddToCart([...addToCart, item]); 
    alert(`Added to cart successfully`);
  };

  console.log(addToCart);

  return (
    <>
<h1 className="text-4xl p-5 font-mono text-center underline ">Products</h1>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
};

export default ProductPage;
