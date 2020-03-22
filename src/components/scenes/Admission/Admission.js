import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import MoodPanel from '../../elements/MoodPanel';
import EmotionPanel from '../../elements/EmotionPanel';

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),

      },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function Admission({
    history,
}) {
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedMood, setSelectedMood] = useState();

    const handleNext = (mood) => {
        setSelectedMood(mood);
        setActiveStep(1);
    };

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return <MoodPanel handleNext={ handleNext }/>;
          case 1:
            return <EmotionPanel mood={selectedMood}/>;
          default:
            throw new Error('Unknown step');
        }
      }

    return (
        <>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        {getStepContent(activeStep)}
                    </React.Fragment>

                </Paper>
            </main>
        </>

    );
}

export default withRouter(Admission);
