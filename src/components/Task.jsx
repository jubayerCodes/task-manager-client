import axios from 'axios';
import React from 'react';
import { FaPenSquare } from "react-icons/fa";
import Swal from 'sweetalert2';
import useTasks from '../hooks/useTasks';

const Task = ({ task, index }) => {
    const { title, description, status, _id } = task
    const { refetch } = useTasks()

    const handleUpdateStatus = (id) => {

        Swal.fire({
            title: 'Update Your Task Status',
            input: 'select',
            inputOptions: {
                'Pending': 'Pending',
                'Not Started': 'Not Started',
                'In Progress': 'In Progress',
                'Completed': 'Completed'
            },
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Update'
        }).then(async (result) => {


            if (result.isConfirmed) {

                const status = { status: result.value }

                const res = await axios.patch(`https://task-manager-server-virid.vercel.app/tasks/${id}`, status)

                const data = res.data

                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Status Updated!',
                        'Your task has been updated.',
                        'success'
                    ).then(() => refetch())
                }
            }
        })

    }

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axios.delete(`https://task-manager-server-virid.vercel.app/tasks/${id}`)

                const data = res.data

                if (data.deletedCount > 0) {

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then(() => refetch())
                }
            }
        })
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
                <button onClick={() => handleUpdateStatus(_id)} className="btn p-0 bg-transparent border-none hover:bg-transparent">
                    <FaPenSquare className='text-[30px] cursor-pointer'></FaPenSquare>
                </button>
                {status}
            </td>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
        </>
    );
};

export default Task;