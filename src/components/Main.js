import React, {useEffect, useState} from "react";
import {Route, Switch, withRouter, NavLink, Link} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

import HowPeopleFeel from "./scenes/HowPeopleFeel/HowPeopleFeel";
import HowYouFeel from "./scenes/HowYouFeel/HowYouFeel";
import HowPeopleCope from "./scenes/HowPeopleCope/HowPeopleCope";
import ScreenB from "./scenes/ScreenB/ScreenB";
import Admission from "./scenes/Admission/Admission";
import LinkTab from "./elements/LinkTab";

import "./Main.css";

import MoodContext from '../state/MoodContext';
import EmotionContext from '../state/EmotionContext';

import emotionCategories from '../utils/constants';

import breakpoints from '../breakpoints';

const useStyles = makeStyles(theme => ({
    header: {
        height: '60px',
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
        display: 'flex',
        flexDirection: 'column-reverse',
        overflow: "hidden",
        width: "100%",
        maxHeight: "calc(100vh - 70px)",

        [`@media ${breakpoints.tablet}`]: {
            flexDirection: 'column',
            maxHeight: 'unset',
        },
    },
    title: {
        justifyContent: "center",
        fontSize: "20px",
        left: "10px",
        color: "#607d8b",
        display: 'none',
        margin: '60px',

        [`@media ${breakpoints.tablet}`]: {
            display: 'block',
        },
    },
    navBar: {
        display: "flex",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        listStyleType: 'none',
    },
    navLink: {
        color: '#666',
        padding: '10px',
    },
    active: {
        backgroundColor: '#2196f3',
        color: 'white',
    },
}));

const defaultEmotion = emotionCategories.FEAR;


function App() {
    const classes = useStyles();
    const [hasMoodSubmitted, setHasMoodSubmitted] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(defaultEmotion);

    return (
        <div className={classes.main}>
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
            <EmotionContext.Provider value={selectedEmotion}>
                    <MoodContext.Provider value={hasMoodSubmitted}>
                        <Switch>
                            <Route exact path="/">
                                <HowPeopleFeel onMoodSubmit={setHasMoodSubmitted} onEmotionSelect={setSelectedEmotion}/>
                            </Route>
                            <Route path="/howyoufeel">
                                <HowYouFeel onEmotionSelect={ setSelectedEmotion }/>
                            </Route>
                            <Route path="/howtocope">
                                <HowPeopleCope/>
                            </Route>
                        </Switch>
                    </MoodContext.Provider>
            </EmotionContext.Provider>
        </div>
    );
}

export default withRouter(App);
