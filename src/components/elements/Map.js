import {GeoJSON, Map as LeafletMap, Popup, TileLayer} from "react-leaflet";
import React, {useContext, useEffect, useState} from "react";

import MoodDataContext from '../../state/MoodDataContext';
import EmotionDataContext from '../../state/EmotionDataContext';

import geoJson from "../../res/geo";
import emotionCategories from '../../utils/constants';

const emotionColors = {
    [emotionCategories.JOY]: '#bdf38d',
    [emotionCategories.ANGER]: '#ffc88c',
    [emotionCategories.FEAR]: '#bbe7ff',
    [emotionCategories.GRIEF]: '#e938ff'
};

const moodColors = mood => {
    return  mood > 80 ? '#bdf38d' :
            mood > 60 ? '#c0f386' :
            mood > 40 ? '#f3e989' :
            mood > 20 ? '#f3b376' :
            mood ?   '#f36e53' :
                "blue"
};

const emotionColorMapper = feature => {
    return {
        fillColor: feature.emotion ? emotionColors[feature.emotion] : "purple",
        color: "light-grey",
        weight: 0.3,
    };
}

const moodColorMapper = feature => {
    return {
        fillColor: moodColors(feature.mood),
        color: "light-grey",
        weight: 0.3,
    };
}

export default ({toggleShowMode}) => {

    const [distribution, setDistribution] = useState({country: undefined, distribution: []});
    const moodData = useContext(MoodDataContext);
    const emotionData = useContext(EmotionDataContext);

    if (toggleShowMode === "mood" && moodData) {
        const moodCountries = [];
        geoJson.features.map(feature => moodCountries.push([]));
        moodData.map(item => {
            let countryIndex;
            if (item.geo) {
                countryIndex = geoJson.features.findIndex((feature) => feature.properties.name === item.geo.country)
                if (countryIndex !== -1) {
                    moodCountries[countryIndex].push(item.value)
                }
            }
        })
        moodCountries.map(((country, index) => {
            let mean = country.reduce((a, b) => a + b, 0) / country.length
            mean = isNaN(mean) ? 50 : mean;
            geoJson.features[index]["mood"] = mean;
        }))
    }

    if (toggleShowMode === "emotion" && emotionData) {
        const countries = [];
        geoJson.features.map(feature => countries.push([]));
        emotionData.map((item) => {
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
                {
                    name: emotionCategories.FEAR,
                    value: fear.length ? fear.reduce((a, b) => a + b, 0) * fear.length : 0,
                    length: fear.length,
                },
                {
                    name: emotionCategories.ANGER,
                    value: anger.length ? anger.reduce((a, b) => a + b, 0) * anger.length : 0,
                    length: anger.length,
                },
                {
                    name: emotionCategories.GRIEF,
                    value: grief.length ? grief.reduce((a, b) => a + b, 0) * grief.length : 0,
                    length: grief.length,
                },
                {
                    name: emotionCategories.JOY,
                    value: joy.length ? joy.reduce((a, b) => a + b, 0) * joy.length : 0,
                    length: joy.length,
                },
            ];
            const dominantEmotion = sums.reduce((max, emotion) => max.value > emotion.value ? max : emotion);
            geoJson.features[index]["emotion"] = dominantEmotion.name;
            geoJson.features[index]["values"] = dominantEmotion.value;
            geoJson.features[index]["distribution"] = sums;
        })
    }

    const onClickFeature = (feature, layer) => {
        layer.on('click', function (e) {
            if (toggleShowMode === "emotions"){
                const distribution = feature.distribution.map((emotion, index) => {
                    let average = emotion.value / emotion.length / emotion.length;
                    average = isNaN(emotion.value / emotion.length) ? 0 : average;
                    return <div key={index}>
                        <b>{emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)}:</b> {Math.round(average)} ({emotion.length} entries)
                    </div>
                });
                setDistribution({country: feature.properties.name, distribution: distribution})
            }
        });

    }

    return <LeafletMap style={{width: "100%", height: "80vh", zIndex: 0}} center={[20, 0]} zoom={2}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key='my-geojson' data={geoJson} style={toggleShowMode === "emotion" ? emotionColorMapper : moodColorMapper}
                 onEachFeature={onClickFeature}>
            {toggleShowMode === "emotion" && <Popup>
                <span style={{fontSize: "16px"}}>{distribution.country}</span><br/><br/>
                {distribution.distribution.map(emotion => emotion)}
            </Popup>}
        </GeoJSON>
    </LeafletMap>
}
