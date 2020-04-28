import React, {useContext, useState} from "react";
import {withRouter} from "react-router-dom";

import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import ExpandArrow from "@material-ui/icons/ExpandMore";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {makeStyles} from "@material-ui/core/styles";
import {Fab, Grid, Modal, Paper, TextField, Typography} from "@material-ui/core";

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
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
        border: '1px solid lightgrey',
    },
    selectedText: {
        //fontWeight: 'bold',
    },
    unselectedText: {
        opacity: 0.2,
    },
    unselected: {
        backgroundColor: "white",
        opacity: 0.2,
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
        margin: 10,
    },
    fab: {
        backgroundColor: 'white',
    },
    paperContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 600,
        alignItems: "center"
    },
    gridContainer: {
        display: 'flex',
        maxWidth: 800,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",

        [`@media ${breakpoints.tablet}`]: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: "center",
        },
    },
    gridItem: {
        padding: '15px',
        marginRight: '0',
        maxWidth: 400,
        width: "100%",
        //marginTop: '30px',

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
    titleText: {
        fontSize: '24px',
        fontWeight: "bold",
        textAlign: "center",
    },
    headerText: {
        fontSize: '16px',
        textAlign: "left",
        color: "#6a6a6a",
        marginTop: 20,
        //backgroundColor: "rgba(239,239,239,0.55)",
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
    [emotionCategories.JOY]: {url: happy, name: 'Joy'},
    [emotionCategories.ANGER]: {url: angry, name: 'Anger'},
    [emotionCategories.FEAR]: {url: anxious, name: 'Fear'},
    [emotionCategories.GRIEF]: {url: sad, name: 'Grief'}
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
    const [showWordCloud, setShowWordCloud] = useState(false);

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
            <Paper className={classes.paperContainer}>
                <Typography style={{display: "flex",  paddingTop: 10, paddingLeft: 10,}} className={classes.titleText}>
                    Share how you feel!
                </Typography>

                <div className={classes.gridItem}>
                    <div >
                        {/*<div className={ classes.gridItemHeader }>
                            <PersonOutlineIcon />
                        </div>*/}

                        <Typography className={classes.headerText}>
                            1. What's your emotion today?
                        </Typography>
                    </div>
                    <div className={classes.row}>
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
                                            : classes.unselectedText
                                    }>
                                        {moods[item].name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Typography className={classes.headerText}>
                        2. How intense is your <b>{selectedEmotion}</b>?
                    </Typography>
                    <Grid container spacing={2} style={{marginTop: 7,}}>
                        <Grid item style={{alignSelf: 'center', fontSize: 16, marginBottom: 8}}>
                            0{/*<RemoveIcon/>*/}
                        </Grid>
                        <Grid item xs>
                            <Slider
                                name="severity"
                                onChange={handleSeverityChange}
                                value={formValues.severity}
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                        <Grid item style={{alignSelf: 'center', fontSize: 16, marginBottom: 8}}>
                           100 {/*<AddIcon/>*/}
                        </Grid>
                    </Grid>

                    <Typography className={classes.headerText} style={{marginBottom: 10,}}>
                        3. What is your <b>{selectedEmotion}</b> about?
                    </Typography>
                    <form
                        onSubmit={handleOpenModal}
                    >
                        <TextField
                            id="what"
                            placeholder="Type something (e.g. fear of isolation, happiness about more leisure time, etc.)"
                            fullWidth
                            margin="none"
                            name="what"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={formValues.what}
                            className={classes.marginBottom}
                            multiline
                        />


                        <div className={classes.row}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleOpenModal}
                            >
                                Share
                            </Button>
                        </div>
                    </form>

                </div>

                {/*<div style={ {display: 'flex'} }>
                        <div className={ classes.gridItemHeader }>
                            <CreateIcon />
                        </div>

                        <Typography className={ classes.headerText }>
                            Content and intensity
                        </Typography>
                    </div>*/}


            </Paper>

            <Paper className={classes.paperContainer} style={{marginTop: 20}} onClick={() => setShowWordCloud(!showWordCloud)}>
                <div style={{display: 'flex', alignItems: "center", padding: 15,}} >

                    {/*<div className={classes.gridItemHeader}>

                    </div>*/}

                    <Typography className={classes.headerText} style={{marginTop: 0,}}>
                        What is other's <b>{selectedEmotion}</b> about?
                    </Typography>

                    <ExpandArrow style={{margin: 10}}/>
                </div>

                {showWordCloud && <div className={classes.gridItem}>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        {/*<div style={{justifySelf: 'start', flex: '0 0 auto'}}>*/}
                        {/*<Typography>*/}
                        {/*Overall intensity*/}
                        {/*</Typography>*/}
                        {/*<MemoizedFearometer currentValue={overallMood} />*/}
                        {/*</div>*/}
                        <MemoizedWordCloud data={bubbleChartData} selectedEmotion={selectedEmotion}/>
                    </div>
                </div>}

            </Paper>

            {/*<div className={classes.gridContainer}>
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
                                                : classes.unselectedText
                                        }>
                                            {moods[item].name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={ {display: 'flex'} }>
                        <div className={ classes.gridItemHeader }>
                            <CreateIcon />
                        </div>

                        <Typography className={ classes.headerText }>
                            Content and intensity
                        </Typography>
                    </div>

                    <div className={ classes.gridItem }>
                        <Typography className={ classes.headerText } style={{marginBottom: 10}}>
                            What is your <b>{selectedEmotion}</b> about?
                        </Typography>
                        <form
                            onSubmit={handleOpenModal}
                        >
                            <TextField
                                id="what"
                                placeholder="Type something (e.g. fear of isolation, happiness about more leisure time, etc.)"
                                fullWidth
                                margin="none"
                                name="what"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formValues.what}
                                className={classes.marginBottom}
                                multiline
                            />

                            <Typography className={ classes.headerText }>
                                How intense is your <b>{selectedEmotion}</b>?
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


            </div>*/}

            {/*<div className={ classes.gridContainer }>

                <Paper className={ [classes.gridItem, classes.others] }>
                    <div style={ {display: 'flex'} } onClick={() => setShowWordCloud(!showWordCloud)}>
                        <div className={ classes.gridItemHeader }>
                            <PeopleOutlineIcon />
                        </div>

                        <Typography className={ classes.headerText }>
                            What do others think regarding <b>{selectedEmotion}</b>?
                        </Typography>
                    </div>

                    {showWordCloud && <div className={classes.gridItem}>

                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <div style={{justifySelf: 'start', flex: '0 0 auto'}}>
                            <Typography>
                            Overall intensity
                            </Typography>
                            <MemoizedFearometer currentValue={overallMood} />
                            </div>
                            <MemoizedWordCloud data={bubbleChartData} selectedEmotion={selectedEmotion}/>
                        </div>
                    </div>}

                </Paper>
            </div>*/}

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
