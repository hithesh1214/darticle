import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid } from "@mui/material";
import axios from "axios";
import { Dialog, TextField, DialogContent, DialogActions } from "@mui/material";

function Draft(props) {
  const [title, setTitle] = React.useState(props.title);
  const [content, setContent] = React.useState(props.content);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const editDraft = (id) => {
    axios
      .post(`http://localhost:3001/editDraft/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        title: title,
        content: content,
      })
      .then((response) => {
        console.log(response);
        handleClose();
      });
  };
  const formatter = (date) => {
    const d = new Date(date);
    return d.toLocaleString("default", { month: "short" }) + " " + d.getDate();
  };
  const statussetter = (status) => {
    if (status === "draft") {
      return "Under Review";
    } else if (status === "published") {
      return "Published";
    } else {
      return "UnPublished";
    }
  };
  const severitysetter = (status) => {
    if (status === "draft") {
      return "info";
    } else if (status === "published") {
      return "success";
    } else {
      return "error";
    }
  };

  const del = (id) => {
    axios
      .post(`http://localhost:3001/deleteDraft/${id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.author}-{formatter(props.date)}
        </Typography>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={(e) => {
            console.log(e.target);
            handleClickOpen();
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={(e) => {
            del(props.num);
          }}
        >
          delete
        </Button>
        <Alert severity={severitysetter(props.status)} sx={{ ml: 40 }}>
          {statussetter(props.status)}
        </Alert>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ width: 600, height: 375 }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                fullWidth
                value={title}
                label="Title"
                variant="filled"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                fullWidth
                multiline
                value={content}
                rows={9}
                variant="filled"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={editDraft(props.num)}>Update</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Draft;
