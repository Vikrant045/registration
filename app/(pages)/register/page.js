"use client";
import React, { useState } from "react";
import Input from "@/app/components /comman/Input";
import { registerUser } from "@/app/apis/auth";
import Link from "next/link";
const Page = () => {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    country: "",
    checkbox1: false,
    checkbox2: false,
  });

  const [errors, setErrors] = useState({});
  const[loading, setLoading]= useState(false)

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    let validationErrors = {};

    if (!formData.firstName) {
      validationErrors.firstName = "First name is required";
      valid = false;
    }
    if (!formData.lastName) {
      validationErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!formData.username) {
      validationErrors.username = "Username is required";
      valid = false;
    }
    if (!emailPattern.test(formData.email)) {
      validationErrors.email = "Please enter a valid email";
      valid = false;
    }
    if (!passwordPattern.test(formData.password)) {
      validationErrors.password =
        "Password must be 8+ characters, including uppercase, lowercase, number, and special character";
      valid = false;
    }
    if (!formData.country) {
      validationErrors.country = "Please select your country";
      valid = false;
    }
    if (!formData.checkbox1) {
      validationErrors.checkbox1 = "You must agree to be contacted";
      valid = false;
    }
    if (!formData.checkbox2) {
      validationErrors.checkbox2 = "You must agree to be contacted";
      valid = false;
    }
    setErrors(validationErrors);
    return valid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
        // register User
        const payload = {
          email: formData?.email,
          lastname: formData?.lastName,
          username: formData?.username,
          password: formData?.password,
          firstname: formData?.firstName,
          country: formData?.country,
        };
        setLoading(true);

        try {
          const response = await registerUser(payload);
          if (response?.status === 200 || response?.status === 201) {
           alert("hello")
          
          }
        } catch (error) {
          console.log("register error", error);
        } finally {
          setLoading(false);
        }
      

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-gray-700 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Register
        </h2>

        {/* First Name and Last Name */}
        <div className="flex flex-col md:flex-row md:gap-4 w-full">
          <div className="w-[50%]">
            <Input
              name="firstName"
              placeholder="First Name"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
          </div>
          <div className="w-[50%]">
            <Input
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
        </div>

        {/* Username */}
        <Input
          name="username"
          placeholder="Username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          className=""
        />

        {/* Email */}
        <Input
          name="email"
          placeholder="Email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
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
          error={errors.password}
          className=""
        />

        {/* Country Selector */}
        <Input
          name="country"
          placeholder="Select your country"
          label="Country"
          type="select"
          options={["USA", "Canada", "India", "UK"]}
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          className=""
        />

        {/* Checkboxes */}
        <div className="">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="checkbox1"
              checked={formData.checkbox1}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <p className="text-gray-300">
              I agree to be contacted for updates.
            </p>
          </label>

          {errors.checkbox1 && (
            <p className="text-red-500 text-xs italic">{errors.checkbox1}</p>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="checkbox2"
              checked={formData.checkbox2}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <p className="text-gray-300">
              Subscribe to our newsletter for the latest updates.
            </p>
          </label>
          {errors.checkbox2 && (
            <p className="text-red-500 text-xs italic">{errors.checkbox2}</p>
          )}
        </div>

                          

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          disabled={loading}
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
            "Register"
          )}
        </button>



        <p className="text-center leading-6 font-medium text-[16px] mt-3">
          Already Member ?{" "}
          <Link href="/login" className="text-blue-600  underline">
            Log in
          </Link>
        </p>

         
      </form>
    </div>
  );
};

export default Page;
