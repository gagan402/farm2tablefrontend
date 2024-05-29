import React,{useState,useEffect} from 'react';
import axios from "axios";
import { baseURL } from '../services/axios-config';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {GrowerProfileBtnSave,GrowerProfileGetProfileData,GrowerProfileDoUpdateProfile} from "../services/grower_services";

function GrowerProfile() {

    const [obj,setObj]=useState({
      firstname:"",
      lastname:"",
      email:"",
      address:"",
      city:"",
      village:"",
      mobile:"",
      categories:"",
      aadhaar:"",
      pic:null

    });

    useEffect(()=>{
       
         const storedEmail = localStorage.getItem("emailId");
         console.log("Stored Email:", storedEmail);
        if (storedEmail) {
      
              setObj({...obj,email:storedEmail});
              console.log(JSON.stringify(obj));
              getProfileData();
            
          }  
    },[]);
    const [imgprv,setImgPrv]=useState(null);
  

    function doSaveProfile(event)
    {
        const {name,value}=event.target;
        // setObj({...obj,[name]:value});
        setObj({ ...obj, [name]: value });
        // console.log(obj);
    }

    function doSavePic(event)
    {
      const file = event.target.files[0];
      if(file)
      {
        if(file.type.startsWith('image/'))
        {
       setObj({...obj,["pic"]:file});
       setImgPrv(URL.createObjectURL(file));
       console.log(file);
        }
        else{
          alert("Please select a Image");
        }
       }
       
    } 



    async function getProfileData()
    {
      // const url =`http://localhost:8000/grower/search-grower-profile?email=${obj.email}`;
      // const result=await axios.get(url);

      const result=await GrowerProfileGetProfileData(localStorage.getItem("emailId"));
      console.log(JSON.stringify(result));
      if(result.data!=null)
      {

      result.data.hdn=result.data.picpath;
      console.log(JSON.stringify(result.data));
      setObj({...result.data});
      setImgPrv(`${baseURL}/uploads/${result.data.picpath}`);

      setImgPrv("http://localhost:8000/uploads/"+result.data.picpath);
      document.getElementById("updateButton").disabled = false;
      document.getElementById("saveButton").disabled = true;
      document.getElementById("updateButton").classList.remove("opacity-200", "blur-sm", "cursor-not-allowed");
      document.getElementById("saveButton").classList.add("opacity-200", "blur-sm", "cursor-not-allowed");
      }
      else{
        document.getElementById("updateButton").disabled = true;
        document.getElementById("saveButton").disabled = false;
        document.getElementById("updateButton").classList.add("opacity-200", "blur-sm", "cursor-not-allowed");
        document.getElementById("saveButton").classList.remove("opacity-200", "blur-sm", "cursor-not-allowed");
      }

    }



    async function btnSave()
    {
      // Check if all fields are filled
    for (const key in obj) {
      if (!obj[key]) {
        console.log(obj[key]);
          alert("Please fill in all fields.");
          return; // Stop execution if any field is empty
      }
  }

  // Validate mobile number
  if (!validateMobile(obj.mobile)) {
      alert("Invalid Mobile Number");
      return;
  }

  // Validate Aadhaar card number
  if (!validateAadhaar(obj.aadhaar)) {
      alert("Invalid Aadhaar Card Number");
      return;
  }
      console.log(JSON.stringify(obj));
        // alert(JSON.stringify(obj));
        var formdata=new FormData();
        for(var x in obj)
        {
          formdata.append(x,obj[x]);
        }
        console.log(JSON.stringify(formdata));

        // const url =`http://localhost:8000/grower/add-grower-profile`;
        // const result =await axios.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}});
  
        const result=await GrowerProfileBtnSave(formdata);
        alert("Profile saved!")
        window.location.reload();
        
    }
      

    async function doUpdateProfile()
    {
      // Check if all fields are filled
    for (const key in obj) {
      if (!obj[key]) {
        console.log(key);

          alert("Please fill in all fields.");
          return; // Stop execution if any field is empty
      }
     }

  // Validate mobile number
  if (!validateMobile(obj.mobile)) {
      alert("Invalid Mobile Number");
      return;
  }

  // Validate Aadhaar card number
  if (!validateAadhaar(obj.aadhaar)) {
      alert("Invalid Aadhaar Card Number");
      return;
  }
      console.log(JSON.stringify(obj));
      var formdata=new FormData();
      for(var x in obj)
      {
        formdata.append(x,obj[x]);
      }
      console.log(JSON.stringify(formdata));
      // const url =`http://localhost:8000/grower/update-grower-profile`;
      // const result =await axios.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}});
      const result =await GrowerProfileDoUpdateProfile(formdata);
      alert("Profile Updated!");
      window.location.reload();

    }

    // Validation Functions
    function validateMobile(mobile) {
      // Basic validation for Indian mobile numbers
      return /^\d{10}$/.test(mobile);
  }

  function validateAadhaar(aadhaar) {
      // Basic validation for Aadhaar card numbers
      return /^\d{12}$/.test(aadhaar);
  }
    
  return (
    <>
    <div className="space-y-12 lg:px-96 px-4  mb-4">
          <h2 className="text-3xl text-center font-bold -mb-7  mt-4" style={{color:'#0A6847'}}>Your Profile </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-xl font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  onChange={doSaveProfile}
                  value={obj.firstname}
                  id="firstname"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-xl font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastname"
                  onChange={doSaveProfile}
                  value={obj.lastname}
                  id="lastname"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={doSaveProfile}
                  onBlur={getProfileData}
                  value={obj.email}
                  readOnly
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div className="col-span-full">
              <label htmlFor="address" className="block text-xl font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  onChange={doSaveProfile}
                  value={obj.address}
                  id="address"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-xl font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  onChange={doSaveProfile}
                  value={obj.city}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="village" className="block text-xl font-medium leading-6 text-gray-900">
                Village/Town
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="village"
                  onChange={doSaveProfile}
                  value={obj.village}
                  id="village"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="mobile" className="block text-xl font-medium leading-6 text-gray-900">
                Mobile No.
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="mobile"
                  onChange={doSaveProfile}
                  value={obj.mobile}
                  onBlur={() => {
                    if (!validateMobile(obj.mobile)) {
                        alert("Invalid Mobile Number");
                    }
                }}
                  id="mobile"
                  autoComplete="mobile"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="categories" className="block text-xl font-medium leading-6 text-gray-900">
                Select Category
              </label>
              <div className="mt-2">
                <select
                  id="categories"
                  name="categories"
                  onChange={doSaveProfile}
                  value={obj.categories}
                  autoComplete="categories"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option aria-disabled>Select Category</option>

                  <option>a</option>
                  <option>b</option>
                  <option>c</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
            <label htmlFor="aadhaar" className="block text-xl font-medium leading-6 text-gray-900">
              Aadhaar Card Number
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="aadhaar"
                onChange={doSaveProfile}
                value={obj.aadhaar}
                onBlur={() => {
                  if (!validateAadhaar(obj.aadhaar)) {
                      alert("Invalid Aadhaar Card Number");
                  }
              }}
                id="aadhaar"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-xl font-medium leading-6 text-gray-900">
                Upload Your Aadhaar Card Picture
              </label>
              <div className="mt-2 flex mr-2">
                <div className="text-center flex-1 justify-center rounded-lg border border-dashed border-green-800 px-4 py-10">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="pic" accept="image/jpeg,image/png" onChange={doSavePic} type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
                <div className="flex-1 ml-2 relative">
                      <img src={imgprv} className="w-full h-64  rounded-lg border border-green-800" alt="Uploaded Image" />
                </div>

              </div>
              
            </div>
          </div>

          <div className=" flex items-center justify-center gap-x-6 ">
       
       <button
         type="button"
         id="saveButton"
         onClick={btnSave}
         className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
       >
         SAVE
       </button>

       <button
         type="button"
         id="updateButton"
         onClick={doUpdateProfile}
         className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
       >
         UPDATE
       </button>
     </div>
        </div>

    
     

    
    </>
  )
}

export default GrowerProfile;