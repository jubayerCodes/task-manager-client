import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useTasks = () => {


    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('https://task-manager-server-virid.vercel.app/tasks')
            return res.data
        }
    })

    const completedTasks = tasks.filter(task => task.status === 'Completed')
    const InCompletedTasks = tasks.filter(task => task.status !== 'Completed')

    return { tasks, completedTasks, InCompletedTasks, refetch };
};

export default useTasks;