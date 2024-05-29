import React, { useEffect } from "react";
import { baseURL } from "../services/axios-config";
import { useState } from "react";
import {
  findGrowerGetLocation,
  findGrowersGetGrowers,
  findGrowerDoContactGrower
} from "../services/consumer_services";

const productCategories = {
  Dairy_Products: ["Milk", "Ghee", "Yogurt", "Cheese"],
  Fruits: ["Apple", "Grapes", "Orange", "Banana"],
};

function GrowerCard({ ob }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [growerInfo,setGrowerInfo]=useState({});
  async function contactGrower()
  {
     setModalOpen(true);
     const result=await findGrowerDoContactGrower(ob.email);
    //  alert(JSON.stringify(result.data[0]));
     setGrowerInfo(result.data[0]);
  }
  return (
    <>
      <div className="max-w-x rounded-lg  overflow-hidden shadow-lg m-4 bg-[#F6E9B2] h-96 w-64">
        <div className="px-4 py-4">
          <p className="text-center text-lg  mb-2">
            <b>Category</b> : {ob.pcategory}
          </p>
          <p className="text-center text-lg  mb-2">
            <b>Product</b> : {ob.item}
          </p>
          <div className="flex justify-center mb-4">
            <img
              className="w-56  h-56 rounded-lg "
              src={`${baseURL}uploads/${ob.picpath}`}
              alt="Item"
            />
          </div>
          <div className="flex justify-center">
            <button onClick={contactGrower} className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
             Contact Grower
            </button>
          </div>
        </div>
      </div>

    
      
      {modalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-black focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#F6E9B2] outline-none focus:outline-none">
              
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h6 className="text-3xl text-green-800 font-bold">
                    Contact Grower
                  </h6>
                  <button
                    className="p-1    border-0 text-2xl float-right  leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalOpen(false)}
                  >
                    
                      <span class="material-symbols-outlined">close</span>
                    
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                  <p className="text-xl  font-semibold">
                    <span className="text-xl  font-bold">Name : </span>{growerInfo.firstname} {growerInfo.lastname}
                  </p>
                   <p className="text-xl  font-semibold"><span className="text-xl  font-bold">Email Id : </span>{growerInfo.email}</p>
                   <p className="text-xl  font-semibold"><span className="text-xl  font-bold">Address : </span>{growerInfo.address}</p>
                   <p className="text-xl  font-semibold"><span className="text-xl  font-bold">City : </span>{growerInfo.city}</p>
                   <p className="text-xl  font-semibold"> <span className="text-xl  font-bold">Location : </span>{growerInfo.village}</p>
                   <p className="text-xl  font-semibold"><span className="text-xl  font-bold">Contact No. : </span>{growerInfo.mobile}</p>
                </div>
                
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function FindGrower() {
  const [items, setItems] = useState([]);
  const [loc, setLoc] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    category: "",
    item: "",
    location: "",
  });

  const [cards, setCards] = useState([]);

  function comboChange(event) {
    const { name, value } = event.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(selectedValues);
  }

  function fillItems(event) {
    setItems(productCategories[event.target.value]);
    console.log(productCategories[event.target.value]);
  }

  async function getLocation() {
    const result = await findGrowerGetLocation();
    const villageNames = result.data.map((obj) => obj.village);
    setLoc(villageNames);
  }

  useEffect(() => {
    getLocation();
  }, []);

  async function getGrowers() {
    var formdata = new FormData();
    for (let x in selectedValues) {
      formdata.append(x, selectedValues[x]);
    }
    const result = await findGrowersGetGrowers(formdata);
    setCards(result.data);
    if (result.data.length === 0) {
      alert("No Data Found");
    }
    // alert(JSON.stringify(result));
    // console.log(JSON.stringify(result));
  }


  const isButtonDisabled =
  !selectedValues.category || !selectedValues.item || !selectedValues.location;

  return (
    <>
      <div className="grid sm:grid-cols-3 border-4 border-green-800  rounded-lg gap-4 p-4  mt-20 mx-3">
        {/* Category */}
        <div className="sm:col-span-1">
          <label
            htmlFor="category"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            Select Category
          </label>
          <div className="mt-2">
            <select
              name="category"
              id="category"
              value={selectedValues.category}
              onChange={(e) => {
                fillItems(e);
                comboChange(e);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            >
              <option value="">Select Category</option>
              {Object.keys(productCategories).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* items */}
        <div className="sm:col-span-1">
          <label
            htmlFor="item"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            Select product
          </label>
          <div className="mt-2">
            <select
              name="item"
              id="item"
              value={selectedValues.item}
              onChange={comboChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            >
              <option value="">Select Product</option>
              {items.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* location */}
        <div className="sm:col-span-1">
          <label
            htmlFor="location"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            Select Location(Village)
          </label>
          <div className="mt-2">
            <select
              name="location"
              id="location"
              value={selectedValues.location}
              onChange={comboChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            >
              <option value="">Select Village</option>
              {loc.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
      <button
          onClick={getGrowers}
          disabled={isButtonDisabled}
          className={`rounded-lg px-3 py-2 text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-800 hover:bg-green-900"
          }`}
        >
          Find Growers
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {/* <div className="flex flex-wrap justify-center mt-4 space-x-4 space-y-4"> */}
        {cards.map((obj) => {
          return <GrowerCard key={obj._id} ob={obj}></GrowerCard>;
        })}
      </div>
    </>
  );
}

export default FindGrower;
