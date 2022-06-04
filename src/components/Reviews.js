import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Review from "./Review";
function Reviews() {
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    axios
      .post("http://localhost:3001/review", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
        console.log("hello reviews");
      });
  }, []);

  return (
    <Grid container spacing={4} sx={{ p: 2 }}>
      {reviews.map((row, index) => (
        <Grid item xs={8}>
          <Review
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

export default Reviews;
