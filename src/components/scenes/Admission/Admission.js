import React from 'react';
import { withRouter } from 'react-router-dom';
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
    onMoodSubmit,
    onEmotionSelect
}) {
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(1);
    };

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return <MoodPanel
              handleNext={ handleNext }
              onMoodSubmit={ onMoodSubmit }
              onEmotionSelect={ onEmotionSelect }
            />;
          case 1:
            return <EmotionPanel onEmotionSelect={ onEmotionSelect } />;
          default:
            throw new Error('Unknown step');
        }
      }

    return (
        <>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    {getStepContent(activeStep)}
                </Paper>
            </main>
        </>
    );
}

export default withRouter(Admission);