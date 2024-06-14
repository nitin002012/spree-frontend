'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = ({ product, handleClick }) => {
    const { id, name, price,meta_tags } = product;
    const [imageData,setImageData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          // const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
          const response = await axios.get(`http://localhost:3000/api/v2/storefront/products/${id}?include=images`)
          const data = response.data;
          setImageData(data.included[0].attributes.styles[0].url);
          // console.log("image data is", data.included[0].attributes.styles[0].url);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      };
      fetchData();
    }, [id]);



    
  
    return (<>
    <div className="flex my-5">

    <div key={id} className="w-60 h-90 hover:border-4 hover:border-blue-300 m-2 p-1 flex flex-col gap-1 rounded-lg">
        <div className="duration-500 contrast-50 h-48 bg-gradient-to-bl from-black via-orange-900 to-indigo-600 w-48 mx-auto ">
        <img src={`http://localhost:3000${imageData}`} className=" z-0 opacity-2 object-cover mx-auto" width={480}/>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-lg ">{name}</span>
              <div>tags: {meta_tags}</div>

              <p className="text-xs text-gray-700">ID: {id}</p>
            </div>
            <span className="font-bold  text-red-600">${price?.toFixed(2) || "99.99"}</span>
            
          </div>
          <button onClick={() => handleClick(product)} className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2">Add to cart</button>
        </div>
      </div>
    </div>
    
    </>
    );
  }
  
  export default ProductCard;
  