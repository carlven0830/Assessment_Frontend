import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import MainLayout from "./layouts/mainLayout";
import AuthLayout from "./layouts/authLayout";
import ProjectList from "./pages/project/projectList/projectList";
import ProjectDetail from "./pages/project/projectDetail/projectDetail";
import ProjectForm from "./pages/project/projectForm/projectForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace></Navigate>}
          ></Route>

          <Route element={<MainLayout></MainLayout>}>
            <Route
              path="/project"
              element={<ProjectList></ProjectList>}
            ></Route>
            <Route
              path="/project/:id"
              element={<ProjectDetail></ProjectDetail>}
            ></Route>
            <Route
              path="/project/add"
              element={<ProjectForm></ProjectForm>}
            ></Route>
            <Route
              path="/project/edit/:id"
              element={<ProjectForm></ProjectForm>}
            ></Route>
          </Route>

          <Route element={<AuthLayout></AuthLayout>}>
            <Route path="/login" element={<Login></Login>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
