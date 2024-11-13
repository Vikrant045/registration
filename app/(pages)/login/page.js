"use client";
import React, { useState } from "react";
import Input from "@/app/components /comman/Input";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/apis/auth";
import Cookies from "js-cookie";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
                  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true); // Set loading to true
      // Simulating API call
       const payload = {
         email: "john@mail.com",
         password: "changeme",
       };
 console.log("payloads",payload)
       try {
         const response = await loginUser(payload);
         console.log(" erorr of tt",response.data)
         if (response?.status === 200 || response?.status === 201) {
          //  toast.success("User Logged In Successfully");
           console.log("Login Successful:", response);
           Cookies.set("token", response.data.access);
           Cookies.set("refresh-token", response.data.refresh);
           router.push("/dashboard"); 
         } else if (response?.data?.message === "Unauthorized") {
           seterror("Incorrect email or password.");
         }
       } catch (error) {
         console.error("Login Failed:", error);
         // seterror({ api: 'Login failed, please try again' });
       } finally {
         setLoading(false);
       }
 
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-gray-700 rounded-lg shadow-lg">
          
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        {/* Email */}
        <Input
          name="email"
          placeholder="Email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error=""
          className=""
        />
    
        {/* Password */}
        <Input
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error=""
          className=""
        />
        
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12c0-1.38.25-2.69.7-3.9L12 12H4z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-center leading-6 font-medium text-[16px] mt-3">
          Not a member create account?{" "}
          <Link href="/register" className="text-blue-600  underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );

};

export default LoginPage;
