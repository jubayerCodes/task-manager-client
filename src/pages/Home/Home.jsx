import React, { useEffect, useState } from 'react';
import useTasks from '../../hooks/useTasks';
import Task from '../../components/Task';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
    const { tasks, completedTasks, InCompletedTasks, refetch } = useTasks()

    const [limit, setLimit] = useState(false)

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {

        const task = data

        if (data?.description?.split(' ').length > 30) {

            setLimit(true)

            return
        }

        const res = await axios.post('https://task-manager-server-virid.vercel.app/tasks', task)

        if (res.data.insertedId) {
            Swal.fire(
                'Yay...',
                'Your task added successfully',
                'success'
            ).then(() => {
                refetch()
                setLimit(false)
            })
        }
        reset()
        window.my_modal_1.close()
    };

    const handleClose = () => {
        window.my_modal_1.close()
        reset()
        setLimit(false)
    }



    return (
        <section className='max-w-[1200px] mx-auto my-28'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    No.
                                </label>
                            </th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            completedTasks?.map((task, idx) => <tr key={task._id}><Task task={task} index={idx}></Task></tr>)
                        }

                        {
                            InCompletedTasks?.map((task, idx) => <tr key={task._id}><Task task={task} index={idx}></Task></tr>)
                        }
                    </tbody>
                </table>
            </div>


            {/* Open the modal using ID.showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Add Task</h3>
                    <div className='mt-4'>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-grp">
                                <div className="form-control w-full">
                                    <label htmlFor='title-input' className="label flex-col items-start gap-3">
                                        <span className="label-text">Title</span>
                                        <input name='title' type="text" placeholder="Task Title" className="input input-bordered w-full" id='title-input' {...register("title")} required />
                                    </label>
                                </div>
                            </div>
                            <div className="input-grp">
                                <div className="form-control w-full">
                                    <label htmlFor='status-input' className="label flex-col items-start gap-3">
                                        <span className="label-text">Status</span>
                                        <select name="status" id="status-input" className="input input-bordered w-full" {...register("status", { required: true })} defaultValue={'Pending'}>
                                            <option value="Pending">Pending</option>
                                            <option value="Not Started">Not Started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="input-grp">
                                <div className="form-control w-full">
                                    <label htmlFor='desc-input' className="label flex-col items-start gap-3">
                                        <span className="label-text">Description ( 30 words )</span>
                                        <textarea name="description" id="desc-input" className="textarea input-bordered w-full" cols="30" rows="3" placeholder='Task Description' {...register("description")} required></textarea>
                                        {limit && <span className='text-red-600'>* Your description should be in 30 words</span>}
                                    </label>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-neutral" type='submit'>Add Task</button>
                                <button className="btn" type='button' onClick={handleClose}>Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            </dialog>
        </section>
    );
};

export default Home;