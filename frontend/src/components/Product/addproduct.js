"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login before rendering
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  if (!isAuthenticated || loading) {
    return null; // Prevent rendering while checking authentication
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || isNaN(price) || price <= 0) {
      setMessage("Please enter valid details.");
      return;
    }

    try {
      let data = JSON.stringify({
        name,
        price: parseFloat(price),
        description,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/products`,

        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      let res = await axios.request(config);
      // setMessage("Product added successfully!");
      if(res?.data?.statusCode==201){
        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/");  
        }, 1000);
        
        setName("");
        setPrice("");
        setDescription("");
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2 text-light">Add Product</h2>
      {message && <p className="text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Product Name"
        className="p-2 border w-full mb-2 text-dark"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="p-2 border w-full mb-2 text-dark"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="p-2 border w-full mb-2 text-dark"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="p-2 bg-blue-500 text-white rounded" type="submit">
        Add Product
      </button>
    </form>
  );
}
