import React, { useState } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import "./materialize.min.css";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

function Ranking(props) {
  const [displayStayAtHome, setDisplayStayAtHome] = useState(false);
  function changeAtHomeDisplay() {
    setDisplayStayAtHome(!displayStayAtHome);
  }
  return (
    <>
      <Typography variant="h2">Was kann ich gegen Angst tun?</Typography>
      <div className="container">
        <div className="row">
          <div className="col m3">
            Selektion
            <ul className="collapsible">
              <li>
                <div
                  className="collapsible-header"
                  onClick={changeAtHomeDisplay}
                >
                  <AccessTimeIcon />
                  Zuhause bleiben
                </div>
                {displayStayAtHome ? (
                  <div
                    className="collapsible-body"
                    style={{ display: "block" }}
                  >
                    <span>Zocken is geil.</span>
                  </div>
                ) : null}
              </li>
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
                    <div className="collapsible-header">
                      <AccessTimeIcon />
                      {item.name}
                    </div>
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
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Netflix
                </div>
                <div className="collapsible-body">
                  <span>Streamen.</span>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Offline
                </div>
                <div className="collapsible-body">
                  <span>Ohne Internet.</span>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Ruhe
                  <span className="new badge"></span>
                </div>
                <div className="collapsible-body">
                  <span>
                    Einfach chillen, auch gut kombinierbar mit Netflix.
                  </span>
                </div>
              </li>
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
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Netflix
                </div>
              </li>
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
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Yoga/Meditation
                </div>
                <div className="collapsible-body">
                  <span>Chillen.</span>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Atmen
                  <span className="new badge"></span>
                </div>
                <div className="collapsible-body">
                  <span>Lunge.</span>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <AccessTimeIcon />
                  Alkohol
                </div>
                <div className="collapsible-body">
                  <span>Vodka.</span>
                </div>
              </li>
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
