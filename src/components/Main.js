import React, { useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import Admission from './scenes/Admission/Admission';
import ScreenB from './scenes/ScreenB/ScreenB';
import LinkTab from './elements/LinkTab';
import './Main.css';

const useStyles = makeStyles(theme => ({
  main: {
    overflow: 'hidden',
    width: '100%'
  },
  title: {
    flexGrow: 1,
  },
}));

function App({
  location: { pathname }
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(pathname === "/" ? 0 : 1);
  }, [pathname]);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.main}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Moodometer
          </Typography>

          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab
              label="How people feel"
              href="/"
              component="a"
            />
            <LinkTab
              label="How to cope"
              href="/screenb"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Admission />
        </Route>
        <Route path="/screenb">
          <ScreenB />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
