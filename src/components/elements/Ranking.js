import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  return [
    "Selektion",
    "Modifikation",
    "Aufmerksamkeit",
    "Umdeutung",
    "Reaktion"
  ];
}

function Ranking(props) {
  const [activeStep, setActiveStep] = React.useState(4);
  const classes = useStyles();
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
                    {item.name + " (" + item.value + "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Deine Maßnahme"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "aufmerksamkeit")}
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
                    {item.name + " (" + item.value + "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Deine Maßnahme"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "umdeutung")}
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
                    {item.name + " (" + item.value + "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Deine Maßnahme"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "reaktion")}
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
                    {item.name + " (" + item.value + "%)"}
                  </div>
                </li>
              );
            })}
          </ul>
          <TextField
            id="input-with-icon-textfield"
            label="Deine Maßnahme"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SubdirectoryArrowLeftIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onKeyPress={e => saveNewItem(e, "modifikation")}
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
  function getTooltipTitle(label) {
    switch (label) {
      case "Selektion":
        return "Situationsauswahl: Stelle ich mich der Situation oder vermeide ich sie? (Bsp: Ich bleibe zuhause)";
      case "Modifikation":
        return "Situationsmodifikation: Wie kann ich die Situation verändern? (Bsp: Mache einen Videoanruf, statt einen Freund zu treffen)";
      case "Aufmerksamkeit":
        return "Lenkung der Aufmerksamkeit: Hilft es mir, wenn ich mich auf eine Sache konzentriere? (Bsp: Ich schaue Netflix, um mich abzulenken)";
      case "Umdeutung":
        return "Kognitive Neubewertung: Wie kann ich die Situation noch sehen? (Bsp: Positiv gesehen knüpfe ich auch in Isolation virtuelle neue Kontakte)";
      case "Reaktion":
        return "Modulation der emotionalen Reaktion: Wie kann ich meine Reaktion steuern? (Bsp: Yoga hilft mir, mein Stresslevel zu senken)";
      default:
        return;
    }
  }
  return (
    <>
      <DialogTitle className={classes.row}>
        Was kann ich gegen Angst tun?
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
                <StepLabel>
                  {label}{" "}
                  <Tooltip
                    disableFocusListener
                    disableTouchListener
                    title={getTooltipTitle(label)}
                  >
                    <HelpOutlineIcon fontSize="small" />
                  </Tooltip>
                </StepLabel>
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
                      {item.name + " (" + item.value + "%)"}
                    </div>
                  </li>
                );
              })}
            </ul>

            <TextField
              id="input-with-icon-textfield"
              label="Deine Maßnahme"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SubdirectoryArrowLeftIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              onKeyPress={e => saveNewItem(e, "selektion")}
              helperText="Situationsauswahl: Stelle ich mich der Situation oder vermeide ich sie? (Bsp: Ich bleibe zuhause)"
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
            {activeStep === steps.length - 1 ? "Go to ScreenB" : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Ranking;
