import axiosInstance from "@/lib/axiosInstance";


export const  allProducts = async (page)=>{
   try {
      const response = await axiosInstance.get(`/v1/products?offset=${page}&limit=10`);
      return response.data;
   } catch (error) {

      return error;
   }
}