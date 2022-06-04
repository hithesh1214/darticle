import * as React from "react";
import { LoginContext } from "./helper/Context";
import { Routes, Route } from "react-router-dom";
import SingUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TitlePage from "./pages/TitlePage";
import Dashboard from "./pages/Dashboard";
// import Protectedroutes from "./helper/Protectedroutes";

function App() {
  const [loginStatus, setLoginStatus] = React.useState(false);
  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      <Routes>
        <Route exact path="/" element={<TitlePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/dashboard/*" element={<Dashboard />}></Route>
        {/* <Protectedroutes
          path="/dashboard"
          component={Dashboard}
          isAuth={loginStatus}
        ></Protectedroutes> */}
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
