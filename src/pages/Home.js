import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Article from "../components/Article";

function Home() {
  const [articles, setarticles] = React.useState([]);
  React.useEffect(() => {
    axios
      .post("http://localhost:3001/getarticles", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        // console.log(response.data[0]);
        setarticles(response.data);
      });
  }, []);
  return (
    <Grid container spacing={4} sx={{ pt: 4, pl: 6, pr: 6 }}>
      {articles.map((row, index) => (
        <Grid item xs={12}>
          <Article
            title={row.title}
            content={row.content}
            date={row.date}
            author={row.firstName + row.lastName}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
