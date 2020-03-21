import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admission from './scenes/Admission/Admission';
import './Main.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Social Atmosphere
          </Typography>

          <Tabs value={value} onChange={handleChange}>
            <Tab href="/" label="Screen A" {...a11yProps(0)} />
            <Tab label="Screen B" {...a11yProps(1)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/">
          <Admission />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
