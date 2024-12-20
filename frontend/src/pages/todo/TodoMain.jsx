import React from 'react'
import TodoAddComp from './todoPost/todoPost'
import TodoGet from './todoGet/todoGet'

const TodoMain = () => {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1'>
        <div className='col-span-2'>
        <TodoAddComp />
        </div>
        {/* <div className='col-span-1'>
        <TodoGet />
        </div> */}
    </div>
  )
}

export default TodoMain
