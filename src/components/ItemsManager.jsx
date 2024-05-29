import React, { useState ,useEffect} from "react";
import axios from "axios";
import { baseURL } from "../services/axios-config";
import {itemsManagerFetchData,itemsManagerdoDelete} from "../services/grower_services";

function ProductTableRow({obj,fd,ss}) { 
   
    async function doDelete()
    {
        // alert(JSON.stringify(obj));
        const confirmDelete = window.confirm("Are you sure you want to remove this Item?");
        if (confirmDelete) {
        // const url = `http://localhost:8000/grower/delete-products?_id=${obj._id}`;
        // const result = await axios.get(url);
        const result=await itemsManagerdoDelete(obj._id);
        fd();
        // window.location.reload(true);
        // alert(JSON.stringify(result));
        }
        
    }
 return (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="px-6 py-4 text-xl  text-gray-900 dark:text-white">{ss + 1}.</td>
    <td className="p-4">
      <img
        src={`${baseURL}/uploads/${obj.picpath}`}
        className="w-16 md:w-32 max-w-full max-h-full"
        alt={obj.picpath}
      />
    </td>
    <td className="px-6 py-4 text-xl  text-gray-900 dark:text-white">
      {obj.pcategory}
    </td>
    <td className="px-6 py-4 text-xl text-gray-900 dark:text-white">
      {obj.item}
    </td>

    <td className="px-6 py-4">

  <button
  className="font-medium bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700"
  onClick={doDelete}
>
  Remove
</button>

    </td>
  </tr>
)
};





function ItemsManager() {
  const [em, setEmail] = useState("");
  const [ary,setAry]=useState([]);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailId");
    if (storedEmail) {
        setEmail(storedEmail);
        fetchdata();
    }
    
});



  async function fetchdata() {
    // alert(em);
    // const url = `http://localhost:8000/grower/fetch-products?email=${em}`;
    // const result = await axios.get(url);
    // alert(JSON.stringify(result));

    const result= await itemsManagerFetchData(em);
    setAry(result.data);

  }

  return (
    <>
      <div className=" space-y-12 lg:px-32 px-4">
      
      
        <div className="text-3xl text-center font-bold -mb-7  mt-4" style={{color:'#0A6847'}}>MANAGE YOUR PRODUCTS</div>

        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead style={{backgroundColor:"#0A6847"}} className=" sticky top-0 text-xL bg-green-600 text-white uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3">
                  Serial No.
                </th>
                <th scope="col" className="px-16 py-3">
                  PRODUCT PICTURE
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Category
                </th>
                <th scope="col" className="px-6 py-3">
                  PRODUCT NAME
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ary.map((obj,index) => {
                return (
                  <ProductTableRow
                    key={obj._id}
                     obj={obj}
                    fd={fetchdata}
                    ss={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ItemsManager;
