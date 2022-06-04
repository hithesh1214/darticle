import React from "react";
import { Paper, Grid, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

function AddPost(props) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const addDraft = () => {
    axios
      .post("http://localhost:3001/addDraft", {
        headers: { "x-access-token": localStorage.getItem("token") },
        title: title,
        content: content,
        role: props.role,
      })
      .then((response) => {
        console.log(response);
        setTitle("");
        setContent("");
      });
  };

  return (
    <Paper sx={{ pl: 4, pr: 4, pt: 2 }}>
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
            rows={5}
            variant="filled"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              endIcon={<SendIcon />}
              onClick={addDraft}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddPost;
