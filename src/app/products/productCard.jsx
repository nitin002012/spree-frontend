'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ product,price1, handleClick }) => {
  const { id, name: initialName, price: initialPrice, meta_tags } = product;
  const [imageData, setImageData] = useState("");
  const [variantData, setVariantData] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null); // State to track selected variant
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v2/storefront/products/${id}?include=images`
        );
        const variantResponse = await axios.get(
          `http://localhost:3000/api/v1/products/${id}/show_variants/`
        );

        const data = response.data;
        const variants = variantResponse.data;
        
        setVariantData(variants);
        setImageData(data.included[0]?.attributes.styles[2]?.url || ''); // Check for existence before accessing properties
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(variantData);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (variant) => {
    setSelectedVariant(variant); // Set selected variant when clicked
    toggleDropdown(); // Close the dropdown after an item is clicked (optional)
  };

  const renderProductName = () => {
    if (selectedVariant) {
      return selectedVariant.sku.substring(0,10)+'..'; // Render selected variant name
    }
    return initialName.substring(0,10) +'..'; // Render initial product name if no variant is selected
  };

  const renderProductPrice = () => {
    if (selectedVariant) {
      return `$${selectedVariant.price}`; // Render selected variant price
    }
    return `$${initialPrice ?price1:"12"}`; // Render initial product price if no variant is selected
  };

  return (
    <div className="w-60 h-88 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl transition-transform transform hover:shadow-lg hover:border-2 hover:border-black hover:scale-105">
      <div className="flex justify-end">
        <div className="rounded-lg p-0.5 bg-blue-500 text-sm text-white font-bold">
          {meta_tags}
        </div>
      </div>

      <div className="h-52 bg-gray-700 rounded-xl mb-6">
        <img
          src={`http://localhost:3000${imageData}`}
          className="z-0 rounded-t-lg object-contain mx-auto"
          width={480}
          alt="Product"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold">{renderProductName()}</span>
            <p className="text-xs text-gray-700">ID: {id}</p>
          </div>
          <span className="font-bold text-red-600">{renderProductPrice()}</span>
        </div>
        <button
          onClick={handleClick}
          className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md"
        >
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
              {selectedVariant ? selectedVariant.sku : initialName}
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
                {variantData.map((variant, index) => (
                  <button
                    key={index}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleItemClick(variant)}
                  >
                    {variant.sku}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
