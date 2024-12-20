import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { DataContext } from "../context";
import Cookies from 'js-cookie';


const ProtectedRoutes = () => {
    
    const { getSessionFunc } = useContext(DataContext);

    const navigate = useNavigate()
      useEffect(()=>{
        getSessionFunc();
        if (!Cookies.get("accessToken")){
            return navigate("/login");
        }
    },[])


  return (
    <>
      <Outlet />
    </>
  )
  
}

export default ProtectedRoutes