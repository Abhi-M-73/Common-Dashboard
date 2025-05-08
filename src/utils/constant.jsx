import { FiSettings, FiUser } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import User from "../pages/User";
import UserList from "../pages/UserList";
import AddUser from "../pages/AddUser";

export const routes = [
    {
        path: "",
        name: "Home",
        icon: <FaHome />,
        element: <Home />,
        dropDown: []
    },
    {
        path: "users",
        name: "Users",
        icon: <FiUser />,
        element: <User />,
        dropDown: [
            {
                path: "users/list", // ✅ Full path dena padega
                name: "User List",
                element: <UserList />,
            },
            {
                path: "users/add",
                name: "Add User",
                element: <AddUser />,
            }
        ]
    },
    {
        path: "settings",
        name: "Settings",
        icon: <FiSettings />,
        element: <Setting />,
        dropDown: []
    },
];
