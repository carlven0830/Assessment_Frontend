import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <div className="authContent">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default AuthLayout;
