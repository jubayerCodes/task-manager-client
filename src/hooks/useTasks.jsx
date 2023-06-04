import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const useTasks = () => {

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/tasks')
            return res.data
        }
    })
    return {tasks, refetch};
};

export default useTasks;