import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

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
    marginBottom: {
        marginBottom: 20
    },
    selected: {
        backgroundColor: 'cornflowerblue'
    },
    unselected: {
        backgroundColor: 'lightgrey'
    },
    modalBody: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    what: {
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'lightblue',
        fontWeight: 'bold'
    }
}));

const moods = {
    'joy': happy,
    'anger': angry,
    'fear': anxious,
    'grief': sad
};

function MoodPanel({
    history,
    mood = 'joy',
}) {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);
    const [selectedMood, setSelectedMood] = useState(mood);
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

    const handleOpenModal = () => {
        if (formValues.what !== '') {
            firebase
                .firestore()
                .collection('emotions')
                .doc()
                .set({
                    category: selectedMood,
                    emotion: formValues.what,
                    value: formValues.severity,
                    time: Date.now()})
                .then(function(docRef) {
                    console.log('doc', docRef);
                })
                .catch(function(error) {
                console.error('Error adding document: ', error);
                });
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleNext = () => {
        history.push({
            pathname: '/screenb',
            state: { emotion: formValues.what }
        });
    }

    return (
        <>
            <DialogTitle className={classes.row}>How is your mood?</DialogTitle>
            <div className={classes.row}>
                {
                    Object.keys(moods).map(item => {
                        return (<Fab
                            key={item}
                            className={selectedMood === item ? classes.selected : classes.unselected}
                            style={{ margin: '20px'}}
                            size='large'
                            color='primary'
                            onClick={() => setSelectedMood(item)}
                            component='div'
                        >
                            <div style={{backgroundSize: "contain", height: "50px", width: "50px", backgroundImage: `url(${moods[item]})`, backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
                        </Fab>)
                    })
                }
            </div>

            <form>
                <Typography align={'center'}>
                    What could happen?
                </Typography>
                <TextField
                    id="what"
                    placeholder="z.B. Depression"
                    fullWidth
                    margin="none"
                    name='what'
                    onChange={handleInputChange}
                    value={formValues.what}
                    className={classes.marginBottom}
                />

                <Typography align={'center'}>
                    How intense is that emotion?
                </Typography>
                <Slider
                    name='severity'
                    onChange={handleSeverityChange}
                    value={formValues.severity}
                />
                <div className={classes.row}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleOpenModal}
                    >
                        Communicate
                    </Button>
                </div>
                
            </form>

            <DialogTitle className={classes.row}>What are {selectedMood}s of others?</DialogTitle>

            <div className={classes.row}>
                <Fearometer />
                <BubbleChart />
            </div>
            <Modal
                className={classes.row}
                open={openModal}
                onClose={handleCloseModal}
            >
                <div className={classes.modalBody}>
                    <div>
                        Would you like to learn how others coped with {selectedMood} similar to
                    </div>
                    <div className={classes.what}>
                        {formValues.what}
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={handleCloseModal}
                        >
                            No, thanks
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleNext}
                        >
                            Sure
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withRouter(MoodPanel);
