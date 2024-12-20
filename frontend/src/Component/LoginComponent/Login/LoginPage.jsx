import React, { useContext, useState } from 'react';
import { DataContext } from '../../../context';
import { CircularProgress } from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../../config';
import inputLoginArr from './loginInpArr';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {

  const [loginButton, setLoginButton] = useState(false);
  const navigate = useNavigate();
  const { profileFunc, isLoggedIn, setIsLoggedIn } = useContext(DataContext);

  const loginFunc = (e) => {
    e.preventDefault();
    setLoginButton(true);
    axios.post(`${API_BASE_URL}/api/login/`, {
      email: e.target.username.value,
      password: e.target.password.value,
    }).then((value)=>{
        console.log(value.data);
        Cookies.set("user_id", value.data.user._id)
        Cookies.set("accessToken" , value.data.accessToken, { secure: true }); 
        Cookies.set("refreshToken" , value.data.refreshToken, { secure: true }); 
setIsLoggedIn(true);
        navigate("/");
    }).catch((err)=>{
      console.log(err);
      if(err.response){
        if(err.response.status == 400){
          toast.error("Invalid Info", {position : "top-center"});
        }
      }
    }).finally(()=>{
      setLoginButton(false);
    })
  }

  return (
    <>
    <ToastContainer />
      <section className="gradient-form h-[100vh] bg-neutral-200  dark:bg-neutral-700">
        <div className=" h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 md:w-[55%] mx-auto">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800 py-20 md:py-0">
                {/* Left column container */}
                <div className="px-4 md:px-0">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    {/* <div className="text-center mt-4">
                      <img
                        className="mx-auto w-48"
                        src={logo}
                        alt="logo"
                      />
                    </div> */}
                    <form onSubmit={loginFunc}>
                      {/* Username input */}
                      {inputLoginArr.map((element, index) => {
                        return (
                          <div className="relative my-4" data-te-input-wrapper-init key={index}>
                            <input
                              type={element.type}
                              id={element.id}
                              name={element.name}
                              required
                              value={element.value}
                              className=" border border-gray-300 outline-none peer  block min-h-[auto] w-full pl-8 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:border-orange-600  focus:border rounded"
                              placeholder={element.placeholder}
                            />
                            {element.icon}
                          </div>
                        )
                      })}
                      <div className=" pb-1 pt-1 text-center">
                        <button
                          className={` inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background: "green",
                          }}
                        >
                        {loginButton ?  "Loading..." : "Login"}
                        </button>
                      </div>
                      <div className="mb-4 pb-1 pt-1 text-center">
                        <button
                        onClick={()=>{
                          navigate("/signup")
                        }}
                          className={`mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background: "blue",
                          }}
                        >
                        {"Register Now"}
                        </button>
                      </div>
                      {/* End of Loading Button */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage