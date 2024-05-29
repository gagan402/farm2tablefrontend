import React, { useState,useEffect } from "react";
import axios from "axios";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { availGrowerProductsDoPublish } from "../services/grower_services";

const productCategories = {
  Dairy_Products: ["Milk", "Ghee", "Yogurt", "Cheese"],
  Fruits: ["Apple", "Grapes", "Orange", "Banana"],
};
function AvailGrowerProducts() {
  const [obj, setObj] = useState({
    email: "",
    pcategory: "",
    item: "",
    pic: null,
  });
  const [publishEnabled, setPublishEnabled] = useState(false);
  useEffect(() => {
    // Enable publish button only if all required fields are filled
    if (obj.pcategory && obj.item && obj.pic) {
      setPublishEnabled(true);
    } else {
      setPublishEnabled(false);
    }
  }, [obj]);

  const [imgprv, setImgPrv] = useState(null);
  const [items, setItems] = useState([]);
  var [itemString,setItemString]=useState("");
  useEffect(()=>{
    setObj({ ...obj, ["email"]: localStorage.getItem("emailId")});
  });

  function doUpdate(event) {
    const { name, value } = event.target;
    setObj({ ...obj, [name]: value });

    console.log(JSON.stringify(obj));
  }

  function fillItems(event) {
    setItems(productCategories[event.target.value]);
    console.log(productCategories[event.target.value]);
  }
  

  function getItem(event)
  {
    setItemString(itemString=itemString+event.target.value+",");
    
     document.getElementById("item").value=itemString.slice(0,-1);
     setObj(prevState=>({...prevState,item:itemString.slice(0,-1)}));
    
  }
  function doUpdatePic(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setObj({ ...obj, ["pic"]: file });
        setImgPrv(URL.createObjectURL(file));
        console.log(file);
      } else {
        alert("Please select a Image Only");
      }
    }
  }

  async function doPublish() {
    if (obj.pcategory && obj.item && obj.pic) {
    console.log(JSON.stringify(obj));
    var formdata = new FormData();
    for (let x in obj) {
      formdata.append(x, obj[x]);
    }
    // const url=`http://localhost:8000/grower/avail-products`;
    // const result= await axios.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}});

    const result = await availGrowerProductsDoPublish(formdata);
    alert("Your Product is availed successfully!");
    window.location.reload();
  }
  else {
    alert("Please fill in all the required fields.");
  }
  }

  return (
    <>
      <div className="space-y-12 lg:px-96 px-4">
        <h2 className="  text-3xl text-center font-bold -mb-3  mt-6" style={{color:'#0A6847'}}>
          AVAIL YOUR PRODUCTS
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
         
          <div className="sm:col-span-3">
            <label
              htmlFor="pcategory"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Select Category Of Your Product
            </label>
            <div className="mt-2">
              <select
                name="pcategory"
                id="pcategory"
                onChange={(e) => {
                  doUpdate(e);
                  fillItems(e);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              >
                <option value="">Select Product</option>
                {Object.keys(productCategories).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="itemsList"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Select Product
            </label>
            <div className="mt-2">
              <select
                name="itemsList"
                id="itemsList"
                onChange={getItem}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              >
                <option value="">Select Item</option>
                {items.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="item"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Your Product/Products
            </label>
            <div className="mt-2">
              <input
                disabled
                type="text"
                name="item"
                id="item"
                // autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-greee-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Upload Picture Of Your Product
            </label>
            <div className="mt-2 flex mr-2">
              <div className=" flex-1 justify-center rounded-lg border border-dashed border-green-800 px-2 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="pic"
                        onChange={doUpdatePic}
                        accept="image/jpeg,image/png"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <div className="flex-1 ml-2 relative">
                <img
                  src={imgprv}
                  className="w-full h-64  rounded-lg border border-green-800"
                  alt="Uploaded Image"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-start-3 sm:col-span-2">
            <button
              type="button"
              onClick={doPublish}
              disabled={!publishEnabled} // Disable button if not all fields are filled
              className={`w-full rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                publishEnabled ? "hover:bg-green-800" : "cursor-not-allowed opacity-50"
              }`}
            >
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailGrowerProducts;
