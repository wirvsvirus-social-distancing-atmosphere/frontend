import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import MoodPanel from '../../elements/MoodPanel';

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

function HowPeopleFeel({
    onMoodSubmit,
    onEmotionSelect
}) {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <MoodPanel
                        onMoodSubmit={ onMoodSubmit }
                        onEmotionSelect={ onEmotionSelect }
                    />
                </Paper>
            </main>
        </>
    );
}

export default HowPeopleFeel;