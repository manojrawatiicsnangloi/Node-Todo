import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { NavLink, Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginComponent/Login/LoginPage";
import Register from "./Component/LoginComponent/Register/Register";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Navbar from "./Component/Navbar/Navbar";
import Cookies from "js-cookie";
import { DataContext } from "./context";
import todoGet from "./pages/todo/todoGet/todoGet";
import TodoAddComp from "./pages/todo/todoPost/todoPost";
import TodoMain from "./pages/todo/TodoMain";
import TodoUpdateComponent from "./pages/todo/TodoUpdate/TodoUpdate";
import TodoGet from "./pages/todo/todoGet/todoGet";

function App() {

  const {isLoggedIn, setIsLoggedIn} = useContext(DataContext);

  useEffect(()=>{
    if(Cookies.get("accessToken") == "" || !Cookies.get("accessToken")){
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
    }
  },[])
  
  return (
    <>
  <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        {/* UnProtected Routes */}
        <Route path="/signup" Component={Register} />
        <Route path="/login" Component={LoginPage} />

        {/* Protected Routes */}
        <Route path="" Component={ProtectedRoutes}>
          <Route path="" Component={TodoMain} />
        </Route>
        <Route path="" Component={ProtectedRoutes}>
          <Route path="/todoget" Component={TodoGet} />
        </Route>
        <Route path="" Component={ProtectedRoutes}>
          <Route path="/todo/:id" Component={TodoUpdateComponent} />
        </Route>
        {/* <Route path="" Component={ProtectedRoutes}>
          <Route path="/add-todo" Component={TodoAddComp} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
