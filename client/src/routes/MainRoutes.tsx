import { Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { Auth } from "../pages/Auth/Auth";
import { PrivateRoute } from "./PrivateRoutes";
import { Tasks } from "../pages/Dashboard/components/Tasks";
import { DashBoard } from "../pages/Dashboard/DashBoard";
import { Dash } from "../pages/Dashboard/components/Dash";
import { Projects } from "../pages/Dashboard/components/Projects";
import { Profile } from "../pages/Profile";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      >
        <Route index element={<Dash />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="projects" element={<Projects />} />
      </Route>
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
