import {GeoJSON, Map as LeafletMap, Popup, TileLayer} from "react-leaflet";
import React, {useContext, useState} from "react";

import MoodDataContext from '../../state/MoodDataContext';
import EmotionDataContext from '../../state/EmotionDataContext';

import geoJson from "../../res/geo";
import emotionCategories from '../../utils/constants';
import * as firebase from "firebase";

const emotionColors = {
    [emotionCategories.JOY]: '#bdf38d',
    [emotionCategories.ANGER]: '#ffc88c',
    [emotionCategories.FEAR]: '#bbe7ff',
    [emotionCategories.GRIEF]: '#e938ff'
};

const moodColors = mood => {
    return mood > 80 ? '#bdf38d' :
        mood > 60 ? '#c0f386' :
            mood > 40 ? '#fff6df' :
                mood > 20 ? '#f3b376' :
                    mood ? '#f36e53' :
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

export default ({toggleShowMode}) => {

    const [distribution, setDistribution] = useState({country: undefined, distribution: []});
    const moodData = useContext(MoodDataContext);
    const emotionData = useContext(EmotionDataContext);

    if (toggleShowMode === "mood" && moodData) {
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
        });

    };

    return <LeafletMap style={{width: "100%", height: "80vh", zIndex: 0}} center={[20, 0]} zoom={2}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key='my-geojson' data={geoJson}
                 style={toggleShowMode === "emotion" ? emotionColorMapper : moodColorMapper}
                 onEachFeature={onClickFeature}>
            {toggleShowMode === "emotion" && <Popup>
                <span style={{fontSize: "16px"}}>{distribution.country}</span><br/><br/>
                {distribution.distribution.map(emotion => emotion)}
            </Popup>}
        </GeoJSON>
    </LeafletMap>
}
