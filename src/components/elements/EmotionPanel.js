import React, {useContext, useEffect, useState} from "react";
import {withRouter} from "react-router-dom";

import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, TextField, Modal, Grid, Fab, Divider} from "@material-ui/core";

import Fearometer from "./Fearometer";
import WordCloud from "./WordCloud";
import firebase from "../../utils/firebase";
import emotionCategories from '../../utils/constants';

import LocationContext from '../../state/LocationContext';
import EmotionContext from '../../state/EmotionContext';
import EmotionDataContext from '../../state/EmotionDataContext';

import angry from "../../res/angry-regular.svg";
import sad from "../../res/sad-tear-regular.svg";
import happy from "../../res/laugh-beam-regular.svg";
import anxious from "../../res/grimace-regular.svg";

const useStyles = makeStyles(theme => ({
    root: {
        width: "90%",
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
        margin: theme.spacing(1)
    },
    marginBottom: {
        marginBottom: 20
    },
    selected: {
        backgroundColor: "cornflowerblue"
    },
    unselected: {
        backgroundColor: "lightgrey"
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
    }
}));

const moods = {
    [emotionCategories.JOY]: happy,
    [emotionCategories.ANGER]: angry,
    [emotionCategories.FEAR]: anxious,
    [emotionCategories.GRIEF]: sad
};

function EmotionPanel({history, onEmotionSelect}) {
    const classes = useStyles();

    const location = useContext(LocationContext);
    const selectedEmotion = useContext(EmotionContext);
    const emotionData = useContext(EmotionDataContext);
    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        what: "",
        severity: 0
    });
    const [overallMood, setOverallMood] = useState(0);
    const [bubbleChartData, setBubbleChartData] = useState();

    useEffect(() => {
        let avg = 0;
        const data = {};
        const children = [];
        let selection = [];
        if (emotionData.emotions) {
            selection = emotionData.emotions.filter(emotion => emotion.category === selectedEmotion);
            selection.forEach(entry => {
                    const d = entry;
                    avg += d.value;
                    if (!data[d.emotion]) {
                        data[d.emotion] = {
                            count: 0,
                            value: 0
                        };
                    }
                    data[d.emotion] = {
                        count: data[d.emotion].count + 1,
                        value: data[d.emotion].value + d.value
                    };
                }
            );
            avg /= selection.length;
        }
        Object.keys(data).forEach(key => {
            children.push({
                name: key,
                size: data[key].count /* / selection.length */
            });
        });
        setOverallMood(Math.round(avg));
        setBubbleChartData({
            name: "",
            children
        })
    }, [selectedEmotion])

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

    function showContent() {
        if (window.innerWidth > 700 && window.innerHeight < 850) {
            return (
                <Grid container style={{width: "100%"}}>
                    <Grid
                        item
                        style={{width: "45%", marginLeft: "2%", marginRight: "3%"}}
                    >
                        <DialogTitle className={classes.row}>What's your emotion today?</DialogTitle>
                        <div className={classes.row}>
                            {Object.keys(moods).map(item => {
                                return (
                                    <Fab
                                        key={item}
                                        className={
                                            selectedEmotion === item
                                                ? classes.selected
                                                : classes.unselected
                                        }
                                        style={{margin: "20px"}}
                                        size="large"
                                        color="primary"
                                        onClick={() => onEmotionSelect(item)}
                                        component="div"
                                    >
                                        <div
                                            style={{
                                                backgroundSize: "contain",
                                                height: "50px",
                                                width: "50px",
                                                backgroundImage: `url(${moods[item]})`,
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat"
                                            }}
                                        />
                                    </Fab>
                                );
                            })}
                        </div>

                        <form
                            onSubmit={handleOpenModal}
                        >
                            <Typography align={"center"}>What could happen?</Typography>
                            <TextField
                                id="what"
                                placeholder="e.g. fear of isolation, happiness about more leisure time, etc."
                                fullWidth
                                margin="none"
                                name="what"
                                onChange={handleInputChange}
                                value={formValues.what}
                                className={classes.marginBottom}
                            />

                            <Typography align={"center"}>
                                How intense is that emotion?
                            </Typography>
                            <Slider
                                name="severity"
                                onChange={handleSeverityChange}
                                value={formValues.severity}
                                valueLabelDisplay="auto"
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
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item style={{width: "45%", marginLeft: "3%"}}>
                        <DialogTitle className={classes.row}>
                            What are {selectedEmotion}s of others?
                        </DialogTitle>
                        
                        <div className={classes.row}>
                            <WordCloud data={bubbleChartData} />
                            <p style={{position: "absolute", left: "5%"}}><Fearometer currentValue={overallMood} /></p>
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
                    </Grid>
                </Grid>
            );
        } else {
            return (
                <>
                    <DialogTitle className={classes.row}>What's your emotion today?</DialogTitle>
                    <div className={classes.row}>
                        {Object.keys(moods).map(item => {
                            return (
                                <Fab
                                    key={item}
                                    className={
                                        selectedEmotion === item
                                            ? classes.selected
                                            : classes.unselected
                                    }
                                    style={{
                                        margin:
                                            window.innerWidth < 500
                                                ? "0px 5px 20px 5px"
                                                : "0px 20px 20px 20px"
                                    }}
                                    size={window.innerWidth < 500 ? "small" : "large"}
                                    color="primary"
                                    onClick={() => onEmotionSelect(item)}
                                    component="div"
                                >
                                    <div
                                        style={{
                                            backgroundSize: "contain",
                                            height: "50px",
                                            width: "50px",
                                            backgroundImage: `url(${moods[item]})`,
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    />
                                </Fab>
                            );
                        })}
                    </div>

                    <form
                        onSubmit={handleOpenModal}
                    >
                        <Typography align={"center"}>What could happen?</Typography>
                        <TextField
                            id="what"
                            placeholder="e.g. fear of isolation, happiness about more leisure time, etc."
                            fullWidth
                            margin="none"
                            name="what"
                            onChange={handleInputChange}
                            value={formValues.what}
                            className={classes.marginBottom}
                        />

                        <Typography align={"center"}>
                            How intense is that emotion?
                        </Typography>
                        <Slider
                            name="severity"
                            onChange={handleSeverityChange}
                            value={formValues.severity}
                            valueLabelDisplay="auto"
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
                    
                    <DialogTitle className={classes.row}>
                        What are {selectedEmotion}s of others? 
                    </DialogTitle>
                    
                    <div className={classes.row}>
                        <WordCloud data={bubbleChartData} style={{ margin: "5%" }} />
                        <p  style={{position: "absolute", left: "5%"}}><Fearometer currentValue={overallMood}/></p>
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
            );
        }
    }

    return <div className={classes.root}>{showContent()}</div>;
}

export default withRouter(EmotionPanel);
