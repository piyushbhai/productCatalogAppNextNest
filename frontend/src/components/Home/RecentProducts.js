"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Hooks/useAuth"; 

const RecentProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState(""); 
  const { isAuthenticated } = useAuth(); 
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []); 

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token")
      setLoading(true);
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/products/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      let res = await axios.request(config)
      if(res?.data.statusCode==200){
        fetchProducts();
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error.response.data.message)
      toast.error(error?.response?.data?.error+" : "+error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    
  }
  const fetchProducts = async () => {
    try {
      setLoading(true);
            let url = `${BASE_URL}/products/filter?`;
            
            let hasFilters = false;

            if (name) {
              url += `name=${name}&`;
              hasFilters = true;
            }
            if (minPrice) {
              url += `minPrice=${minPrice}&`;
              hasFilters = true;
            }
            if (maxPrice) {
              url += `maxPrice=${maxPrice}&`;
              hasFilters = true;
            }
            if (sort) {
              url += `sort=${sort}&`;
              hasFilters = true;
            }

        url = hasFilters ? url.slice(0, -1) : `${BASE_URL}/products/`;


      const result = await axios.get(url);
      setProducts(result.data);      
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
    
  };

  const randomImages = [
    "https://picsum.photos/500/500?random=1",
    "https://picsum.photos/500/500?random=2",
    "https://picsum.photos/500/500?random=3",
    "https://picsum.photos/500/500?random=4",
    "https://picsum.photos/500/500?random=5",
    "https://picsum.photos/500/500?random=6",
    "https://picsum.photos/500/500?random=7",
    "https://picsum.photos/500/500?random=8",
    "https://picsum.photos/500/500?random=9",
    "https://picsum.photos/500/500?random=10",
  ];

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  return (
    <>
      <section className="w-full sm:mt-10 md:mt-10 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-manrope font-bold text-4xl text-light mb-8 max-xl:text-center">
              Product List
            </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-5 items-center">
            <input
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-2 w-full sm:w-auto"
            />
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border rounded-lg p-2 w-full sm:w-auto"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border rounded-lg p-2 w-full sm:w-auto"
            />
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg p-2 w-full sm:w-auto"
            >
              <option value="">Sort by</option>
              <option value="asc">Price (Low to High)</option>
              <option value="desc">Price (High to Low)</option>
            </select>
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              {loading ? "Loading..." : "Apply Filters"}
            </button>
          </div>

            {loading && (
              <div className="flex justify-center items-center py-5">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {products.length === 0 ? (
                  <h2 className="text-xs border px-5 leading-5 text-light relative group">
                    No Products are available
                  </h2>
                ) : (
                  products.map((product, index) => (
                    <div
                      key={index}
                      className="relative bg-cover group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer"
                    >
                      <img
                        className="rounded-2xl object-cover"
                        src={getRandomImage()}
                        alt={product.name}
                      />
                       {isAuthenticated && (
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="absolute top-2 right-2 z-20 p-1 bg-white rounded-full shadow hover:bg-gray-200 transition-colors"
                        title="Delete Product"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                      )}
                      <div className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-semibold text-base leading-7 text-black">
                            {product.name}
                          </h6>
                          <h6 className="font-semibold text-base leading-7 text-indigo-600 text-right">
                            ${product.price}
                          </h6>
                        </div>
                        <p
                          className="text-xs leading-5 text-gray-500 relative group"
                          title={product.description}
                        >
                          {product.description.split(" ").slice(0, 5).join(" ")}...
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default RecentProducts;
