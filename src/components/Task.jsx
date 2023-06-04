import React from 'react';
import { FaPenSquare } from "react-icons/fa";

const Task = ({ task, index }) => {
    const { title, description, status } = task

    const handleUpdateStatus = (id) =>{
        console.log(id);
    }

    return (
        <>
            <th>
                <label>
                    {index + 1}
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{title}</div>
                    </div>
                </div>
            </td>
            <td>
                {description}
            </td>
            <td className="w-[200px] flex items-center justify-start gap-5">
                <button onClick={()=> handleUpdateStatus(title)} className="btn p-0 bg-transparent border-none hover:bg-transparent">
                    <FaPenSquare className='text-[30px] cursor-pointer'></FaPenSquare>
                </button>
                {status}
            </td>
            <th>
                <button className="btn btn-circle btn-outline btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
        </>
    );
};

export default Task;