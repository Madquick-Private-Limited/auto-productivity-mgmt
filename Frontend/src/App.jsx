import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/CombineLayout/Layout.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ViewTeamMembers from "./pages/Team/ViewTeamMembers.jsx";
import AddTeamPage from "./pages/Team/AddTeamPage.jsx";
import RoleBasedAccess from "./RoleBase/RoleBaseAccess.jsx";
import ProjectTable from "./pages/Project/ProjectTable.jsx";
import AddProject from "./pages/Project/AddProject.jsx";
import AssingProject from "./pages/Project/AssingProject.jsx";
import AssignTask from "./pages/Task/AssignTask.jsx";
import ViewTasks from "./pages/Task/ViewTasks.jsx";

const App = () => {
  const authToken = true;

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/management"
        element={authToken ? <Layout /> : <Navigate to="/" />}
      >
        <Route
          path="add-team"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <AddTeamPage />
            </RoleBasedAccess>
          }
        />
        <Route
          path="view-team"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <ViewTeamMembers />{" "}
            </RoleBasedAccess>
          }
        />
        <Route
          path="view-projects"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <ProjectTable />{" "}
            </RoleBasedAccess>
          }
        />
        <Route
          path="add-projects"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <AddProject />{" "}
            </RoleBasedAccess>
          }
        />
        <Route
          path="assign-projects"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <AssingProject />{" "}
            </RoleBasedAccess>
          }
        />
        <Route
          path="assign-task"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <AssignTask />{" "}
            </RoleBasedAccess>
          }
        />
        <Route
          path="view-tasks"
          element={
            <RoleBasedAccess allowedRoles={["Admin", "TeamMember"]}>
              <ViewTasks />{" "}
            </RoleBasedAccess>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
