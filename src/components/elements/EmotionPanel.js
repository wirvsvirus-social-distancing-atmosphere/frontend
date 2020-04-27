import React, {useContext, useEffect, useState} from "react";
import {withRouter} from "react-router-dom";

import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {makeStyles} from "@material-ui/core/styles";
import {Typography, TextField, Modal, Grid, Fab, Paper} from "@material-ui/core";

import Fearometer from "./Fearometer";
import WordCloud from "./WordCloud";
import firebase from "../../utils/firebase";
import emotionCategories from '../../utils/constants';

import LocationContext from '../../state/LocationContext';
import EmotionContext from '../../state/EmotionContext';

import angry from "../../res/angry-regular.svg";
import sad from "../../res/sad-tear-regular.svg";
import happy from "../../res/laugh-beam-regular.svg";
import anxious from "../../res/grimace-regular.svg";

import breakpoints from '../../breakpoints';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
    },
    row: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    button: {
        margin: theme.spacing(1),
    },
    marginBottom: {
        marginBottom: 20
    },
    selected: {
        backgroundColor: "white",
        border: '3px solid black',
    },
    selectedText: {
        fontWeight: 'bold',
    },
    unselected: {
        backgroundColor: "white"
    },
    modalBody: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3)
    },
    what: {
        margin: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "lightblue",
        fontWeight: "bold"
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        backgroundColor: 'white',
    },
    gridContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',

        [`@media ${breakpoints.tablet}`]: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
    },
    gridItem: {
        padding: '15px',
        marginRight: '0',
        marginTop: '30px',

        [`@media ${breakpoints.tablet}`]: {
            marginRight: '30px',
            '&:last-child': {
                marginRight: '0',
            },
            marginBottom: '0',
        },
    },
    gridItemHeader: {
        background: '#303f9f',
        borderRadius: '3px',
        color: 'white',
        padding: '15px',
        width: '50px',
        height: '50px',
        margin: '-30px 10px 15px 0',
    },
    headerText: {
        fontSize: '18px',
    },
    emotionToday: {
        [`@media ${breakpoints.tablet}`]: {
            flex: '0 1 1030px',
        },
    },
    whatAbout: {
        [`@media ${breakpoints.tablet}`]: {
            flex: '0 1 500px',
            minWidth: '337px'
        },
    },
    others: {
        [`@media ${breakpoints.tablet}`]: {
            flex: '0 1 500px',
            minWidth: '337px'
        },
    }
}));

const moods = {
    [emotionCategories.JOY]: { url: happy, name: 'Joy'},
    [emotionCategories.ANGER]: { url: angry, name: 'Anger'},
    [emotionCategories.FEAR]: { url: anxious, name: 'Fear'},
    [emotionCategories.GRIEF]: { url: sad, name: 'Grief'}
};

const MemoizedWordCloud = React.memo(WordCloud);
const MemoizedFearometer = React.memo(Fearometer);

function EmotionPanel({history, onEmotionSelect}) {
    const classes = useStyles();

    const location = useContext(LocationContext);
    const selectedEmotion = useContext(EmotionContext);
    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        what: "",
        severity: 0
    });
    const [overallMood, setOverallMood] = useState(0);
    const [bubbleChartData, setBubbleChartData] = useState();

    const handleInputChange = e => {
        const {name, value} = e.target;
        console.log(e);
        setFormValues({...formValues, [name]: value});
    };

    const handleSeverityChange = (_e, newValue) => {
        setFormValues({...formValues, severity: newValue});
    };

    const handleOpenModal = (e) => {
        e.preventDefault();
        if (formValues.what !== "") {
            const {country, region} = location;
            firebase
                .firestore()
                .collection("emotions")
                .doc()
                .set({
                    category: selectedEmotion,
                    emotion: formValues.what,
                    value: formValues.severity,
                    geo: {country, region},
                    time: Date.now()
                })
                .then(function (docRef) {
                    console.log("doc", docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            setOpenModal(true);
        }
    };

    const handleNext = () => {
        history.push({
            pathname: "/howtocope",
            state: {emotion: selectedEmotion}
        });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
        <div className={classes.root}>

            <div className={ classes.gridContainer }>
                <Paper className={ [classes.gridItem, classes.emotionToday] }>
                    <div style={ {display: 'flex'} }>
                        <div className={ classes.gridItemHeader }>
                            <PersonOutlineIcon />
                        </div>

                        <Typography className={ classes.headerText }>
                            What's your emotion today?
                        </Typography>
                    </div>

                    <div className={ classes.gridItemBody }>
                        <div className={classes.row} style={ {marginBottom: '30px'} }>
                            {Object.keys(moods).map(item => {
                                return (
                                    <div className={classes.iconContainer}>
                                        <Fab
                                            key={item}
                                            className={
                                                selectedEmotion === item
                                                    ? classes.selected
                                                    : classes.unselected
                                            }
                                            style={{margin: "20px"}}
                                            size="large"
                                            onClick={() => onEmotionSelect(item)}
                                            component="div"
                                        >
                                            <div
                                                style={{
                                                    backgroundSize: "contain",
                                                    height: "50px",
                                                    width: "50px",
                                                    backgroundImage: `url(${moods[item].url})`,
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat"
                                                }}
                                            />
                                        </Fab>
                                        <div style={{fontSize: '16px'}} className={
                                            selectedEmotion === item
                                                ? classes.selectedText
                                                : undefined
                                        }>
                                            {moods[item].name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Paper>
            </div>

            <div className={ classes.gridContainer }>
                <Paper className={ [classes.gridItem, classes.whatAbout] }>
                    <div style={ {display: 'flex'} }>
                        <div className={ classes.gridItemHeader }>
                            <CreateIcon />
                        </div>

                        <Typography className={ classes.headerText }>
                            What is it about?
                        </Typography>
                    </div>

                    <div className={ classes.gridItemBody }>
                        <form
                            onSubmit={handleOpenModal}
                        >
                            <Typography className={ classes.headerText }>
                                Share your concern regarding <b>{selectedEmotion}</b>
                            </Typography>
                            <TextField
                                id="what"
                                placeholder="Type your concern (e.g. fear of isolation, happiness about more leisure time, etc.)"
                                fullWidth
                                margin="none"
                                name="what"
                                onChange={handleInputChange}
                                value={formValues.what}
                                className={classes.marginBottom}
                                multiline
                            />

                            <Typography className={ classes.headerText }>
                                How intense is that emotion?
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item style={ {alignSelf: 'center' }}>
                                    <RemoveIcon/>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        name="severity"
                                        onChange={handleSeverityChange}
                                        value={formValues.severity}
                                        valueLabelDisplay="auto"
                                    />
                                </Grid>
                                <Grid item style={ {alignSelf: 'center' }}>
                                    <AddIcon/>
                                </Grid>
                            </Grid>

                            <div className={classes.row}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={handleOpenModal}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>

                </Paper>

                <Paper className={ [classes.gridItem, classes.others] }>
                    <div style={ {display: 'flex'} }>
                        <div className={ classes.gridItemHeader }>
                            <PeopleOutlineIcon />
                        </div>

                        <Typography className={ classes.headerText }>
                            What do others think regarding <b>{selectedEmotion}</b>?
                        </Typography>
                    </div>

                    <div className={ classes.gridItemBody }>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            {/*<div style={{justifySelf: 'start', flex: '0 0 auto'}}>*/}
                                {/*<Typography>*/}
                                    {/*Overall intensity*/}
                                {/*</Typography>*/}
                                {/*<MemoizedFearometer currentValue={overallMood} />*/}
                            {/*</div>*/}
                                <MemoizedWordCloud data={bubbleChartData} selectedEmotion={selectedEmotion} />
                        </div>
                    </div>

                </Paper>
            </div>

            <Modal
                className={classes.row}
                open={openModal}
                onClose={handleCloseModal}
            >
                <div className={classes.modalBody}>
                    <div>
                        Would you like to learn how others coped with {selectedEmotion}{" "}
                        similar to
                    </div>
                    <div className={classes.what}>{formValues.what}</div>
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
        </div>
    );
}

export default withRouter(EmotionPanel);
