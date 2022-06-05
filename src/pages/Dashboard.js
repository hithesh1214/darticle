import * as React from "react";
import { Routes, useNavigate, Route, Navigate } from "react-router-dom";
import { CssBaseline, Container, Toolbar } from "@mui/material";
import { Tab, Tabs, Grid } from "@mui/material";
import Home from "./Home";
import Stories from "./Stories";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import AccountMenu from "../components/AccountMenu";
import { LoginContext } from "../helper/Context";

function Dashboard() {
  const { loginStatus, setLoginStatus } = React.useContext(LoginContext);
  const [value, setValue] = React.useState("1");
  const [role, setRole] = React.useState("");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    axios
      .post("http://localhost:3001/getlevel", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        // console.log(response);
        setRole(response.data[0].level);
        setLoginStatus(true);
      });
  }, []);

  return loginStatus ? (
    <Container maxWidth="lg">
      <CssBaseline />
      <Grid container sx={{ direction: "row", justifyContent: "flex-start" }}>
        <Grid item xs={10}>
          <Toolbar
            sx={{
              // borderBottom: 1,
              borcolor: "divider",
              // justifyContent: "center",
            }}
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab
                icon={<HomeIcon />}
                label="Home"
                value="1"
                onClick={() => {
                  navigate("home");
                }}
              ></Tab>
              {role !== "reader" ? (
                <Tab
                  icon={<ArticleIcon />}
                  label="Stories"
                  value="2"
                  onClick={() => {
                    navigate("stories");
                  }}
                ></Tab>
              ) : (
                <></>
              )}
            </Tabs>
          </Toolbar>
        </Grid>
        <Grid item xs={2}>
          <AccountMenu role={role} />
        </Grid>
      </Grid>
      <main>
        <Container maxWidth="lg">
          <Routes>
            <Route path="home" element={<Home />}></Route>
            <Route path="stories" element={<Stories role={role} />}></Route>
            <Route path="" element={<Home />}></Route>
          </Routes>
        </Container>
      </main>
    </Container>
  ) : (
    <Navigate to="/Signin" />
  );
}
export default Dashboard;
