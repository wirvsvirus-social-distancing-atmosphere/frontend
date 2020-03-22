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

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep !== 0) {
            history.push({
                pathname: '/screenb',
            });
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} className={classes.button}>
                                Zurück
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === 1 ? 'Beitragen' : 'Weiter'}
                        </Button>
                        </div>
                    </React.Fragment>

                </Paper>
            </main>
        </>

    );
}

export default withRouter(Admission);
