import React,{useState}from 'react';
import axios from "axios";
import lbg from "../images/login-bg.jpg";
import {Link, useNavigate}  from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock,AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {registerDoSaveUser} from "../services/user-services";

function Register() {
  const[obj,setObj]=useState({
    email:"",
    password:"",
    type:""

  });

  const navigate=useNavigate();
  const [showPasswordorg, setShowPasswordorg] = useState(false);
  

  
  function doUpdate(event)
  {
    const {name,value}=event.target;
    setObj({...obj,[name]:value});
    // console.log(JSON.stringify(obj));

  }
  async function doSaveUser()
  {
    if (!validateEmail(obj.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(obj.password)) {
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }
    if (!obj.type) {
      alert("Please select a user type.");
      return;
    }

    console.log(JSON.stringify(obj));
    // const url=`http://localhost:8000/users/register-user?email=${obj.email}&password=${obj.password}&type=${obj.type}`;
    // const result =await axios.get(url);

    const result =await registerDoSaveUser(obj);
    // alert(JSON.stringify(result.data.type+" "+result.data.email+" "+result.data.password));
    // if(result.data.type==="grower")
    //     {
    //        navigate("/grower-dash");
    //     }
    //     else
    //     if(result.data.type==="consumer")
    //     {
    //         navigate("/consumer-dash");
    //     }
   if(result.data.type==="grower"|| result.data.type==="consumer")
   {
      alert("Please login to continue!");
      navigate("/login");
   }

  }
  function validateEmail(email) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  }
  return (
    <>
<div
        className="  text-black h-screen flex justify-center  items-center bg-cover"
        style={{
          backgroundImage:`url(${lbg})`,
          backgroundSize: "cover", 
        }}
       
      >
<div>
        <div className='bg-slate-800 border border-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
            <h1 className="text-4xl text-black font-bold text-center mb-6">Register</h1>
            <div  className="relative my-4">
            <input type="email" name="email" onChange={doUpdate} className="block w-72 py-4 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none  dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:black focus:border-green-800 peer" placeholder=""/>
            <label htmlFor=""  className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-800 peer-focus:dark:text:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
            <BiUser className="absolute top-4 right-4"/>
            </div>
            
            <div className="relative my-4">
            <input type={showPasswordorg ? "text" : "password"} name="password" onChange={doUpdate} className="block w-72 py-4 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none  dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:black focus:border-green-800 peer " placeholder=""/>
            <label htmlFor="" className="absolute text-sm  text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-800 peer-focus:dark:text:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
            {showPasswordorg ? (
              <AiOutlineEyeInvisible
                className='absolute top-4 right-4 cursor-pointer'
                onClick={() => setShowPasswordorg(false)}
              />
            ) : (
              <AiOutlineEye className='absolute top-4 right-4 cursor-pointer' onClick={() => setShowPasswordorg(true)} />
            )}
            </div>

            <div style={{ fontSize: '12px', color: 'black', marginTop: '5px',marginBottom:'0', maxWidth: '300px' }} className="relative my-4"><span>Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.</span></div>


            <div className="relative">
            <select  name="type" onChange={doUpdate} className="block w-72 py-4 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:text-green-800 focus:border-green-800 peer">
              <option value="" className="bg-white">Select User Type</option>
              <option value="grower" className="bg-white">Grower</option>
              <option value="consumer" className="bg-white">Consumer</option>
            </select>
          </div>
           
            <button className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-green-800 hover:bg-green-800 hover:text-white py-2 transition-colors duration-300' type="button"  onClick={doSaveUser}>Register</button>
            <div>
                <span className="m-4">Already Have an Account?
                    <Link  to="/Login" className="text-blue-500">Login</Link>
                </span>
            </div>

        </div>
    </div>
    </div>
    </>
  )
}

export default Register;
