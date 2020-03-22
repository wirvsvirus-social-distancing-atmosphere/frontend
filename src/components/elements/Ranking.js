import React from "react";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import "../materialize.min.css";

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
  return [
    "Selektion",
    "Modifikation",
    "Aufmerksamkeit",
    "Umdeutung",
    "Reaktion"
  ];
}

function Ranking(props) {
  const [activeStep, setActiveStep] = React.useState(1);
  const classes = useStyles();
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function showAufmerksamkeit() {
    if (activeStep >= 2) {
      return (
        <>
          Aufmerksamkeit
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Lenkung der Aufmerksamkeit: Hilft es mir, wenn ich mich auf eine Sache konzentriere? (Bsp: Ich schaue Netflix, um mich abzulenken)"
          >
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.aufmerksamkeit.map(item => {
              return (
                <li>
                  <div className="collapsible-header">{item.name}</div>
                </li>
              );
            })}
          </ul>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Lenkung der Aufmerksamkeit
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      );
    }
  }
  function showUmdeutung() {
    if (activeStep >= 3) {
      return (
        <>
          Umdeutung
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Kognitive Neubewertung: Wie kann ich die Situation noch sehen? (Bsp: positiv gesehen knüpfe ich auch in Isolation virtuelle neue Kontakte)"
          >
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.umdeutung.map(item => {
              return (
                <li>
                  <div className="collapsible-header">{item.name}</div>
                </li>
              );
            })}
          </ul>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Kognitive Neubewertung
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      );
    }
  }
  function showReaktion() {
    if (activeStep >= 4) {
      return (
        <>
          {" "}
          Reaktion
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Modulation der emotionalen Reaktion: Wie kann ich meine Reaktion steuern? (Bsp: Yoge hilft mir, mein Stresslevel zu senken)"
          >
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.reaktion.map(item => {
              return (
                <li>
                  <div className="collapsible-header">{item.name}</div>
                </li>
              );
            })}
          </ul>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Modulation der emotionalen Reaktion
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      );
    }
  }
  function showModification() {
    if (activeStep >= 1) {
      return (
        <>
          Modifikation
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Situationsmodifikation: Wie kann ich die Situation verändern? (Bsp: mache einen Videoanruf, statt einen Freund zu treffen)"
          >
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
          <ul
            className="collapsible"
            style={{ height: "375px", overflow: "auto" }}
          >
            {props.data.modifikation.map(item => {
              return (
                <li>
                  <div className="collapsible-header">{item.name}</div>
                </li>
              );
            })}
          </ul>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Situationsmodifikation
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      );
    }
  }
  return (
    <>
      <DialogTitle className={classes.row}>
        Was kann ich gegen Angst tun?
      </DialogTitle>

      <div className="container" style={{ width: "90%" }}>
        <div className={classes.root}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="row">
          <div className="col m3" style={{ width: "calc(100% / 5)" }}>
            Selektion
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Situationsauswahl: Stelle ich mich der Situation oder vermeide ich sie? (Bsp: Ich bliebe zuhause)"
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
            <ul
              className="collapsible"
              style={{ height: "375px", overflow: "auto" }}
            >
              {props.data.selektion.map(item => {
                return (
                  <li>
                    <div className="collapsible-header">{item.name}</div>
                  </li>
                );
              })}
            </ul>
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">
                Situationsauswahl
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="end">
                    <SubdirectoryArrowLeftIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
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
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Ranking;
