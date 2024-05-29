import React, { useState } from "react";
import axios from "axios";
import lbg from "../images/login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginDoLogging } from "../services/user-services";

function Login() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function doUpdate(event) {
    const { name, value } = event.target;
    setObj({ ...obj, [name]: value });
  }

  async function doLogging() {
    if (!validateEmail(obj.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!obj.email) {
      alert("Please enter email!");
      return;
    }
    if (!obj.password) {
      alert("Please enter password!");
      return;
    }
    // const url=`http://localhost:8000/users/login-user?email=${obj.email}&password=${obj.password}`;
    // const result= await axios.get(url);

    const result = await LoginDoLogging(obj);
    console.log(JSON.stringify(result));
    if(result.data.res=="no user found")
    {
          alert("No user found ");
          return ;
    }
    // if(result.)
    console.log("jtoken= ",result.data.jtoken);
    // localStorage.setItem("token",result.data.res.jtoken);
    localStorage.setItem("token",result.data.jtoken);
    localStorage.setItem("emailId",obj.email);
    // alert(JSON.stringify(result.data.type));
    if(result.data.status==="wrong password")
      {
        alert("Wrong Password");
        return ;
      }
    if (result.data.res.type === "grower") {
      navigate("/grower-dash");
    } else if (result.data.res.type === "consumer") {
      navigate("/consumer-dash");
    }
  }
  function validateEmail(email) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        <div className="bg-slate-800 border border-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-black font-bold text-center mb-6">
            Login
          </h1>
          <div className="relative my-4">
            <input
              type="email"
              name="email"
              onChange={doUpdate}
              className="block w-72 py-4 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none  dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:text-green-800 focus:border-green-800 peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-800 peer-focus:dark:text:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email
            </label>
            <BiUser className="absolute top-4 right-4" />
          </div>

          <div className="relative my-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={doUpdate}
              className="block w-72 py-4 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none  dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:text-green-800 focus:border-green-800 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm  text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-800 peer-focus:dark:text:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password
            </label>
            {showPassword ? (
              <AiOutlineEyeInvisible
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

         
          <button
            onClick={doLogging}
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-green-800 hover:bg-green-800 hover:text-white py-2 transition-colors duration-300"
            type="button"
          >
            Login
          </button>
          <div>
            <span className="m-4">
              New Here?
              <Link to="/Register" className="text-blue-500">
                Create an Account
              </Link>
            </span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;
