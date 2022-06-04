import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Checkbox } from "@mui/material";
import { FormGroup, FormControlLabel } from "@mui/material";
import axios from "axios";
import { Dialog, TextField, DialogContent, DialogActions } from "@mui/material";

function Article(props) {
  const [approveChecked, setApproveChecked] = React.useState(false);
  const [disapproveChecked, setDisapproveChecked] = React.useState(false);
  const [remarks, setRemarks] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (remarks === "") {
      setDisapproveChecked(false);
    }
    setOpen(false);
  };
  const formatter = (date) => {
    const d = new Date(date);
    return d.toLocaleString("default", { month: "short" }) + " " + d.getDate();
  };
  const submitReview = (id) => {
    axios
      .post(`http://localhost:3001/remarks/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        remarks: remarks,
      })
      .then((response) => {
        console.log(response);
        handleClose();
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={approveChecked}
                onChange={(e) => {
                  setApproveChecked(e.target.value);
                  submitReview(props.num);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            disabled={disapproveChecked ? true : false}
            label="Approve"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={disapproveChecked}
                onChange={(e) => {
                  setDisapproveChecked(e.target.value);
                  handleClickOpen();
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            disabled={approveChecked ? true : false}
            label="Disapprove"
          />
        </FormGroup>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ width: 500, height: 200 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                fullWidth
                multiline
                value={remarks}
                rows={5}
                variant="filled"
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submitReview(props.num)}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Article;
