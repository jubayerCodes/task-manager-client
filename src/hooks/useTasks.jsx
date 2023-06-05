import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const useTasks = () => {

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('https://task-manager-server-virid.vercel.app/tasks')
            return res.data
        }
    })
    return { tasks, refetch };
};

export default useTasks;