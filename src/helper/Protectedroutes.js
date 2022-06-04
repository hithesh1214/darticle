// import { useContext } from "react";
// // import { useLocation,Navigate,Outlet } from "react-router-dom";
// import { LoginContext } from "./Context";

// const Protectedroutes = () => {
//   return useContext(LoginContext);
// }
// export default Protectedroutes;
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "./Context";
function Protectedroutes({ isAuth: isAuth, component: Component, ...rest }) {
  // const { loginStatus, setLoginStatus } = React.useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Outlet />;
        } else {
          return <Navigate to="/" />;
        }
      }}
    />
  );
}

export default Protectedroutes;
