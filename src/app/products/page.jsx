'use client'

import axios from "axios";
import { useState } from "react";

const ProductPage = ()=>{
    const [products,setProducts]=useState([]);
    useState(()=>{
        const fetchData = async ()=>{
            const response = await axios.get("http://localhost:3000/api/v1/products")
            const data = response.data
            console.log(data);
            setProducts(data)
        }
        fetchData();
    },[])
    console.log("products are ",products);

    return (
        <>
        <h1 className="pl-4 my-5 text-3xl font-semibold text-red-500 ">Products</h1>
        <div className="flex m-12 justify-centre items-center gap-5">
        {products.map((item)=>(
            <div class="max-w-md mx-auto bg-white rounded-xl overflow-hidden m-4 w-[30%] wrap">
            <img class="object-cover w-full h-48" src="https://via.placeholder.com/300" alt="Product Image"/>
            <div class="p-6">
              <h1 class="text-xl font-bold text-gray-800">{item.name}</h1>
              <p class="mt-2 text-gray-600">{item.description}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-gray-700 font-bold">$99.99</span>
                <button class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
        </div>
        </>
    )
}
export default ProductPage  ;