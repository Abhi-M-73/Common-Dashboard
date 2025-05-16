import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import { getRoutesByRole } from "./utils/constant";
import Home from "./pages/Home";

// ✅ Replace with logic from context or API
const currentUserRole = "admin"; // or "user"

export default function App() {
  const accessibleRoutes = getRoutesByRole(currentUserRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* ✅ Index route */}
          <Route index element={<Home />} />

          {/* 🔁 Render main routes */}
          {accessibleRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* 🔁 Render dropdown routes if any */}
          {accessibleRoutes.flatMap((route) =>
            route.dropDown?.map((subRoute, idx) => (
              <Route
                key={`${subRoute.path}-${idx}`}
                path={subRoute.path}
                element={subRoute.element}
              />
            ))
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
