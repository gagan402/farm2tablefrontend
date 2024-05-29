import React from 'react';
import { useNavigate } from 'react-router-dom';
import gp from "../images/grower_pp.png";
import ap from "../images/avail_pp.png";
import it from "../images/item_manager.jpg";
import ItemsManager from './ItemsManager';

function GrowerDashboard() {
const navigate=useNavigate();
  function growerProfile()
  {
      navigate("/grower-profile");
  }

  function availProducts()
  {
     navigate("/avail-products");
  }

  function itemsManager()
  {
     navigate("/items-manager");
  }


  return (
      <>
   <div className="flex flex-wrap justify-center mt-6" >
       {/* Growers's Profile */}
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-3 my-3">
        <img className="w-full" src={gp}/>
        <div className="flex justify-center  px-6 py-4">
          <button onClick={growerProfile}className="py-2 px-4 rounded" style={{backgroundColor:'#0A6847',fontSize:'23px',color:'white'}}>
             Your Profile
          </button>
        </div>
      </div>


           {/* Avail Products */}
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md mx-3 my-3">
        <img className="w-full" src={ap} />
        <div className="flex justify-center  px-6 py-4">
          <button onClick={availProducts} className=" py-2 px-4 rounded" style={{backgroundColor:'#0A6847',fontSize:'23px',color:'white'}}>
            Avail Your Products
          </button>
        </div>
      </div>
      
      {/* Items Manager  */}
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md mx-3 my-3">
        <img className="w-full" src={it} />
        <div className="flex justify-center  px-6 py-4">
          <button onClick={itemsManager} className=" py-2 px-4 rounded" style={{backgroundColor:'#0A6847',fontSize:'23px',color:'white'}}>
            Manage Your Products
          </button>
        </div>
      </div>
    </div>
      
    <div className="text-center mt-10 mb-3" >
        <h1 className="text-5xl font-bold text-green-800  px-4 py-2 rounded">Farm2Table</h1>
      </div>
     
      </>
  )
}

export default GrowerDashboard;