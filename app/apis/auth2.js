import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Generate OTP for email verification
export const generateOtpForEmail = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/generate-otp/`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle BadRequest (400) specifically
      return error.response;
    }
    throw new Error("Error verifying OTP");
  }
};

// Verify the OTP for email verification
export const verifyOTP = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/password/verify-otp/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set correctly
          // Add any other headers you need here
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle BadRequest (400) specifically
      return error.response;
    }
    throw new Error("Error verifying OTP");
  }
};
// Verify the OTP for email verification
export const registerAndCreateUser = async (payload) => {
  try {
    console.log(" payload at register user", payload);

    const response = await axios.post(
      `${BASE_URL}/api/auth/user/create-user/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set correctly
          // Add any other headers you need here
        },
      }
    );
    console.log(response, "check");
    return response;
  } catch {
    return response.error;
  }
};

// check user
export const checkUsername = async (username) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/auth/user/check-username/`,
      {
        params: {
          username: username,
        },
      }
    );
    return response; // Return the response data from the API
  } catch (error) {
    console.error("Error checking username:", error);
    throw error; // Rethrow the error if you want to handle it later
  }
};

// login User

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, payload);

    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

// forgot password send otp
export const generateOtpForForgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/password/send-otp/`,
      {
        email,
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw new Error("Error generating OTP for email verification");
  }
};

// Verify OTP for forgot password
export const verifyOtpForgetPassword = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/password/verify-otp/`,
      payload
    );
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw new Error("Error verifying OTP");
  }
};

// change forgot password
export const changeForgotPassword = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/password/forget`,
      payload
    );

    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw new Error("Error generating OTP for email verification");
  }
};
