import {GeoJSON, Map as LeafletMap, TileLayer} from "react-leaflet";
import React, { useEffect, useState } from "react";

import geoJson from "../../res/geo";
import firebase from "../../utils/firebase";

const colors = {
    fear: '#bbe7ff',
    anger: '#ffc88c',
    joy: '#bdf38d',
    grief: '#fff6aa'
};

const colorMapper = feature => {
    return {
        fillColor: colors[feature.emotion],
        color: "light-grey",
        weight: 0.3,
    };
}

export default () => {

    const [emotions, setEmotions] = useState([]);
    useEffect(() => {
        const data = []
        firebase
          .firestore()
          .collection("emotions")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });
            setEmotions(data);
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      }, []);

    const countries = [];
    geoJson.features.map(feature => countries.push([]));
    emotions.map((item) => {
        if (item.geo) {
            let countryIndex;
            if (item.geo.region) {
                countryIndex = geoJson.features.findIndex((feature) => feature.properties.name === item.geo.country 
                    && feature.properties.region === item.geo.region);
            } else {
                countryIndex = geoJson.features.findIndex((feature) => feature.properties.name === item.geo.country)
            }
            countries[countryIndex].push({emotion: item.category, value: item.value})
        }
    });
    countries.map((country, index) => {
        const fear = [];
        const grief = [];
        const anger = [];
        const joy = [];

        country.map(emotion => {
            if (emotion.emotion === "fear") {
                fear.push(emotion.value)
            }
            if (emotion.emotion === "anger") {
                anger.push(emotion.value)
            }
            if (emotion.emotion === "grief") {
                grief.push(emotion.value)
            }
            if (emotion.emotion === "joy") {
                joy.push(emotion.value)
            }
        });
        const sums = [
            {name: "fear", value: fear.length ? fear.reduce((a, b) => a + b, 0) / fear.length : 0},
            {name: "anger", value: anger.length ? anger.reduce((a, b) => a + b, 0) / anger.length : 0},
            {name: "grief", value: grief.length ? grief.reduce((a, b) => a + b, 0) / grief.length : 0},
            {name: "joy", value: joy.length ? joy.reduce((a, b) => a + b, 0) / joy.length : 0},
        ];
        const dominantEmotion = sums.reduce((max, emotion) => max.value > emotion.value ? max : emotion);
        geoJson.features[index]["emotion"] = dominantEmotion.name;
    })

    return <LeafletMap style={{width: "100%", height: "80vh", zIndex: 0}} center={[20, 0]} zoom={2}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key='my-geojson' data={geoJson} style={colorMapper}/>
    </LeafletMap>
}
