import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";

import Fearometer from '../../elements/Fearometer';
import firebase from '../../utils/firebase';

function MoodPanel() {
    const [moodValue, setMoodValue] = useState(0);
    const [overallMood, setOverallMood] = useState();

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
                setOverallMood(resultArray);
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error);
            });
    }, []);

    return (
        <>
            <Typography gutterBottom>
                Wie geht es dir heute?
            </Typography>
            <Slider
                name='manageability'
                onChange={ (_e, newValue) => {
                    setMoodValue(newValue);
                }}
                value={moodValue}
            />

            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSubmit}
            >
                Abschicken
            </Button>

            <Fearometer currentValue={overallMood}/>
        </>
    )
}

export default MoodPanel;