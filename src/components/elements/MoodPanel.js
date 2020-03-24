import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { Map as LeafletMap, TileLayer, GeoJSON } from "react-leaflet";
import geoJson from '../../res/geo.json'

import Histogram from "./Histogram";

import firebase from "../../utils/firebase";
import Fab from "@material-ui/core/Fab";
import happy from "../../res/laugh-beam-regular.svg";
import angry from "../../res/angry-regular.svg";
import sad from "../../res/sad-tear-regular.svg";
import anxious from "../../res/grimace-regular.svg";
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
    maxWidth: 300
  },
  textBlock: {
    margin: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function MoodPanel({ handleNext }) {
  const classes = useStyles();

  const [moodValue, setMoodValue] = useState(100);
  const [overallMood, setOverallMood] = useState(0);
  const [openModal, setOpenModal] = useState(true);
  const [histogramIsVisible, setHistogramIsVisible] = useState(true);

  const handleChange = (event, newValue) => {
    setMoodValue(newValue);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    firebase
      .firestore()
      .collection("mood")
      .doc()
      .set({ value: moodValue, time: Date.now() })
      .then(function(docRef) {
        console.log("doc", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    handleCloseModal();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("mood")
      .get()
      .then(function(querySnapshot) {
        let avg = 0;
        if (querySnapshot.size) {
          querySnapshot.forEach(doc => {
            const d = doc.data();
            avg += d.value;
          });
          avg /= querySnapshot.size;
        }
        setOverallMood(Math.round(avg));
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

function showHistogram(){
  if(histogramIsVisible){
      return (<><Paper
        style={{
          width: "60%",
          margin: "5px 30px 60px 30px",
          padding: "20px",
          backgroundColor: "#f1f1f1",
          zIndex: 100,
          position: "absolute",
          right: "10px"
        }}
      >
        <p style={{ height: window.innerWidth <= 700 ? "150px" : "100px" }}>
          <Histogram />
        </p>
      </Paper>
      <Button onClick={()=>displayHistogram(false)} style={{position: "absolute", zIndex: 101, margin: "10px 50px 0px 0px", background: "#d7d7d7", right: 0}}><RemoveCircleOutlineIcon fontSize="small"/> Hide</Button>
     </>)}
     else {return (
    <Button onClick={()=>displayHistogram(true)} style={{position: "absolute", zIndex: 101, margin: "10px 50px 0px 0px", background: "#d7d7d7", right: 0}}><AddCircleOutlineIcon fontSize="small"/> Show Histogram</Button>
     )}
}
function displayHistogram(displayHistogram){
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
        backgroundSize: "cover"
      }}
    >
      <Map/>
    {showHistogram()}
      <Paper
        style={{
          width: window.innerWidth <= 700 ? "80%" : "40%",
          margin: "60px 30px 0px 30px",
          padding: "10px",
          textAlign: "center",
          zIndex: 100,
          position: "absolute",
          bottom: "10%",
          backgroundColor: "rgba(255, 255, 255, 0.3)"
        }}
      >
        <div style={{ fontSize: "22px" }}>And how do you feel today?</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px"
          }}
        >
          <Fab
            style={{ backgroundColor: "#bbe7ff" }}
            size={window.innerWidth < 500 ?  "small" : "large"}
            color="primary"
            onClick={() => handleNext("joy")}
          >
            <div
              style={{
                backgroundSize: "contain",
                height: "50px",
                width: "50px",
                backgroundImage: `url(${happy})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            />
          </Fab>
          <Fab
            style={{ backgroundColor: "#ffc88c" }}
            size={window.innerWidth < 500 ?  "small" : "large"}
            color="primary"
            onClick={() => handleNext("anger")}
          >
            <div
              style={{
                backgroundSize: "contain",
                height: "50px",
                width: "50px",
                backgroundImage: `url(${angry})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            />
          </Fab>
          <Fab
            style={{ backgroundColor: "#bdf38d" }}
            size={window.innerWidth < 500 ?  "small" : "large"}
            color="primary"
            onClick={() => handleNext("fear")}
          >
            <div
              style={{
                backgroundSize: "contain",
                height: "50px",
                width: "50px",
                backgroundImage: `url(${anxious})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            />
          </Fab>
          <Fab
            style={{ backgroundColor: "#fff6aa" }}
            size={window.innerWidth < 500 ?  "small" : "large"}
            color="primary"
            onClick={() => handleNext("grief")}
          >
            <div
              style={{
                backgroundSize: "contain",
                height: "50px",
                width: "50px",
                backgroundImage: `url(${sad})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            />
          </Fab>
        </div>
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
              backgroundColor: "cornflowerblue"
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
              <SentimentVeryDissatisfiedIcon />
            </Grid>
            <Grid item xs>
              <Slider
                value={moodValue}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item>
              <SentimentSatisfiedAltIcon />
            </Grid>
          </Grid>
          <div style={{display: "flex", justifyContent: "center"}}>
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

export default MoodPanel;
