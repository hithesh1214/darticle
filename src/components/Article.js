import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Article(props) {
  const formatter = (date) => {
    const d = new Date(date);
    return d.toLocaleString("default", { month: "short" }) + " " + d.getDate();
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
      <CardActions></CardActions>
    </Card>
  );
}

export default Article;
