import React from 'react';
import useTasks from '../../hooks/useTasks';
import Task from '../../components/Task';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
    const {refetch} = useTasks()

    const required = {}

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {

        const task = data

        const res = await axios.post('http://localhost:5000/tasks', task)

        console.log(res.data);

        if (res.data.insertedId) {
            Swal.fire(
                'Yay...',
                'Your task added successfully',
                'success'
            ).then(() => refetch())
        }
        reset()
        window.my_modal_1.close()
    };

    const { tasks } = useTasks()

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
                            tasks?.map((task, idx) => <tr key={task._id}><Task task={task} index={idx}></Task></tr>)
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
                                        <span className="label-text">Description</span>
                                        <textarea name="description" id="desc-input" className="textarea input-bordered w-full" cols="30" rows="3" placeholder='Task Description' {...register("description")} required></textarea>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-neutral" type='submit'>Add Task</button>
                                <button className="btn" type='button' onClick={() => window.my_modal_1.close()}>Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            </dialog>
        </section>
    );
};

export default Home;