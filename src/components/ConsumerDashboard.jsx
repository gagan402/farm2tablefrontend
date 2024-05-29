import React from 'react'
import {useNavigate} from 'react-router-dom';
import gp from "../images/grower_pp.png";
import ap from "../images/avail_pp.png";

function ConsumerDashboard() {
  const navigate=useNavigate();
  function findGrowers()
  {
     navigate("/find-growers");
  }

  function consumerProfile()
  {
    navigate("/consumer-profile");
  }
  return (
    <>
        <div className="flex flex-wrap justify-center mt-6" >
       {/* Consumers's Profile */}
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-3 my-3">
        <img className="w-full" src={gp}/>
        <div className="flex justify-center  px-6 py-4">
          <button onClick={consumerProfile}   className="py-2 px-4 rounded" style={{backgroundColor:'#0A6847',fontSize:'23px',color:'white'}}>
             Your Profile
          </button>
        </div>
      </div>


           {/* Find Grower */}
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md mx-3 my-3">
        <img className="w-full" src={ap} />
        <div className="flex justify-center  px-6 py-4">
          <button onClick={findGrowers}   className=" py-2 px-4 rounded" style={{backgroundColor:'#0A6847',fontSize:'23px',color:'white'}}>
            Find Growers
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

export default ConsumerDashboard;