import React, { useEffect, useState } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import styled from "styled-components";

import Admission from "./scenes/Admission/Admission";
import ScreenB from "./scenes/ScreenB/ScreenB";
import LinkTab from "./elements/LinkTab";
import "./Main.css";
import MoodContext from '../state/MoodContext';

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
  const [hasMoodSubmitted, setHasMoodSubmitted] = useState(false);

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
                <LinkTab label="How people feel" to="/" />
                <LinkTab label="How to cope" to="/howtocope" />
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
              <LinkTab label="How people feel" to="/" />
              <LinkTab label="How to cope" to="/howtocope" />
            </Tabs>
          </Toolbar>
        </Header>
      );
    }
  };
  return (
    <div className={classes.main}>
      {displayHeader()}
      <MoodContext.Provider value={hasMoodSubmitted}>
        <Switch>
          <Route exact path="/">
            <Admission onMoodSubmit={setHasMoodSubmitted} />
          </Route>
          <Route path="/howtocope">
            <ScreenB />
          </Route>
        </Switch>
      </MoodContext.Provider>
    </div>
  );
}

export default withRouter(App);
