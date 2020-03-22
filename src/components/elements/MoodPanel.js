import React, {useEffect, useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Fearometer from './Fearometer';
import Histogram from './Histogram';

import firebase from '../../utils/firebase';
import Fab from "@material-ui/core/Fab";
import happy from "../../res/laugh-beam-regular.svg";
import angry from "../../res/angry-regular.svg";
import sad from "../../res/sad-tear-regular.svg";
import anxious from "../../res/grimace-regular.svg";
import map from "../../res/map.png";
import {Paper} from "@material-ui/core";

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

function MoodPanel({handleNext}) {
    const classes = useStyles();

    const [moodValue, setMoodValue] = useState(0);
    const [overallMood, setOverallMood] = useState(0);

    const handleSubmit = () => {
        firebase
            .firestore()
            .collection('mood')
            .doc()
            .set({value: moodValue, time: Date.now()})
            .then(function (docRef) {
                console.log('doc', docRef);
            })
            .catch(function (error) {
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
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", backgroundImage: `url(${map})`, width: "100%", height: "90vh",backgroundSize: "cover",}}>
            <Paper style={{width: "60%", margin: "30px", padding: "20px", backgroundColor: "#f1f1f1"}}>
            <Histogram/>
            </Paper>
            <Paper style={{width: "40%", margin: "30px", padding: "10px", textAlign: "center"}}>
                <div style={{fontSize: "22px"}}>And how do you feel today?</div>
                <div style={{display: "flex", justifyContent: "space-around",margin: "10px"}}>
                    <Fab
                        style={{ backgroundColor: "lightgrey" }}
                        size='large'
                        color='primary'
                        onClick={() => handleNext('joy')}
                    >
                        <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${happy})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
                    </Fab>
                    <Fab
                        style={{  backgroundColor: "lightgrey" }}
                        size='large'
                        color='primary'
                        onClick={() => handleNext('anger')}
                    >
                        <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${angry})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
                    </Fab>
                    <Fab
                        style={{ backgroundColor: "lightgrey" }}
                        size='large'
                        color='primary'
                        onClick={() => handleNext('fear')}
                    >
                        <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${anxious})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
                    </Fab>
                    <Fab
                        style={{ backgroundColor: "lightgrey" }}
                        size='large'
                        color='primary'
                        onClick={() => handleNext('grief')}
                    >
                        <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${sad})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
                    </Fab>
                    
                </div>
            </Paper>

        </div>
    )
}

export default MoodPanel;
