import { GeoJSON, Map as LeafletMap, Popup, TileLayer } from "react-leaflet";
import React, { useContext, useState } from "react";

import MoodDataContext from "../../state/MoodDataContext";
import EmotionDataContext from "../../state/EmotionDataContext";
import CoronaDataContext from "../../state/CoronaDataContext";
import {
  emotionColorsArray,
  moodColorsArray,
  coronaColorsArray
} from "./mapModeColors";

import geoJson from "../../res/geo";
import emotionCategories from "../../utils/constants";

const emotionColors = {
  [emotionCategories.JOY]: emotionColorsArray.joy,
  [emotionCategories.ANGER]: emotionColorsArray.anger,
  [emotionCategories.FEAR]: emotionColorsArray.fear,
  [emotionCategories.GRIEF]: emotionColorsArray.grief
};

const moodColors = mood => {
  const moodItem = moodColorsArray.find(item => {
    if (
      (mood === undefined && item.value === "undefined") ||
      mood > item.value
    ) {
      return item.color;
    }
  });
  return moodItem
    ? moodItem.color
    : moodColorsArray.find(item => {
        if (item.value === "default") {
          return item.color;
        }
      });
};

const coronaColors = (corona, max) => {
  corona = (corona / max) * 8;
  const coronaItem = coronaColorsArray.find(item => {
    if (corona > 90) {
      console.log(corona + "..." + item.color);
    }
    if (
      (corona === undefined && item.value === "undefined") ||
      (isNaN(corona) && item.value === "isNaN") ||
      corona > item.value ||
      (corona >= 0 && item.value === 0)
    ) {
      return item.color;
    }
  });
  return coronaItem
    ? coronaItem.color
    : coronaColorsArray.find(item => {
        if (item.value === "default") {
          return item.color;
        }
      });
};

const emotionColorMapper = feature => {
  return {
    fillColor: feature.emotion ? emotionColors[feature.emotion] : "purple",
    color: "light-grey",
    weight: 0.3
  };
};

const moodColorMapper = feature => {
  return {
    fillColor: moodColors(feature.mood),
    color: "light-grey",
    weight: 0.3
  };
};

const coronaColorMapper = feature => {
  return {
    fillColor: coronaColors(feature.corona, feature.coronamax),
    color: "light-grey",
    weight: 0.3
  };
};

export default ({ toggleShowMode }) => {
  const [distribution, setDistribution] = useState({
    country: undefined,
    distribution: []
  });
  const [mood, setMood] = useState({ country: undefined, mood: undefined });
  const moodData = useContext(MoodDataContext);
  const emotionData = useContext(EmotionDataContext);
  const coronaData = useContext(CoronaDataContext);

  if (coronaData) {
    let minMaxArray = [];
    coronaData.map(country => {
      const rate = country.today.confirmed / country.latest_data.confirmed;
      if (!isNaN(rate) && rate !== Infinity) {
        minMaxArray.push(rate);
      }
    });

    const max = Math.max(...minMaxArray);
    geoJson.features.map((feature, index) => {
      let coronaCountry = coronaData.find(
        country => feature.properties.name === country.name
      );
      if (!coronaCountry) {
        coronaCountry = coronaData.find(
          country => feature.properties.iso_a2 === country.code
        );
      }
      if (!coronaCountry) {
        coronaCountry = coronaData.find(
          country => feature.properties.iso_a3 === country.code
        );
      }
      if (coronaCountry) {
        //if(feature.properties.name === "Haiti"){console.log("usa", coronaCountry)}
        const coronaLatest = coronaCountry.latest_data.confirmed;
        const coronaToday = coronaCountry.today.confirmed;
        feature.corona = (coronaToday / coronaLatest) * 100;
        feature.coronamax = max;
      }
    });
    //coronaData.sort((a, b) => a.name.localeCompare(b.name));
  }

  if ((toggleShowMode === "mood" || toggleShowMode === "corona") && moodData) {
    moodData.features.map((country, index) => {
      geoJson.features[index]["mood"] = country.mood;
    });
  }

  if (toggleShowMode === "emotion" && emotionData) {
    emotionData.features.map((country, index) => {
      geoJson.features[index]["emotion"] = country.emotion;
      geoJson.features[index]["values"] = country.values;
      geoJson.features[index]["distribution"] = country.distribution;
    });
  }

  const onClickFeature = (feature, layer) => {
    layer.on("click", function(e) {
      if (feature.distribution) {
        const distribution = feature.distribution.map((emotion, index) => {
          let average = emotion.value / emotion.length / emotion.length;
          average = isNaN(emotion.value / emotion.length) ? 0 : average;
          return (
            <div style={{ marginBottom: 5, width: "150px" }} key={index}>
              <b>
                {emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)}:
              </b>{" "}
              {Math.round(average)} {/*({emotion.length} entries)*/}
              <div
                style={{
                  backgroundColor: emotionColors[emotion.name],
                  width: average + "%",
                  height: 10
                }}
              />
            </div>
          );
        });
        setDistribution({
          country: feature.properties.name,
          distribution: distribution
        });
      }
      if (feature.mood) {
        const mood = (
          <div>
            <b>Average mood:</b> {Math.round(feature.mood)}
          </div>
        );
        setMood({ country: feature.properties.name, mood: mood });
      }
    });
  };

  return (
    <LeafletMap
      style={{ width: "100%", height: "80vh", zIndex: 0 }}
      center={[20, 0]}
      zoom={2}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key="my-geojson"
        data={geoJson}
        style={
          toggleShowMode === "emotion"
            ? emotionColorMapper
            : toggleShowMode === "mood"
            ? moodColorMapper
            : coronaColorMapper
        }
        onEachFeature={onClickFeature}
      >
        {toggleShowMode === "emotion" && (
          <Popup style={{ width: "100vw" }}>
            <span style={{ fontSize: "16px" }}>{distribution.country}</span>
            <br />
            <br />
            {distribution.distribution.map(emotion => emotion)}
            {/*Corona 3-days-growth: {Math.round(geoJson.features.find(feature => mood.country === feature.properties.name) ? geoJson.features.find(feature => mood.country === feature.properties.name).corona : "Not found")}%*/}
          </Popup>
        )}
        {toggleShowMode !== "emotion" && (
          <Popup>
            <span style={{ fontSize: "16px" }}>{mood.country}</span>
            <br />
            <br />
            {/*<b>Corona 3-days-growth:</b> {Math.round(geoJson.features.find(feature => mood.country === feature.properties.name) ? geoJson.features.find(feature => mood.country === feature.properties.name).corona : "Not found")}%*/}
            {mood.mood}
          </Popup>
        )}
      </GeoJSON>
    </LeafletMap>
  );
};
