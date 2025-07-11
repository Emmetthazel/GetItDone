import React from 'react'
import { FaTrash, FaClock, FaCheckCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const TodoItems = ({text, id, completed, deleteTask, completeTask, openEditModal}) => {
  return (
    <div className='border-b border-gray-300 p-1.5 flex items-center'>
        <div onClick={() => completeTask(id)} className='flex flex-1 items-center cursor-pointer'>
            {completed ? <FaCheckCircle className='text-green-600 mr-2 transition-transform duration-300 hover:scale-110 focus:scale-110' /> : <FaClock className='text-pink-800 mr-2 transition-transform duration-300 hover:scale-110 focus:scale-110' />}
            <span className={`${completed ? 'text-gray-400' : 'text-gray-600'} pl-2`} style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
        </div>
        <CiEdit onClick={() => openEditModal(id, text)} className='text-blue-600 cursor-pointer transition-transform duration-300 hover:scale-110 focus:scale-110 mr-2' />
        <FaTrash onClick={() => deleteTask(id)} className='text-red-600 cursor-pointer transition-transform duration-300 hover:scale-110 focus:scale-110' />
    </div>
  )
}

export default TodoItems
