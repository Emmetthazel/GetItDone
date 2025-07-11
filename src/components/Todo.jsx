import React, { useEffect, useRef, useState } from 'react'
import { IoMdAddCircle   } from "react-icons/io";
import { FaTrash, FaMapPin, FaClock, FaCheckCircle } from "react-icons/fa";
import TodoItems from './TodoItems';

const Todo = () => {

    const inputRef = useRef(null);
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedText, setEditedText] = useState('');


    const addTask = (e) => {

        if (e) e.preventDefault();

        const inputText = inputRef.current.value.trim();
        
        if (inputText) {
            const newTask = {
                id: Date.now(),
                text: inputText,
                completed: false
            };
            setTasks([...tasks, newTask]);
            inputRef.current.value = '';
            inputRef.current.focus();
            setErrorMessage('');
            
        } else {
            setErrorMessage("Please enter a task.");
            inputRef.current.focus();
        }
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    }

    const completeTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    const openEditModal = (id, currentText) => {
        setEditingTaskId(id);
        setEditedText(currentText);
        setIsModalOpen(true);
    };

    const saveEditedTask = () => {
        if (editedText.trim()) {
            const updatedTasks = tasks.map((task) =>
                task.id === editingTaskId ? { ...task, text: editedText.trim() } : task
            );
            setTasks(updatedTasks);
        }
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTaskId(null);
        setEditedText('');
    };


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md w-120 max-w-md flex flex-col min-h-[550px]'>
      
        <div className='place-items-center justify-between mb-4'>
            <div className="flex justify-center mb-2 transition-transform duration-300 hover:scale-110 focus:scale-110">
                <h1 className="text-5xl font-bold text-pink-800">To</h1>
                <h1 className="text-5xl font-bold text-indigo-600">Do</h1>
            </div>
            <h1 className='text-gray-600 text-base font-medium mb-6 text-center'>Organize Your Tasks</h1>
        </div>

        <form onSubmit={addTask} className='grid gap-1 items-center mb-8'>
            <div className='relative flex text-gray-700 items-center'>
                <FaMapPin className='absolute right-3 top-1/2 transform -translate-y-1/2' />
                <input ref={inputRef} type="text" onChange={() => setErrorMessage('')} className='border border-gray-400 p-1 rounded-lg w-full pl-3 pt-0.5' placeholder='Type your task' />
            </div>

            {errorMessage && (
                <p className='text-red-600 text-sm mt-1'>{errorMessage}</p>
            )}

            <button type="submit" className="bg-indigo-500 text-white p-1 pt-0.5 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:bg-indigo-800 hover:scale-103 focus:bg-indigo-800 focus:scale-103">
                <IoMdAddCircle className=' inline-block mr-1 mb-0.5' />
                Add
            </button>
        </form>

        <h1 className='flex text-gray-600 text-base font-medium justify-center'>Total Tasks: <div className='text-indigo-500 font-bold pl-1'>{tasks.length}</div></h1>
        <div className='flex flex-1 justify-between items-center mb-8 ml-2 mr-2'>
            <h1 className='flex text-gray-600 text-base font-medium'>Completed Tasks: <div className='text-green-500 font-bold pl-1'>{tasks.filter(task => task.completed).length}</div></h1>
            <h1 className='flex text-gray-600 text-base font-medium'>Pending Tasks: <div className='text-pink-800 font-bold pl-1'>{tasks.filter(task => !task.completed).length}</div></h1>
        </div>

        <div className='border border-gray-300 rounded-lg shadow-md'>
            {tasks.map((item, index) => {
                return (
                    <TodoItems key={index} text={item.text} id={item.id} completed={item.completed} deleteTask={deleteTask} completeTask={completeTask} openEditModal={openEditModal} />
                )
            })}
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-gradient-to-r from-indigo-600 to-pink-800 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">Edit Task !</h2>
                    <input type="text" className="w-full border p-1.5 rounded mb-4" value={editedText} onChange={(e) => setEditedText(e.target.value)} autoFocus />
                    
                    <div className="flex justify-end gap-2">
                        <button onClick={closeModal} className="bg-pink-800 text-white px-4 py-1 rounded hover:bg-pink-700">
                            Cancel
                        </button>
                        <button onClick={saveEditedTask} className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-800">
                            Save
                        </button>
                    </div>

                </div>
            </div>
        )}

    
    </div>
  )
}

export default Todo
