import * as React from "react";
import { LoginContext } from "../helper/Context";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

function SignIn() {
  const { loginStatus, setLoginStatus } = React.useContext(LoginContext);
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [secques, setSecques] = React.useState("");
  const [ans, setAns] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/secans", {
        headers: { "x-access-token": localStorage.getItem("token") },
        secans: ans,
      })
      .then((response) => {
        console.log(response);
        if (loginStatus && response.auth) {
          console.log("bye");
        } else {
          console.log("hello");
          navigate("/dashboard");
          setOpen(false);
        }
      });
  };
  axios.defaults.withCredentials = true;
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // console.log(LoginContext);
        // console.log(response.data);
        if (response.data.auth) {
          localStorage.setItem("token", response.data.token);
          setSecques(response.data.result[0].secques);
          setLoginStatus(true);
          handleClickOpen();
        } else {
          setLoginStatus(false);
        }
      });
  };

  // const userAuthenticated = () => {
  //   axios
  //     .get("http://localhost:3001/auth", {
  //       headers: { "x-access-token": localStorage.getItem("token") },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };
  // React.useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     console.log(response);
  //   });
  // }, []);
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={login}
          >
            Sign In
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Answer the security question</DialogTitle>
            <DialogContent>
              <DialogContentText>{secques}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="answer"
                type="text"
                fullWidth
                value={ans}
                onChange={(event) => {
                  setAns(event.target.value);
                }}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default SignIn;
