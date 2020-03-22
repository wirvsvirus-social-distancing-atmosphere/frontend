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
  }
}));

function Ranking(props) {
  const classes = useStyles();
  return (
    <>
      <DialogTitle className={classes.row}>
        Was kann ich gegen Angst tun?
      </DialogTitle>
      <div className="container">
        <div className="row">
          <div className="col m3">
            Selektion
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Situationsauswahl: Stelle ich mich der Situation oder vermeide ich sie? (Bsp: Ich bliebe zuhause)"
            >
              <HelpOutlineIcon />
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
                With a start adornment
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

          <div className="col m3">
            Modifikation
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Situationsmodifikation: Wie kann ich die Situation verändern? (Bsp: mache einen Videoanruf, statt einen Freund zu treffen)"
            >
              <HelpOutlineIcon />
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
                With a start adornment
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

          <div className="col m3">
            Aufmerksamkeit
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Lenkung der Aufmerksamkeit: Hilft es mir, wenn ich mich auf eine Sache konzentriere? (Bsp: Ich schaue Netflix, um mich abzulenken)"
            >
              <HelpOutlineIcon />
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
                With a start adornment
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
          <div className="col m3">
            Umdeutung
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Kognitive Neubewertung: Wie kann ich die Situation noch sehen? (Bsp: positiv gesehen knüpfe ich auch in Isolation virtuelle neue Kontakte)"
            >
              <HelpOutlineIcon />
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
                With a start adornment
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

          <div className="col m3">
            Reaktion
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Modulation der emotionalen Reaktion: Wie kann ich meine Reaktion steuern? (Bsp: Yoge hilft mir, mein Stresslevel zu senken)"
            >
              <HelpOutlineIcon />
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
                With a start adornment
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
        </div>
      </div>
    </>
  );
}

export default Ranking;
