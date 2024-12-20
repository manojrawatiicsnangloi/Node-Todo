import React, { useState } from 'react'
import generateValidationSchema from '../../GenrateValidationSchema/genrateValidationSchema'
import genrateInitalValues from '../../genrateInitialValues/InitialValues';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import API_BASE_URL from '../../../config';
import { CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import companyRegisterInputArr from './CompanyRegister';

const CompanyRegister = () => {

    const validationSchema = generateValidationSchema(companyRegisterInputArr);
    const initialValues = genrateInitalValues(companyRegisterInputArr);
    const [registerButton, setRegisterButton] = useState(false);
    const navigate = useNavigate()

    const registerStudentFunc = (values, {resetForm})=>{
        setRegisterButton(true);
        values["user_type"] = "company"
        axios.post(`${API_BASE_URL}/company_register/`, values).then((value)=>{
            
              navigate("/login");
              toast.success("You are registerd Successfully", {
                  position : "top-center"
              });
            resetForm();
          }).catch((err)=>{
            if (err.response.data.errors.email && err.response.data.errors.phone){
                toast.error("This Email and Phone Number is already in use", {
                    position : "top-center"
                })
            }
            
            else if (err.response.data.errors.email){
                toast.error("This Email is already in use", {
                    position : "top-center"
                })
            }
            else if (err.response.data.errors.phone){
                toast.error("This Phone Number is already in use", {
                    position : "top-center"
                })
            }
            console.log(err);
          }).finally(()=>{
            setRegisterButton(false);
          })
    }
    
    return (
        <div>
            <ToastContainer />

            <div className="w-[100%] py-10 bg-blue-50">

                <div className="sm:w-[80%] w-[90%]  mx-auto bg-white rounded-lg shadow-2xl border border-solid border-gray-300 ">
                    <h2 className="bg-gray-100 text-blue-600 text-3xl py-4 px-6 mb-6 font-semibold text-center">Company SignUp</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={registerStudentFunc}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
                            <Form>
                                <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
                                    {companyRegisterInputArr.map((element, index) => {

                                        if (element.type == "checkbox") {
                                            return (
                                                <div className='lg:col-span-3 sm:col-span-2 col-span-1' key={index}>
                                                    <Field
                                                        type={element.type}
                                                        name={element.name}
                                                        placeholder={element.placeholder}
                                                        required
                                                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                                    />
                                                    &nbsp;&nbsp;  <h4 className="text-blue-600 mb-2 inline-block mt-4">{element.placeholder} </h4>
                                                    <ErrorMessage name={element.name} component="div" className="text-red-500" />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div className='' key={index}>
                                                <h4 className="text-blue-600 mb-2">{element.placeholder} <span className="text-red-500">*</span></h4>
                                                <div className={"w-full relative col-span-1 "}>
                                                    {element.icon}
                                                    <Field
                                                        type={element.type}
                                                        name={element.name}
                                                        placeholder={element.placeholder}
                                                        required
                                                        className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                    />
                                                </div>
                                                <ErrorMessage name={element.name} component="div" className="text-red-500" />
                                            </div>
                                        )
                                    })}
                                </div>
                                    <div className="mb-4 mx-5">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                                        >
                                            {registerButton ? <CircularProgress size={19} color='inherit'/> : "Register"}
                                        </button>
                                    </div>
                                    <div className="mb-4 mx-5">
                                        <NavLink to={"/signup"}>

                                        <button
                                            className={`underline inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold  uppercase leading-normal text-blue-500 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                                            >
                                            Intern Register
                                        </button>
                                            </NavLink>
                                    </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default CompanyRegister
