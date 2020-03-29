import {GeoJSON, Map as LeafletMap, Popup, TileLayer} from "react-leaflet";
import React, {useContext, useState} from "react";

import MoodDataContext from '../../state/MoodDataContext';
import EmotionDataContext from '../../state/EmotionDataContext';
import CoronaDataContext from '../../state/CoronaDataContext';

import geoJson from "../../res/geo";
import emotionCategories from '../../utils/constants';

const emotionColors = {
    [emotionCategories.JOY]: '#bdf38d',
    [emotionCategories.ANGER]: '#ffc88c',
    [emotionCategories.FEAR]: '#bbe7ff',
    [emotionCategories.GRIEF]: '#e938ff'
};

const moodColors = mood => {
    return mood > 90 ? '#1c9f34' :
        mood > 80 ? '#2bf350' :
            mood > 60 ? '#99f37d' :
                mood > 50 ? '#ccff8b' :
                    mood > 40 ? '#fff6df' :
                        mood > 20 ? '#f3b376' :
                            mood ? '#67051a' :
                                "black"
};

const coronaColors = (corona, max) => {
    corona = corona / max * 8;
    return corona > 90 ? '#c70932' :
        corona > 85 ? '#df694b' :
            corona > 80 ? '#f3956b' :
                corona > 70 ? '#f3b376' :
                    corona > 60 ? '#ffc472' :
                        corona > 50 ? '#f0e25e' :
                            corona > 40 ? '#efed6a' :
                                corona > 30 ? '#fff063' :
                                    corona > 20 ? '#e4ff84' :
                                        corona > 10 ? '#ccff8b' :
                                            corona > 5 ? '#b3f37f' :
                                                corona >= 0 ? '#99f37d' :
                                                    isNaN(corona) ? 'black' :
                                                        corona ? '#67051a' :
                                                            "black"
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

const coronaColorMapper = feature => {
    return {
        fillColor: coronaColors(feature.corona, feature.coronamax),
        color: "light-grey",
        weight: 0.3,
    };
}

export default ({toggleShowMode}) => {

    const [distribution, setDistribution] = useState({country: undefined, distribution: []});
    const [mood, setMood] = useState({country: undefined, mood: undefined});
    const moodData = useContext(MoodDataContext);
    const emotionData = useContext(EmotionDataContext);
    const coronaData = useContext(CoronaDataContext);

    if (coronaData) {
        let minMaxArray = [];
        coronaData.map(country => {
            const rate = country.today.confirmed / country.latest_data.confirmed
            if (!isNaN(rate)) {
                minMaxArray.push(rate)
            }
        });
        const max = Math.max(...minMaxArray);
        geoJson.features.map((feature, index) => {
            let coronaCountry = coronaData.find((country) => feature.properties.name === country.name)
            if (!coronaCountry) {
                coronaCountry = coronaData.find((country) => feature.properties.iso_a2 === country.code)
            }
            if (!coronaCountry) {
                coronaCountry = coronaData.find((country) => feature.properties.iso_a3 === country.code)
            }
            if (coronaCountry) {
                //if(feature.properties.name === "Haiti"){console.log("usa", coronaCountry)}
                const coronaLatest = coronaCountry.latest_data.confirmed;
                const coronaToday = coronaCountry.today.confirmed;
                feature.corona = (coronaToday / coronaLatest ) * 100;
                feature.coronamax = max
            }
        })
        //coronaData.sort((a, b) => a.name.localeCompare(b.name));
    }

    if ((toggleShowMode === "mood" || toggleShowMode === "corona") && moodData) {
        moodData.features.map((country, index) => {
            geoJson.features[index]["mood"] = country.mood;
        })
    }

    if (toggleShowMode === "emotion" && emotionData) {
        emotionData.features.map((country, index) => {
            geoJson.features[index]["emotion"] = country.emotion;
            geoJson.features[index]["values"] = country.values;
            geoJson.features[index]["distribution"] = country.distribution;
        })
    }

    const onClickFeature = (feature, layer) => {
        layer.on('click', function (e) {
            if (feature.distribution) {
                const distribution = feature.distribution.map((emotion, index) => {
                    let average = emotion.value / emotion.length / emotion.length;
                    average = isNaN(emotion.value / emotion.length) ? 0 : average;
                    return <div key={index}>
                        <b>{emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)}:</b> {Math.round(average)} ({emotion.length} entries)
                    </div>
                });
                setDistribution({country: feature.properties.name, distribution: distribution})
            }
            if (feature.mood) {
                const mood = <div>
                    <b>Average mood:</b> {feature.mood}
                </div>
                setMood({country: feature.properties.name, mood: mood})
            }
        });

    };

    return <LeafletMap style={{width: "100%", height: "80vh", zIndex: 0}} center={[20, 0]} zoom={2}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key='my-geojson' data={geoJson}
                 style={toggleShowMode === "emotion" ? emotionColorMapper : toggleShowMode === "mood" ? moodColorMapper : coronaColorMapper}
                 onEachFeature={onClickFeature}>
            {toggleShowMode === "emotion" && <Popup>
                <span style={{fontSize: "16px"}}>{distribution.country}</span><br/><br/>
                {distribution.distribution.map(emotion => emotion)}
                Corona daily growth: {Math.round(geoJson.features.find(feature => mood.country === feature.properties.name) ? geoJson.features.find(feature => mood.country === feature.properties.name).corona : "Not found")}%
            </Popup>}
            {toggleShowMode !== "emotion" && <Popup>
                <span style={{fontSize: "16px"}}>{mood.country}</span><br/><br/>
                <b>Corona daily growth:</b> {Math.round(geoJson.features.find(feature => mood.country === feature.properties.name) ? geoJson.features.find(feature => mood.country === feature.properties.name).corona : "Not found")}%
                {mood.mood}
            </Popup>}
        </GeoJSON>
    </LeafletMap>
}
