import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import User from "./pages/User";
import Setting from "./pages/Setting";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="users/list" element={<UserList />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
