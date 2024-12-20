import Modal from "react-modal";
import React from 'react'
import { Close } from "@mui/icons-material";
import TodoUpdateComponent from "./TodoUpdate";

const TodoUpdateModal = (props) => {
    return (
        <>
            <Modal
                isOpen={
                    props?.isModalOpen
                }
                onRequestClose={() =>
                    props.setIsModalOpen(false)
                }
                style={{ border: "2px solid blue", borderRadius: "1rem" }}
            >

                <div style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    cursor: 'pointer',
                    
                }} onClick={()=>{
                    props.setIsModalOpen(false);
                }}
                className="hover:bg-red-500 hover:text-white text-red p-4">
                    <Close />
                </div>
                <TodoUpdateComponent setIsModalOpen={props.setIsModalOpen} element={props.element}/>
            </Modal>

        </>
    )
}

export default TodoUpdateModal
