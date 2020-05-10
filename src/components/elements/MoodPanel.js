import React, {useRef, useState} from "react";
import {withRouter} from 'react-router-dom';

import {makeStyles} from "@material-ui/core/styles";
import Map from "./Map";

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    button: {
        margin: theme.spacing(1)
    },
    modalBody: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        maxWidth: 300,
        borderRadius: "4px"
    },
    textBlock: {
        margin: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    activeButton: {
        textDecoration: "underline",
        fontWeight: "bold"
    },
    fab: {
        backgroundColor: 'white',
    }
}));

function MoodPanel({history, onEmotionSelect}) {
    const classes = useStyles();

    const [visibleMouseOver, setVisibleMouseOver] = useState("none");

    const toggleShowMode = useRef("emotion");

    const handleEmotionSelect = emotion => {
        onEmotionSelect(emotion);
        history.push({
            pathname: "/howyoufeel",
        });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                backgroundSize: "cover",
                position: "relative"
            }}
        >
            <Map toggleShowMode={toggleShowMode.current}/>
            {/*<Paper
                style={{
                    width: window.innerWidth <= 700 ? "80%" : "40%",
                    minWidth: "250px",
                    textAlign: "center",
                    zIndex: 100,

                    position: "absolute",
                    bottom: window.innerWidth <= 750 ? "20px" : "5px",
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                }}
            >
                <div style={{fontSize: "22px"}}>And how do you feel today?</div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "10px 10px 0px 10px"
                    }}
                >
                    <Fab
                        className={classes.fab}
                        size={window.innerWidth < 500 ? "small" : "large"}
                        onClick={() => handleEmotionSelect(emotionCategories.JOY)}
                        onMouseOver={() => setVisibleMouseOver("joy")}
                        onMouseLeave={() => setVisibleMouseOver("none")}
                        disableFocusRipple
                    >
                        <div
                            style={{
                                backgroundSize: "contain",
                                height: visibleMouseOver === "joy" ? "56px" : "50px",
                                width: visibleMouseOver === "joy" ? "56px" : "50px",
                                backgroundImage: `url(${happy})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    </Fab>
                    <Fab
                        className={classes.fab}
                        size={window.innerWidth < 500 ? "small" : "large"}
                        onClick={() => handleEmotionSelect(emotionCategories.ANGER)}
                        onMouseOver={() => setVisibleMouseOver("anger")}
                        onMouseLeave={() => setVisibleMouseOver("none")}
                    >
                        <div
                            style={{
                                backgroundSize: "contain",
                                height: visibleMouseOver === "anger" ? "56px" : "50px",
                                width: visibleMouseOver === "anger" ? "56px" : "50px",
                                backgroundImage: `url(${angry})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    </Fab>
                    <Fab
                        className={classes.fab}
                        size={window.innerWidth < 500 ? "small" : "large"}
                        onClick={() => handleEmotionSelect(emotionCategories.FEAR)}
                        onMouseOver={() => setVisibleMouseOver("fear")}
                        onMouseLeave={() => setVisibleMouseOver("none")}
                    >
                        <div
                            style={{
                                backgroundSize: "contain",
                                height: visibleMouseOver === "fear" ? "56px" : "50px",
                                width: visibleMouseOver === "fear" ? "56px" : "50px",
                                backgroundImage: `url(${anxious})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    </Fab>
                    <Fab
                        className={classes.fab}
                        size={window.innerWidth < 500 ? "small" : "large"}
                        onClick={() => handleEmotionSelect(emotionCategories.GRIEF)}
                        onMouseOver={() => setVisibleMouseOver("grief")}
                        onMouseLeave={() => setVisibleMouseOver("none")}
                    >
                        <div
                            style={{
                                backgroundSize: "contain",
                                height: visibleMouseOver === "grief" ? "56px" : "50px",
                                width: visibleMouseOver === "grief" ? "56px" : "50px",
                                backgroundImage: `url(${sad})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    </Fab>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px 10px"
                    }}
                >
                    <div
                        style={{
                            width: "25%",
                            visibility: visibleMouseOver === "joy" ? "visible" : "hidden"
                        }}
                    >
                        Joy
                    </div>
                    <div
                        style={{
                            width: "25%",
                            visibility: visibleMouseOver === "anger" ? "visible" : "hidden"
                        }}
                    >
                        Anger
                    </div>
                    <div
                        style={{
                            width: "25%",
                            visibility: visibleMouseOver === "fear" ? "visible" : "hidden"
                        }}
                    >
                        Fear
                    </div>
                    <div
                        style={{
                            width: "25%",
                            visibility: visibleMouseOver === "grief" ? "visible" : "hidden"
                        }}
                    >
                        Grief
                    </div>
                </div>
            </Paper>
            <Paper
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "120px",
                    background: "rgba(255,255,255,0.3)",
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    padding: "5px",
                    fontSize: '16px'
                }}
            >
                <div style={{fontSize: "20px"}}>Legend</div>
                <React.Fragment>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start"
                        }}
                    >
                        <div
                            style={{
                                width: "15px",
                                height: "15px",
                                background: emotionColorsArray.joy,
                                margin: "5px"
                            }}
                        />
                        <div>Joy</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start"
                        }}
                    >
                        <div
                            style={{
                                width: "15px",
                                height: "15px",
                                background: emotionColorsArray.anger,
                                margin: "5px"
                            }}
                        />
                        <div>Anger</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start"
                        }}
                    >
                        <div
                            style={{
                                width: "15px",
                                height: "15px",
                                background: emotionColorsArray.fear,
                                margin: "5px"
                            }}
                        />
                        <div>Fear</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start"
                        }}
                    >
                        <div
                            style={{
                                width: "15px",
                                height: "15px",
                                background: emotionColorsArray.grief,
                                margin: "5px"
                            }}
                        />
                        <div>Grief</div>
                    </div>
                </React.Fragment>
            </Paper>*/}
        </div>
    );
}

export default withRouter(MoodPanel);
