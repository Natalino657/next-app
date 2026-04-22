"use client";
import React from "react";
// import style from "./ProductCard.module.css";

const AddToCart = () => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => console.log("Click")}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
