import React from "react";
import { withRouter } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import "../materialize.min.css";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  modalBody: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    margin: theme.spacing(1)
  },
  root: {
    width: "100%"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Selection", "Modification", "Attention", "Appraisal", "Response"];
}

function Ranking(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();
  const steps = getSteps();
  const handleNext = () => {
    activeStep === steps.length - 1
      ? props.history.push({
          pathname: "/"
        })
      : setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function showAufmerksamkeit() {
    if (activeStep >= 2) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.aufmerksamkeit.map(item => {
              return (
                <li>
                  <div className="collapsible-header">
                    {item.name +
                      " (" +
                      (
                        (item.value /
                          props.data.totalItemsPerCategory.aufmerksamkeit) *
                        100
                      ).toFixed(2) +
                      "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Your measure"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "aufmerksamkeit")}
            helperText="Attentional Deployment: Does it help if I concentrate on one thing? (Eg: I'm watching Netflix to distract myself)"
          />
        </>
      );
    }
  }
  function showUmdeutung() {
    if (activeStep >= 3) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.umdeutung.map(item => {
              return (
                <li>
                  <div className="collapsible-header">
                    {item.name +
                      " (" +
                      (
                        (item.value /
                          props.data.totalItemsPerCategory.umdeutung) *
                        100
                      ).toFixed(2) +
                      "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Your measure"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "umdeutung")}
            helperText="Cognitive Change: How can I see the situation from a different perspective? (Eg: Seen positively, I also make new virtual contacts in isolation)"
          />
        </>
      );
    }
  }
  function showReaktion() {
    if (activeStep >= 4) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.reaktion.map(item => {
              return (
                <li>
                  <div className="collapsible-header">
                    {item.name +
                      " (" +
                      (
                        (item.value /
                          props.data.totalItemsPerCategory.reaktion) *
                        100
                      ).toFixed(2) +
                      "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Your measure"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "reaktion")}
            helperText="Emotional Response Modulation: How can I control my response? (Eg: Yoga helps me to lower my stress level)"
          />
        </>
      );
    }
  }
  function showModification() {
    if (activeStep >= 1) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.modifikation.map(item => {
              return (
                <li>
                  <div className="collapsible-header">
                    {item.name +
                      " (" +
                      (
                        (item.value /
                          props.data.totalItemsPerCategory.modifikation) *
                        100
                      ).toFixed(2) +
                      "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Your measure"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "modifikation")}
            helperText="Situation Modification: How can I change the situation? (Eg: Make a video call instead of meeting a friend)"
          />
        </>
      );
    }
  }
  function saveNewItem(e, category) {
    if (e.key === "Enter") {
      props.saveNewItem(e.target.value, category);
    }
  }
  return (
    <>
      <DialogTitle className={classes.row}>
        What can I do about fear?
      </DialogTitle>

      <div className="container" style={{ width: "90%" }}>
        <div className={classes.root}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            style={{ padding: 0 }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="row">
          <div className="col m3" style={{ width: "calc(100% / 5)" }}>
            <ul
              className="collapsible"
              style={{ height: "375px", overflow: "auto" }}
            >
              {props.data.selektion.map(item => {
                return (
                  <li>
                    <div className="collapsible-header">
                      {item.name +
                        " (" +
                        (
                          (item.value /
                            props.data.totalItemsPerCategory.selektion) *
                          100
                        ).toFixed(2) +
                        "%)"}
                    </div>
                  </li>
                );
              })}
            </ul>

            <TextField
              id="input-with-icon-textfield"
              label="Your measure"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SubdirectoryArrowLeftIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              onKeyPress={e => saveNewItem(e, "selektion")}
              helperText="Situation Selection: Do I face the situation or do I avoid it? (Eg: I stay at home)"
            />
          </div>

          <div className="col m3" style={{ width: "calc(100% / 5)" }}>
            {showModification()}
          </div>

          <div className="col m3" style={{ width: "calc(100% / 5)" }}>
            {showAufmerksamkeit()}
          </div>
          <div className="col m3" style={{ width: "calc(100% / 5)" }}>
            {showUmdeutung()}
          </div>

          <div className="col m3" style={{ width: "calc(100% / 5)" }}>
            {showReaktion()}
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1
              ? 'Go to "How people feel"'
              : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default withRouter(Ranking);
