import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Fearometer from './Fearometer';
import BubbleChart from './BubbleChart';
import firebase from '../../utils/firebase';

const useStyles = makeStyles(theme => ({
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

function MoodPanel() {
    const classes = useStyles();

    const [formValues, setFormValues] = useState({
        what: '',
        likelihood: 0,
        manageability: 0,
        severity: 0,
    });

    const handleInputChange = e => {
        const {name, value} = e.target
        console.log(e)
        setFormValues({...formValues, [name]: value})
    }

    const handleSeverityChange = (_e, newValue) => {
        setFormValues({...formValues, "severity": newValue});
    }
    const handleLikelihoodChange = (_e, newValue) => {
        setFormValues({...formValues, "likelihood": newValue});
    }
    const handleManageabilityChange = (_e, newValue) => {
        setFormValues({...formValues, "manageability": newValue});
    }

    return (
        <>
            <DialogTitle className={classes.row}>Was befürchten Andere?</DialogTitle>
            <BubbleChart />

            <div className={classes.row}>
                <Fearometer />
            </div>

            <form
                className={classes.modalBody}
            >
                <Typography gutterBottom>
                    Was könnte dir passieren?
                </Typography>
                <TextField
                    id="what"
                    placeholder="Z.B. Depression"
                    fullWidth
                    margin="none"
                    name='what'
                    onChange={handleInputChange}
                    value={formValues.what}
                />

                <Typography gutterBottom>
                    Wie schlimm?
                </Typography>
                <Slider
                    name='severity'
                    onChange={handleSeverityChange}
                    value={formValues.severity}
                />

                <Typography gutterBottom>
                    Wie wahrscheinlich?
                </Typography>
                <Slider
                    name='likelihood'
                    onChange={handleLikelihoodChange}
                    value={formValues.likelihood}
                />

                <Typography gutterBottom>
                    Wie kontrollierbar?
                </Typography>
                <Slider
                    name='manageability'
                    onChange={handleManageabilityChange}
                    value={formValues.manageability}
                />
            </form>
        </>
    )
}

export default MoodPanel;