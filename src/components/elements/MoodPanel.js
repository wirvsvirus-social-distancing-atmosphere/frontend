import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Fearometer from './Fearometer';
import Histogram from './Histogram';

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

    const [moodValue, setMoodValue] = useState(0);
    const [overallMood, setOverallMood] = useState(0);

    const handleSubmit = () => {
        firebase
            .firestore()
            .collection('mood')
            .doc()
            .set({ value: moodValue, time: Date.now()})
            .then(function(docRef) {
                console.log('doc', docRef);
            })
            .catch(function(error) {
            console.error('Error adding document: ', error);
            });
    };

    useEffect(() => {
        firebase
            .firestore()
            .collection('mood')
            .get()
            .then(function (querySnapshot) {
                let resultArray = [];
                querySnapshot.forEach(function (doc) {
                    resultArray.push(doc.data());
                });
                setOverallMood(42);
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error);
            });
    }, []);

    return (
        <>
            <DialogTitle className={classes.row}>Wie geht es dir heute?</DialogTitle>
            <div className={classes.row}>
                <Fearometer currentValue={overallMood}/>
                <div>
                    <Typography gutterBottom>
                        Deine Stimmung
                    </Typography>
                    <Slider
                        name='manageability'
                        onChange={ (_e, newValue) => {
                            setMoodValue(newValue);
                        }}
                        value={moodValue}
                    />
                    <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSubmit}
                    >
                        Abschicken
                    </Button>
            </div>
                </div>
            </div>
            <Histogram />
        </>
    )
}

export default MoodPanel;