import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SecQues } from "../components/info";
import Axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [usernameReg, setUsernameReg] = React.useState("");
  const [passwordReg, setPasswordReg] = React.useState("");
  const [ques, setques] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [level, setLevel] = React.useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      firstName: firstName,
      lastName: lastName,
      username: usernameReg,
      password: passwordReg,
      secques: ques,
      secans: answer,
      level: level,
    }).then((response) => {
      if (response) {
        console.log(response);
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                value={usernameReg}
                onChange={(event) => {
                  setUsernameReg(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="new-password"
                value={passwordReg}
                onChange={(event) => {
                  setPasswordReg(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Select your security question</Typography>
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={ques}
                onChange={(event) => {
                  setques(event.target.value);
                }}
              >
                {SecQues.map((item) => (
                  <MenuItem value={item.label}>{item.value}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Answer"
                fullWidth
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Level of user"
                fullWidth
                value={level}
                onChange={(event) => {
                  setLevel(event.target.value);
                }}
              >
                <MenuItem value="super_admin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="reader">Reader</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={register}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
