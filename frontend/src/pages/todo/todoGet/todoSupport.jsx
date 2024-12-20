import React, { useContext, useState } from 'react'
import API_BASE_URL from '../../../config';
import { CircularProgress } from '@mui/material';
import Cookies from "js-cookie";
import axios from 'axios';
import { DataContext } from '../../../context';
import { NavLink, Navigate } from 'react-router-dom';
import TodoUpdateModal from '../TodoUpdate/TodoUpdateModel';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoSupport = ({ element, index }) => {
    const [button, setButton] = useState(false);
    const { todoListGetFunc } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <TodoUpdateModal element={element} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
            <div className="todo-item bg-white rounded-lg shadow-md p-4 md:flex md:flex-row flex-col  gap-2 my-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{index + 1}. {element.todo_title}</h3>
                    <p className="text-gray-600">{element.todo_desc}</p>
                </div>
                <div className=" ml-auto">
                        <button
                        onClick={()=>{
                            setIsModalOpen(true);
                        }}
                        className="edit-btn px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700">
                          Edit  <EditIcon />
                        </button>
                    <button className="delete-btn px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700 ml-2"
                        onClick={
                            () => {
                                const accessToken = Cookies.get("accessToken");
                                const refreshToken = Cookies.get("refreshToken");
                                setButton(true);
                                axios.delete(`${API_BASE_URL}/api/tododelete/${element._id}/`, {
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`,
                                        "x-refresh": refreshToken,
                                    },
                                },
                                ).then((value) => {
                                    console.log(value.data);
                                    todoListGetFunc(); 
                                }).catch((err) => {
                                    console.log(err);
                                }).finally(() => {
                                    setButton(false);
                                });
                            }}
                    > {button ? <CircularProgress size={19} color='inherit' /> :<>Delete <DeleteIcon /> </>}</button>
                </div>
            </div>
        </>
    )
}

export default TodoSupport
