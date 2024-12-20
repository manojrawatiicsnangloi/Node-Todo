
// const TodoForm = () => {

//     return (
//         <>
//         <ToastContainer />
//         <form className="flex my-10" onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 className="border-2 border-gray-300 p-2 w-3/4"
//                 placeholder="Add a new task..."
//                 value={todo_title}
//                 onChange={(e) => setTodoTitle(e.target.value)}
//             />
//             <br/>
//             <input
//                 type="text"
//                 className="border-2 border-gray-300 p-2 w-3/4"
//                 placeholder="Add a new task..."
//                 value={todo_desc}
//                 onChange={(e) => setTodoDesc(e.target.value)}
//             />
//             <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 ml-2 rounded"
//             >
//                 Add
//             </button>
//         </form>
//         </>
//     );
// };

// export default TodoForm;


import API_BASE_URL from '../../../config';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import React, { useContext, useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import { Alert, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../../../context';

const validationSchema = Yup.object().shape({
  todo_title: Yup.string().required('Todo Title is required'),
  todo_desc: Yup.string().required('Todo Desc is required')
});


const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
const formattedTime = today.toTimeString().slice(0, 5);

const TodoUpdateComponent = ({element, setIsModalOpen}) => {
  const [registerButton, setRegisterButton] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const user_id = Cookies.get("user_id");
  const { todoListGetFunc } = useContext(DataContext);

  const initialValues = {
    todo_title: element.todo_title,
    todo_desc: element.todo_desc
  }

  return (
    <>
      <div className="w-[100%] py-10 bg-blue-50">
        <div className="sm:w-[80%] w-[90%]  mx-auto bg-white rounded-lg shadow-2xl border border-solid border-gray-300">
          <h2 className="bg-gray-100 text-green-600 text-3xl py-4 px-6 mb-6 font-semibold text-center">Update Todo</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={(value) => {
              setRegisterButton(true);
              axios.put(`${API_BASE_URL}/api/todo/${element._id}`, {
                todo_title: value.todo_title,
                user: user_id,
                todo_desc: value.todo_desc,
              },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'x-refresh': refreshToken
                  }
                }
              ).then((value) => {
                  todoListGetFunc();
                  setIsModalOpen(false);
                  toast.success("Todo Updated Successfully", {
                    position: "top-center"
                  });
              }).catch((err) => {
                console.log(err);
                toast.error("Some Error Occured!!")
              }).finally(() => {
                setRegisterButton(false);
              });
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
              <Form>
                <div className="px-6 pb-4">
                  {/* Second Input Tag */}
                  <div className="mb-4 grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 gap-4">
                    <div>
                      <h4 className="text-green-600 mb-2">Todo Title<span className="text-red-500">*</span></h4>
                      <div className={"w-full relative col-span-1 "}>
                        <Field
                          type="text"
                          name="todo_title"
                          placeholder="Todo Title"
                          required
                          className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                        <PersonIcon className={'absolute top-2 peer-focus:text-green-600 border-r-2 left-2 '} />
                      </div>
                      <ErrorMessage name="studentName" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-green-600 mb-2">Todo Description <span className="text-red-500">*</span></h4>
                      <div className={"w-full relative col-span-1 "}>
                        <Field
                          type="text"
                          name="todo_desc"
                          placeholder="Todo Description"
                          required
                          className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                        <PersonIcon className={'absolute top-2 peer-focus:text-green-600 border-r-2 left-2 '} />
                      </div>
                      <ErrorMessage name="studentName" component="div" className="text-red-500" />
                    </div>
                  </div>
                  {/* Button Code */}
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                    >
                      {registerButton ? <> &nbsp;&nbsp;&nbsp;<CircularProgress color="inherit" size={19} /></> : <>Add</>}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default TodoUpdateComponent;
