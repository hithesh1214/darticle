import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountMenu(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setnotifications] = React.useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // async function logout(event) {
  //   event.preventDefault();

  //   try {
  //     const respone = await axios.get("http");
  //     navigate("/");
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // }
  const logout = () => {
    axios.get("http://localhost:3001/logout").then((response) => {
      console.log(response);
      navigate("/");
    });
  };
  React.useEffect(() => {
    axios
      .post("http://localhost:3001/notifications", {
        headers: { "x-access-token": localStorage.getItem("token") },
        role: props.role,
      })
      .then((response) => {
        // console.log(response.data[0].cnt);
        setnotifications(response.data[0].cnt);
      });
  }, []);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mt: 1, ml: 14 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Badge
              badgeContent={props.role === "super_admin" ? notifications : 0}
              color="primary"
            >
              <Avatar />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
