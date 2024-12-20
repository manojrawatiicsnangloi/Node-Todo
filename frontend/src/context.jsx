import axios from "axios";
import { createContext, useState } from "react";
import API_BASE_URL from "./config";
import Cookies from "js-cookie";

const DataContext = createContext();

const DataProviderFuncComp = ({ children }) => {
  const [todoList, setTodoList] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  const getSessionFunc = () => {
    console.log("getSessionFunc");
  };

  const userLogoutFunc = () => {
  axios.post(`${API_BASE_URL}/api/logout/`).then(()=>{
  Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  }).catch((error)=>{
    console.log(error); 
  });    
  };

  const todoById = (id)=>{
    axios
      .get(`${API_BASE_URL}/api/todoget/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh": refreshToken,
        },
      })
      .then((value) => {
        console.log(value.data);
        setTodoList(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const todoListGetFunc = () => {
    axios
      .get(`${API_BASE_URL}/api/todoget/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh": refreshToken,
        },
      })
      .then((value) => {
        console.log(value.data);
        setTodoList(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DataContext.Provider
      value={{
        todoListGetFunc,
        todoList,
        getSessionFunc,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProviderFuncComp, DataContext };
