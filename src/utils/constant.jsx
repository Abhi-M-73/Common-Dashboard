import { FaHome } from "react-icons/fa";
import { FiSettings, FiUser, FiUsers } from "react-icons/fi";
import Home from "../pages/Home";
import User from "../pages/User";
import UserList from "../pages/UserList";
import AddUser from "../pages/AddUser";
import Setting from "../pages/Setting";

// Your existing routes
export const routes = [
    {
        path: "",
        name: "Home",
        icon: <FaHome />,
        element: <Home />,
        roles: ["admin", "user"],
        dropDown: []
    },
    {
        path: "users",
        name: "Users",
        icon: <FiUser />,
        element: <User />,
        roles: ["admin"],
        dropDown: [
            {
                path: "users/list",
                name: "User List",
                element: <UserList />,
                roles: ["admin"],
            },
            {
                path: "users/add",
                name: "Add User",
                element: <AddUser />,
                roles: ["admin"],
            }
        ]
    },
    {
        path: "settings",
        name: "Settings",
        icon: <FiSettings />,
        element: <Setting />,
        roles: ["admin", "user"],
        dropDown: []
    }
];

// ✅ Function to return filtered routes based on role
export const getRoutesByRole = (role) => {
    return routes
        .filter(route => route.roles.includes(role))
        .map(route => ({
            ...route,
            dropDown: route.dropDown?.filter(sub => sub.roles.includes(role)) || []
        }));
};
  