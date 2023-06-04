import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const useTasks = () => {

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('/tasks.json')
            return res.data
        }
    })
    return {tasks, refetch};
};

export default useTasks;