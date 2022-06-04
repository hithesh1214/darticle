import React from "react";
import { Toolbar, Tabs, Tab, Container } from "@mui/material";
import AddPost from "../components/AddPost";
import Drafts from "../components/Drafts";
import Reviews from "../components/Reviews";

function Stories(props) {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(props.role);
  };
  return (
    <>
      <Toolbar>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value="1"
            label={
              props.role === "super_admin" ? "publish article" : "add article"
            }
          />
          {props.role === "super_admin" ? (
            <Tab value="2" label="review" />
          ) : (
            <Tab value="2" label="drafts" />
          )}
        </Tabs>
      </Toolbar>
      <main>
        <Container maxWidth="lg">
          {value === "1" ? (
            <AddPost role={props.role} />
          ) : props.role === "super_admin" ? (
            <Reviews />
          ) : (
            <Drafts />
          )}
        </Container>
      </main>
    </>
  );
}

export default Stories;
