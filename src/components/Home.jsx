import React from 'react';
import useTasks from '../hooks/useTasks';
import Task from './task';

const Home = () => {

    const { tasks } = useTasks()

    console.log(tasks);


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
                        {/* TODO: Replace idx by _id */}
                        {
                            tasks?.map((task, idx) => <tr key={task._id}><Task task={task} index={idx}></Task></tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Home;