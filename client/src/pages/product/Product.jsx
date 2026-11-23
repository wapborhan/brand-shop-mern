import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://server-sr-brand-shop.vercel.app/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto my-10 lg:px-0 px-5">
      <div className="liner-container mt-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
        <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
          Products
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-infinity w-20 text-primary"></span>
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
          {products.map((product) => {
            return <ProductCard product={product} key={product?._id} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-16 py-12 px-4 border border-dashed rounded-lg">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">
            No product found
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            No products are currently available. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Product;
