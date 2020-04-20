import React, { useContext, useState, createStyles } from "react";
import { withRouter } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import MoodSlider from "./MoodSlider";
import Fab from "@material-ui/core/Fab";

import MoodContext from "../../state/MoodContext";
import LocationContext from "../../state/LocationContext";

import firebase from "../../utils/firebase";
import emotionCategories from "../../utils/constants";

import happy from "../../res/laugh-beam-regular.svg";
import angry from "../../res/angry-regular.svg";
import sad from "../../res/sad-tear-regular.svg";
import anxious from "../../res/grimace-regular.svg";
import Map from "./Map";
import Histogram from "./Histogram";

import {
  emotionColorsArray,
  moodColorsArray,
  coronaColorsArray
} from "./mapModeColors";

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
  }
}));

function MoodPanel({ history, onMoodSubmit, onEmotionSelect }) {
  const classes = useStyles();

  const hasMoodSubmittedOnce = useContext(MoodContext);
  const location = useContext(LocationContext);

  const [moodValue, setMoodValue] = useState(100);
  const [openModal, setOpenModal] = useState(!hasMoodSubmittedOnce);
  const [histogramIsVisible, setHistogramIsVisible] = useState(true);
  const [visibleMouseOver, setVisibleMouseOver] = useState("none");

  const [toggleShowMode, setToggleShowMode] = useState("emotion");

  const handleChange = (event, newValue) => {
    setMoodValue(newValue);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    onMoodSubmit(true);
  };

  const handleSubmit = () => {
    const { country, region } = location;
    firebase
      .firestore()
      .collection("mood")
      .doc()
      .set({
        value: moodValue,
        time: Date.now(),
        geo: { country, region }
      })
      .then(function(docRef) {
        console.log("doc", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    handleCloseModal();
    onMoodSubmit(true);
  };

  const handleEmotionSelect = emotion => {
    onEmotionSelect(emotion);
    history.push({
      pathname: "/howyoufeel",
    });
  };

  function showHistogram() {
    if (histogramIsVisible) {
      return (
        <>
          <Paper
            style={{
              width: "60%",
              margin: "5px 0px 60px 0px",
              padding: "20px",
              backgroundColor: "rgba(241,241,241,0.74)",
              zIndex: 100,
              position: "absolute"
            }}
          >
            <p style={{ height: window.innerWidth <= 700 ? "150px" : "100px" }}>
              <Histogram />
            </p>
          </Paper>
          <Button
            onClick={() => displayHistogram(false)}
            style={{
              position: "absolute",
              zIndex: 101,
              marginTop: "5px",
              background: "#d7d7d7",
              width: "60%",
              height: "2em"
            }}
          >
            <ExpandLessIcon fontSize="small" />
          </Button>
        </>
      );
    } else {
      return (
        <Button
          onClick={() => displayHistogram(true)}
          style={{
            position: "absolute",
            zIndex: 101,
            marginTop: "5px",
            background: "#d7d7d7",
            width: "60%",
            height: "2em"
          }}
        >
          <ExpandMoreIcon fontSize="small" />
        </Button>
      );
    }
  }
  function displayHistogram(displayHistogram) {
    setHistogramIsVisible(displayHistogram);
  }
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
      <Map toggleShowMode={toggleShowMode} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          borderRadius: "15px",
          //width: window.innerWidth <= 700 ? "80%" : "40%",
          textAlign: "center",

          position: "absolute",
          //bottom: window.innerWidth <= 750 ? "20px" : "5px",
          right: "5px"
          //backgroundColor: "rgba(255, 255, 255, 0.3)"
        }}
      >
        <Fab
          className={toggleShowMode === "mood" ? classes.activeButton : null}
          style={{ backgroundColor: "#4b8ef3", marginBottom: "10px" }}
          size={window.innerWidth < 500 ? "small" : "large"}
          color="primary"
          onClick={() => setToggleShowMode("mood")}
        >
          <span style={{ fontSize: "0.7rem" }}>Mood</span>
        </Fab>
        <Fab
          className={toggleShowMode === "emotion" ? classes.activeButton : null}
          style={{ backgroundColor: "#f370b3", marginBottom: "10px" }}
          size={window.innerWidth < 500 ? "small" : "large"}
          color="primary"
          onClick={() => setToggleShowMode("emotion")}
        >
          <span style={{ fontSize: "0.7rem" }}>Emotion</span>
        </Fab>
        <Fab
          className={toggleShowMode === "corona" ? classes.activeButton : null}
          style={{ backgroundColor: "#dcedf3" }}
          size={window.innerWidth < 500 ? "small" : "large"}
          onClick={() => setToggleShowMode("corona")}
        >
          <span style={{ fontSize: "0.6rem" }}>Corona</span>
        </Fab>
      </div>
      {showHistogram()}
      <Paper
        style={{
          width: window.innerWidth <= 700 ? "80%" : "40%",
          textAlign: "center",
          zIndex: 100,

          position: "absolute",
          bottom: window.innerWidth <= 750 ? "20px" : "5px",
          backgroundColor: "rgba(255, 255, 255, 0.3)"
        }}
      >
        <div style={{ fontSize: "22px" }}>And how do you feel today?</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px 10px 0px 10px"
          }}
        >
          <Fab
            style={{ backgroundColor: "#bdf38d" }}
            size={window.innerWidth < 500 ? "small" : "large"}
            color="primary"
            onClick={() => handleEmotionSelect(emotionCategories.JOY)}
            onMouseOver={() => setVisibleMouseOver("joy")}
            onMouseLeave={() => setVisibleMouseOver("none")}
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
            style={{ backgroundColor: "#ffc88c" }}
            size={window.innerWidth < 500 ? "small" : "large"}
            color="primary"
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
            style={{ backgroundColor: "#bbe7ff" }}
            size={window.innerWidth < 500 ? "small" : "large"}
            color="primary"
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
            style={{ backgroundColor: "rgba(240,107,255,0.67)" }}
            size={window.innerWidth < 500 ? "small" : "large"}
            color="primary"
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
          width: "175px",
          background: "rgba(255,255,255,0.3)",
          position: "absolute",
          bottom: "5px",
          left: "5px",
          padding: "5px"
        }}
      >
        <div style={{ fontSize: "22px" }}>Legende</div>
        {toggleShowMode === "emotion" ? (
          <>
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
          </>
        ) : toggleShowMode === "mood" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {moodColorsArray
                .filter((item, index) => {
                  return index % 2 === 0;
                })
                .map(item => {
                  return (
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
                          background: item.color,
                          margin: "5px"
                        }}
                      />
                      <div style={{ margin: "5px" }}>
                        {typeof item.value === "number"
                          ? "> " + item.value
                          : item.value}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {moodColorsArray
                .filter((item, index) => {
                  return index % 2 !== 0;
                })
                .map(item => {
                  return (
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
                          background: item.color,
                          margin: "5px"
                        }}
                      />
                      <div style={{ margin: "5px" }}>
                        {typeof item.value === "number"
                          ? "> " + item.value
                          : item.value}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : toggleShowMode === "corona" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {coronaColorsArray
                .filter((item, index) => {
                  return index % 2 === 0;
                })
                .map(item => {
                  return (
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
                          background: item.color,
                          margin: "5px"
                        }}
                      />
                      <div style={{ margin: "5px" }}>
                        {typeof item.value === "number"
                          ? "> " + item.value
                          : item.value}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {coronaColorsArray
                .filter((item, index) => {
                  return index % 2 !== 0;
                })
                .map(item => {
                  return (
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
                          background: item.color,
                          margin: "5px"
                        }}
                      />
                      <div style={{ margin: "5px" }}>
                        {typeof item.value === "number"
                          ? "> " + item.value
                          : item.value}
                      </div>
                    </div>
                  );
                })}
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
                    margin: "5px"
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Paper>
      <Modal
        className={classes.row}
        open={openModal}
        onClose={handleCloseModal}
      >
        <div className={classes.modalBody}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "cornflowerblue",
              position: "relative",
              borderRadius: "4px 4px 0 0",
              left: "-32px",
              width: "calc(100% + 64px)",
              top: "-16px"
            }}
          >
            <Typography style={{ color: "white" }} align={"center"}>
              MOODOMETER
            </Typography>
          </Toolbar>
          <div className={classes.textBlock}>Hello!</div>
          <div className={classes.textBlock}>
            Anonymously share your mood, thoughts and feelings with others.
          </div>
          <div className={classes.textBlock}>How is your mood?</div>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    background: "red",
                    borderRadius: "20px",
                    height: "20px",
                    width: "20px",
                    margin: "5.1px"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    background: "white",
                    height:
                      moodValue >= 50 ? "20px" : 20 - 0.4 * (50 - moodValue),
                    width: "20px",
                    margin: "5.1px"
                  }}
                />
                <SentimentVeryDissatisfiedIcon
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "30px",
                    height: "30px"
                  }}
                />
              </div>
            </Grid>
            <Grid item xs>
              <MoodSlider
                value={moodValue}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                defaultValue={50}
              />
            </Grid>
            <Grid item>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    background: "green",
                    borderRadius: "20px",
                    height: "20px",
                    width: "20px",
                    margin: "5.1px"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    background: "white",
                    height:
                      moodValue <= 50 ? "20px" : 20 - 0.4 * (moodValue - 50),
                    width: "20px",
                    margin: "5.1px"
                  }}
                />
                <SentimentSatisfiedAltIcon
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "30px",
                    height: "30px"
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Share
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default withRouter(MoodPanel);
