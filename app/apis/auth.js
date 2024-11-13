import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;


export const registerUser = async (payload) => {
  try {
    console.log(" payload at register user", payload);  
     console.log("base url ",BASE_URL)                       
    const response = await axios.post(
      `${BASE_URL}/api/auth/create-user/`,                  
      payload,
      {
        headers: {
          "Content-Type": "application/json",                 
        },
      }
    );
    console.log(response, "check");                            
    return response;
  } catch {
    return response.error;                                      
  }
};


// login User

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(
      `https://api.escuelajs.co/api/v1/auth/login`,
      payload
    );

    return response;
  } catch (error) {
    if (error.response) {
      console.log(" error",error.response)
      return error.response;
    }
    throw error;


  }
};  









