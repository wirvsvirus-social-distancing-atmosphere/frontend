import {GeoJSON, Map as LeafletMap, TileLayer} from "react-leaflet";
import React, {useEffect, useState} from "react";

import geoJson from "../../res/geo";
import firebase from "../../utils/firebase";
import emotionCategories from '../../utils/constants';

const colors = {
    [emotionCategories.JOY]: '#bdf38d',
    [emotionCategories.ANGER]: '#ffc88c',
    [emotionCategories.FEAR]: '#bbe7ff',
    [emotionCategories.GRIEF]: '#e938ff'
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
            .then(function (querySnapshot) {
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                });
                setEmotions(data);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }, []);

    const countries = [];
    geoJson.features.map(feature => countries.push([]));
    emotions.map((item) => {
        if (item.geo) {
            let countryIndex;
            if (item.geo.country === "Germany" && item.geo.region) { //geojson only contains region polygons for germany
                countryIndex = geoJson.features.findIndex((feature) => feature.properties.name === item.geo.country
                    && feature.properties.region === item.geo.region);
            } else {
                countryIndex = geoJson.features.findIndex((feature) => feature.properties.name === item.geo.country)
            }
            if (countryIndex !== -1) {
                countries[countryIndex].push({emotion: item.category, value: item.value})
            }
        }
    });

    countries.map((country, index) => {
        const fear = [];
        const grief = [];
        const anger = [];
        const joy = [];

        country.map(emotion => {
            if (emotion.emotion === emotionCategories.FEAR) {
                fear.push(emotion.value)
            }
            if (emotion.emotion === emotionCategories.ANGER) {
                anger.push(emotion.value)
            }
            if (emotion.emotion === emotionCategories.GRIEF) {
                grief.push(emotion.value)
            }
            if (emotion.emotion === emotionCategories.JOY) {
                joy.push(emotion.value)
            }
        });

        const sums = [
            {name: emotionCategories.FEAR, value: fear.length ? fear.reduce((a, b) => a + b, 0) * fear.length : 0},
            {
                name: emotionCategories.ANGER,
                value: anger.length ? anger.reduce((a, b) => a + b, 0) * anger.length : 0
            },
            {
                name: emotionCategories.GRIEF,
                value: grief.length ? grief.reduce((a, b) => a + b, 0) * grief.length : 0
            },
            {name: emotionCategories.JOY, value: joy.length ? joy.reduce((a, b) => a + b, 0) * joy.length : 0},
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