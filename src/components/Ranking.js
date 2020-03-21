import React from "react";
import "./materialize.min.css";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

function Ranking(props) {
  return (
    <>
      <Typography variant="h2">Was kann ich gegen Angst tun?</Typography>
      <div className="container">
        <div className="row">
          <div className="col m3">
            Selektion
            <ul className="collapsible">
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
            <ul className="collapsible">
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
            <ul className="collapsible">
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
            <ul className="collapsible">
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
            <ul className="collapsible">
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
