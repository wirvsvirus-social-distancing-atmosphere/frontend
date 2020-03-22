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

import angry from '../../res/angry-regular.svg';
import sad from '../../res/sad-tear-regular.svg';
import happy from '../../res/laugh-beam-regular.svg';
import anxious from '../../res/grimace-regular.svg';
import Fab from "@material-ui/core/Fab";

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

            <Fab
                style={{ margin: '20px', backgroundColor: "green" }}
                size='large'
                color='primary'
            >
                <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${happy})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
            </Fab>
            <Fab
                style={{ margin: '20px', backgroundColor: "orange" }}
                size='large'
                color='primary'
            >
                <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${angry})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
            </Fab>
            <Fab
                style={{ margin: '20px', backgroundColor: "yellow" }}
                size='large'
                color='primary'
            >
                <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${sad})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
            </Fab>
            <Fab
                style={{ margin: '20px', backgroundColor: "blue" }}
                size='large'
                color='primary'
            >
                <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${anxious})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
            </Fab>
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
