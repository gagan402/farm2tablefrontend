import axios from "axios";

// const baseURL="http://localhost:8000";
const baseURL="https://farm2table.onrender.com";

let publicAxios=axios.create({baseURL,});


const privateReq=axios.create({baseURL,});
privateReq.interceptors.request.use((config)=>
{
   const token=localStorage.getItem("token");
   if(token)
   {
    config.headers.Authorization=`Bearer ${token}`;
   }

   return config;
})

export {publicAxios,privateReq,baseURL};
