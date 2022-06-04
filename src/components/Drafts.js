import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Draft from "./Draft";
function Drafts() {
  const [drafts, setdrafts] = React.useState([]);
  React.useEffect(() => {
    axios
      .post("http://localhost:3001/drafts", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        // console.log(response.data[0].id);
        setdrafts(response.data);
      });
  }, []);

  return (
    <Grid container spacing={4} sx={{ p: 2 }}>
      {drafts.map((row, index) => (
        <Grid item xs={8}>
          <Draft
            title={row.title}
            content={row.content}
            date={row.date}
            author={row.firstName + " " + row.lastName}
            status={row.status}
            num={row.id}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Drafts;
