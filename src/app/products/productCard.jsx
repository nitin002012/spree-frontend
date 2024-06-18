'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = ({ product, handleClick }) => {
    const { id, name, price,meta_tags } = product;
    const [imageData,setImageData] = useState([])
    const [variantData, setVariantData] = useState([])
    const [name1,setName1] = useState("")
    useEffect(() => {
      const fetchData = async () => {
        try {
          // const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
          const response = await axios.get(`http://localhost:3000/api/v2/storefront/products/${id}?include=images`)
          const variant1 = await axios.get(`http://localhost:3000/api/v1/products/${id}/show_variants/`)
          const data = response.data;
          const data1 = variant1.data;
          setVariantData(data1)
          console.log('for id ',id,"data is",data1);
          setImageData(data.included[0].attributes.styles[0].url);
          // console.log("image data is", data.included[0].attributes.styles[0].url);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      };
      fetchData();
    }, [id]);

      const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
    
      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      console.log("variant data",variantData);
      const handleItemClick = (sku) => {
        setName1(sku); // Assuming setName1 is a function that updates the state
        toggleDropdown(); // Close the dropdown after an item is clicked (optional)
      };
    



    
  
    return (<>
    {/* <div className="flex my-5"> */}

    {/* <div key={id} className="w-60 h-90 hover:border-2 bg-violet-300 hover:border-black m-2 p-2 flex flex-col gap-1 rounded-lg"> */}
{/* <div className="flex justify-end"> */}
{/* <div className="rounded-lg p-0.5 z-30 translate-y-[100%] bg-blue-500 text-sm  text-white font-bold  ">{meta_tags}</div> */}

{/* </div> */}
        {/* <div className="duration-500 contrast-50 h-48 bg-gradient-to-bl rounded-t-lg from-black via-orange-900 to-indigo-600 w-48 mx-auto "> */}
{/*  */}
        {/* <img src={`http://localhost:3000${imageData}`} className=" z-0 rounded-t-lg object-cover mx-auto" width={480}/> */}
        {/* </div> */}
        {/* <div className="flex flex-col gap-4"> */}
          {/* <div className="flex flex-row justify-between"> */}
            {/* <div className="flex flex-col"> */}
              {/* <span className="text-lg ">{name}</span> */}
              {/* <div className="">{meta_tags}</div> */}
{/*  */}
              {/* <p className="text-xs text-gray-700">ID: {id}</p> */}
            {/* </div> */}
            {/* <span className="font-bold  text-red-600">${price?.toFixed(2) || "99.99"}</span> */}
            {/*  */}
          {/* </div> */}
          {/* <button onClick={() => handleClick(product)} className="hover:bg-sky-700 rounded-b-lg text-gray-50 bg-sky-800 py-2">Add to cart</button> */}
        {/* </div> */}
      {/* </div> */}
    {/* </div> */}
    <div class="w-60 h-88 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl transition-transform transform hover:shadow-lg hover:border-2 hover:border-black hover:scale-105">
  <div class="flex justify-end">
    <div class="rounded-lg p-0.5  bg-blue-500 text-sm text-white font-bold">
      {meta_tags}
    </div>
  </div>

  <div class="h-52 bg-gray-700 rounded-xl mb-6">
    <img src={`http://localhost:3000${imageData}`} class="z-0 rounded-t-lg object-contain mx-auto" width={480} />
  </div>

  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">{name}</span>
        <p class="text-xs text-gray-700">ID: {id}</p>
      </div>
      <span class="font-bold text-red-600">$25.99</span>
    </div>
    <button onClick={handleClick} class="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">
      Add to cart
    </button>
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          {name}
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {variantData.map((item, index) => ( 
              <button
                key={index} 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleItemClick(item.sku)}
              >
                {item.sku}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

    </>
    );
  }
  
  export default ProductCard;
  