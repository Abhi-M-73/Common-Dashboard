import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 h-screen overflow-auto">
                <Outlet /> 
            </div>
        </div>
    );
}
