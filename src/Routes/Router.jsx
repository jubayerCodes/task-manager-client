import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    }
])