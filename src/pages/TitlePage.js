import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

function TitlePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Blog
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            navigate("signup");
          }}
        >
          Sign up
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            navigate("signin");
          }}
        >
          Sign in
        </Button>
      </Toolbar>
      <main>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${mainFeaturedPost.image})`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none" }}
              src={mainFeaturedPost.image}
              alt={mainFeaturedPost.imageText}
            />
          }
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {mainFeaturedPost.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {mainFeaturedPost.description}
                </Typography>
                <Link variant="subtitle1" href="#">
                  {mainFeaturedPost.linkText}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}>
          {featuredPosts.map((post) => (
            // <FeaturedPost key={post.title} post={post} />
            <Grid item xs={12} md={6}>
              <CardActionArea component="a" href="#">
                <Card sx={{ display: "flex" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {post.date}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                    image={post.image}
                    alt={post.imageLabel}
                  />
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </main>
    </Container>
  );
}
export default TitlePage;
