import React, { useEffect, useState } from "react";
import BrandProductCard from "./BrandProductCard";
import { useParams } from "react-router-dom";
import AdvSlider from "./AdvSlider";

const BrandProducts = () => {
  const { name } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://server-sr-brand-shop.vercel.app/brands/${name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setBrandProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching brand products:", err);
        setBrandProducts([]);
        setLoading(false);
      });
  }, [name]);

  return (
    <>
      <div className="lg:max-w-screen-xl lg:mx-auto">
        <AdvSlider />
        <div className="lg:px-0 px-5">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-infinity w-20 text-primary"></span>
            </div>
          ) : brandProducts && brandProducts.length > 0 ? (
            <div className="grid grid-cols-12 gap-5 my-10">
              {brandProducts.map((brandprdt) => {
                return (
                  <BrandProductCard
                    brandprdt={brandprdt}
                    key={brandprdt?._id || brandprdt?.__id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center my-16 py-12 px-4 border border-dashed rounded-lg">
              <h2 className="text-3xl font-bold text-gray-700 mb-2">
                No product found
              </h2>
              <p className="text-gray-500 text-center max-w-md">
                There are currently no products available for this brand.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandProducts;
