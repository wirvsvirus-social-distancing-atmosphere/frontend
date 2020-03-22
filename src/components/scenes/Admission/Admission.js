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
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
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

function getStepContent(step) {
    switch (step) {
      case 0:
        return <MoodPanel />;
      case 1:
        return <EmotionPanel />;
      default:
        throw new Error('Unknown step');
    }
  }

function Admission({
    history,
}) {
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(1);

    const handleNext = () => {
        if (activeStep !== 0) {
            history.push({
                pathname: '/screenb',
            });
        } else {
            setActiveStep(activeStep + 1);
        }
    };

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