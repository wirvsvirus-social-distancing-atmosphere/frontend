import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import EmotionPanel from '../../elements/EmotionPanel';

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        background: '#eee',      },
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

function HowYouFeel({
    onEmotionSelect
}) {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <EmotionPanel onEmotionSelect={ onEmotionSelect } />
                </Paper>
            </main>
        </>
    );
}

export default HowYouFeel;