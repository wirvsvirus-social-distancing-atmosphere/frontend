import React from "react";
import { withRouter } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import StepContent from '@material-ui/core/StepContent';
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import "../materialize.min.css";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import breakpoints from '../../breakpoints';

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
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(
    window.innerWidth <= 700 ? 0 : steps.length - 1
  );
  const mobileMatch = useMediaQuery(breakpoints.tablet);
  const classes = useStyles();
  const handleNext = () => {
    activeStep === steps.length - 1
      ? props.history.push({
          pathname: "/"
        })
      : setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function showAufmerksamkeit() {
    if (
        (!mobileMatch && activeStep === 2) ||
        (mobileMatch && activeStep >= 2)
    ) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data &&
              props.data.aufmerksamkeit.map(item => {
                return (
                  <li key={item.name}>
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
    if (
        (!mobileMatch && activeStep === 3) ||
        (mobileMatch && activeStep >= 3)
    ) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data &&
              props.data.umdeutung.map(item => {
                return (
                  <li key={item.name}>
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
    if (
        (!mobileMatch && activeStep === 4) ||
        (mobileMatch && activeStep >= 4)
    ) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data &&
              props.data.reaktion.map(item => {
                return (
                  <li key={item.name}>
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
  function showModification()   {
    if (
        (!mobileMatch && activeStep === 1) ||
        (mobileMatch && activeStep >= 1)
    ) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data &&
              props.data.modifikation.map(item => {
                return (
                  <li key={item.name}>
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
  function showSelektion() {
    if (
      (!mobileMatch && activeStep === 0) ||
      (mobileMatch && activeStep >= 0)
    ) {
      return (
        <>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data &&
              props.data.selektion.map(item => {
                return (
                  <li key={item.name}>
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
        </>
      );
    }
  }

    function getStepContent(step) {
        switch (step) {
            case 1:
                return showModification();
            case 2:
                return showAufmerksamkeit();
            case 3:
                return showUmdeutung();
            case 4:
                return showReaktion();
            default:
                return showSelektion();
        }
    }

  function saveNewItem(e, category) {
    if (e.key === "Enter") {
      props.saveNewItem(e.target.value, category);
      if (window.innerWidth <= 700) {
        switch (category) {
          case "modifikation":
            setActiveStep(2);
            break;
          case "aufmerksamkeit":
            setActiveStep(3);
            break;
          case "umdeutung":
            setActiveStep(4);
            break;
          case "reaktion":
            setActiveStep(4);
            break;
          default:
            setActiveStep(1);
            break;
        }
      }
    }
  }

  return (
    <>
      <Paper className="container" style={{ width: "95%", backgroundColor: "white" }}>
          <div style={{fontSize: 16, padding: 15, width: "100%", textAlign: "center"}}>
              These are the five major aspects of emotional episodes you can influence to avoid or seek for an
              emotion.
          </div>
          {
            mobileMatch ? (
                <>
                <div className={classes.root}>

                    <Stepper
                        alternativeLabel
                        style={{padding: '0'}}
                        activeStep={activeStep}
                    >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <div className="row">
                    <div
                          className="col m3"
                          style={{
                          width: window.innerWidth <= 700 ? "100%" : "calc(100% / 5)"
                      }}
                    >
          {showSelektion()}
              </div>

              <div
              className="col m3"
              style={{
              width: window.innerWidth <= 700 ? "100%" : "calc(100% / 5)"
          }}
              >
              {showModification()}
              </div>

              <div
              className="col m3"
              style={{
              width: window.innerWidth <= 700 ? "100%" : "calc(100% / 5)"
          }}
              >
              {showAufmerksamkeit()}
              </div>
              <div
              className="col m3"
              style={{
              width: window.innerWidth <= 700 ? "100%" : "calc(100% / 5)"
          }}
              >
              {showUmdeutung()}
              </div>

              <div
              className="col m3"
              style={{
              width: window.innerWidth <= 700 ? "100%" : "calc(100% / 5)"
          }}
              >
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
                  { activeStep === steps.length - 1
                      ? 'Go to "How people feel"'
                      : "Next" }
                  </Button>
              </div>
                </>
            ) : (
                <div className={classes.root}>
                    <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                    >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    { getStepContent(activeStep) }

                                    <div>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                { activeStep === steps.length - 1
                                                    ? 'Go to "How people feel"'
                                                    : "Next" }
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            )
          }
      </Paper>
    </>
  );
}

export default withRouter(Ranking);
