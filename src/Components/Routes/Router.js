import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import AddTask from "../Pages/AddTask";
import CompletedTask from "../Pages/CompletedTask";
import LogIn from "../Pages/LogIn";
import MyTask from "../Pages/MyTask";
import Register from "../Pages/Register";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout></Layout>,
            children: [
                {
                    path: '/addtask',
                    element: <AddTask></AddTask>                    
                },
                {
                    path: '/mytask',
                    element: <MyTask></MyTask>
                },
                {
                    path: '/completedtask', 
                    element: <CompletedTask></CompletedTask>
                },
                {
                    path: '/login', 
                    element: <LogIn></LogIn>
                },
                {
                    path: '/register', 
                    element: <Register></Register>
                },
            ]

        }
    ]

)