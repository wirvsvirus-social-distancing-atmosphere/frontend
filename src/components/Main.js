import React, {useState} from "react";
import {Route, Switch, withRouter, NavLink} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";

import HowPeopleFeel from "./scenes/HowPeopleFeel/HowPeopleFeel";
import HowYouFeel from "./scenes/HowYouFeel/HowYouFeel";
import HowPeopleCope from "./scenes/HowPeopleCope/HowPeopleCope";

import "./Main.css";

import EmotionContext from '../state/EmotionContext';

import emotionCategories from '../utils/constants';

import breakpoints from '../breakpoints';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column-reverse',
        width: "100%",
        [`@media ${breakpoints.tablet}`]: {
            flexDirection: 'column',
            maxHeight: 'unset',
        },
    },
    header: {
        padding: '1em',
        paddingTop: '10px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid #DDDDDD',

        [`@media ${breakpoints.tablet}`]: {
            position: 'relative',
            borderTop: 'none',
        },
    },
    main: {
        maxHeight: "calc(100vh - 120px)",
        overflowY: 'auto',

        [`@media ${breakpoints.tablet}`]: {
            maxHeight: 'unset',
        },
    },
    title: {
        justifyContent: "center",
        fontSize: "30px",
        left: "10px",
        color: "#0f0f0f",
        display: 'none',
        marginRight: '60px',

        [`@media ${breakpoints.tablet}`]: {
            display: 'block',
        },
    },
    navBar: {
        display: "flex",
        height: '100%',
        alignItems: 'end',
        justifyContent: 'center',
        listStyleType: 'none',
    },
    navLink: {
        color: "#0f0f0f",
        fontSize: '20px',
        marginRight: '10px',
        textAlign: 'center',
    },
    active: {
        borderBottom: '2px solid #f44336',
    },
}));

const defaultEmotion = emotionCategories.FEAR;


function App() {
    const classes = useStyles();
    const [selectedEmotion, setSelectedEmotion] = useState(defaultEmotion);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.title}>
                    Moodometer
                </div>

                <div className={classes.navBar}
                    variant="fullWidth"
                    aria-label="nav tabs example"
                >
                    <NavLink className={classes.navLink} exact activeClassName={classes.active} to="/">How people feel</NavLink>
                    <NavLink className={classes.navLink} activeClassName={classes.active} to="/howyoufeel">How you feel</NavLink>
                    <NavLink className={classes.navLink} activeClassName={classes.active} to="/howtocope">How people cope</NavLink>
                </div>
            </div>
            <div className={classes.main}>
                <EmotionContext.Provider value={selectedEmotion}>
                    <Switch>
                        <Route exact path="/">
                            <HowPeopleFeel onEmotionSelect={setSelectedEmotion}/>
                        </Route>
                        <Route path="/howyoufeel">
                            <HowYouFeel onEmotionSelect={ setSelectedEmotion }/>
                        </Route>
                        <Route path="/howtocope">
                            <HowPeopleCope/>
                        </Route>
                    </Switch>
                </EmotionContext.Provider>
            </div>
        </div>
    );
}

export default withRouter(App);
