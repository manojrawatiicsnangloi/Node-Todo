import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import API_BASE_URL from '../../../config';
import Cookies from 'js-cookie';
import { DataContext } from '../../../context';
import { ToastContainer, toast } from 'react-toastify';
import TodoSupport from './todoSupport';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TodoGet = () => {
    
    const { todoListGetFunc, todoList } = useContext(DataContext);
    const [button, setButton] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        todoListGetFunc();
    }, []);

    if(!todoList){
        return  <div className='flex justify-center items-center h-[80vh]'>
            <CircularProgress size={70} />
            </div>
    }

    return (
        <div className=' bg-blue-50 py-10 md:w-[75%] mx-auto px-10'>
            <h2 className="bg-gray-100 text-green-600 text-3xl py-4 px-6  font-semibold text-center">Todo List</h2>
            <ToastContainer />
            {
                todoList?.map((element, index) => {
                    return (
                        <TodoSupport element={element} index={index} key={index} />
                    )
                })
            }

<div className="mb-4">
                    <button
                      type="submit"
                      onClick={()=>{
                        navigate("/")
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                      {<>Add Todo</>}
                    </button>
                  </div>
              <div className="mb-4 ">
                    <button
                      type="submit"
                      onClick={()=>{
                        Cookies.remove("accessToken");
                        Cookies.remove("refreshToken");
                        setIsLoggedIn(false);
                        navigate("/login");
                    }}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                    >
                      {<>Logout</>}
                    </button>
                  </div>
        </div>
    )
}

export default TodoGet
