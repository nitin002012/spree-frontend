'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { redirect, useRouter } from "next/navigation";


const ProductPage = () => {
  const data = [{name:"t-shirts", route1 :"/t-shirts"},
              {name:"formal-wear", route1 :"/formal-wear"},
              {name:'trousers', route1 :"/trousers"}]

  const router = useRouter();
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

  const extractDistinctMetaKeywords = (data) => {
    const metaKeywordsSet = new Set();
    data.forEach(item => {
      if (item.meta_keywords) {
        metaKeywordsSet.add(item.meta_keywords);
      }
    });
    return Array.from(metaKeywordsSet);
  };
  
  const distinctMetaKeywords = extractDistinctMetaKeywords(products);
  
  console.log("meta keywords are", distinctMetaKeywords);

  const categorizedProducts = {};

  distinctMetaKeywords.forEach(keyword => {
    categorizedProducts[keyword] = products.filter(product => product.meta_keywords === keyword);
  });

  const handleClick = (item) => {
    setAddToCart([...addToCart, item]);
    alert(`Added to cart successfully`);
  };

  return (
    <>
      <h1 className="text-4xl p-5 font-mono text-center underline">Products</h1>

      {Object.entries(categorizedProducts).map(([keyword, products]) => (
        <div key={keyword}>
          <p className="text-3xl font-bold w-8/12 mx-auto">{keyword.toLocaleUpperCase()}</p>
          <div className="flex flex-wrap justify-center items-center gap-5 my-7">
            {products.map(item => (
              <div className=" ">
                <ProductCard key={item.id} handleClick={handleClick} product={item} />

                <hr/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductPage;
