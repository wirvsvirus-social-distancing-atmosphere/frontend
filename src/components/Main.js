import React, { useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import Admission from "./scenes/Admission/Admission";
import ScreenB from "./scenes/ScreenB/ScreenB";
import LinkTab from "./elements/LinkTab";
import "./Main.css";

const useStyles = makeStyles(theme => ({
  main: {
    overflow: "hidden",
    width: "100%"
  },
  title: {
    justifyContent: "center"
  }
}));

const Header = styled.div`
  background-color: #d7d7d7;
  height: 70px;
  padding: 1em;
  padding-top: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App({ location: { pathname } }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(pathname === "/" ? 0 : 1);
  }, [pathname]);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const displayHeader = () => {
    if (window.innerWidth <= 800) {
      return (
        <>
          <Header style={{ height: "auto" }}>
            <div
              style={{
                backgroundColor: "#d7d7d7",
                fontSize: "16px",
                position: "absolute",
                left: "10px",
                color: "gray"
              }}
            >
              Moodometer
            </div>
          </Header>
          <Header>
            <Toolbar style={{ display: "flex", justifyContent: "center" }}>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="How people feel" href="/" component="a" />
                <LinkTab label="How to cope" href="/howtocope" />
              </Tabs>
            </Toolbar>
          </Header>
        </>
      );
    } else {
      return (
        <Header>
          <div
            style={{
              backgroundColor: "#d7d7d7",
              fontSize: "36px",
              position: "absolute",
              left: "10px",
              color: "gray"
            }}
          >
            Moodometer
          </div>
          <Toolbar style={{ display: "flex", justifyContent: "center" }}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab label="How people feel" href="/" component="a" />
              <LinkTab label="How to cope" href="/howtocope" />
            </Tabs>
          </Toolbar>
        </Header>
      );
    }
  };
  return (
    <div className={classes.main}>
      {displayHeader()}

      <Switch>
        <Route exact path="/">
          <Admission />
        </Route>
        <Route path="/howtocope">
          <ScreenB />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
