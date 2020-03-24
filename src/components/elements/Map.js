import {GeoJSON, Map as LeafletMap, TileLayer} from "react-leaflet";
import React from "react";
import geoJson from "../../res/geo";

const testEmotions = [
    {
        emotion: "fear",
        time: 123234324,
        value: 78,
    },
    {
        emotion: "fear",
        time: 123234324,
        value: 78,
        geo: {country: "France"},
    },
    {
        emotion: "grief",
        time: 123234324,
        value: 78,
        geo: {country: "France"},
    },
    {
        emotion: "fear",
        time: 123234324,
        value: 78,
        geo: {country: "France"},
    },
    {
        emotion: "anger",
        time: 123234324,
        value: 78,
        geo: {country: "France"},
    },
    {
        emotion: "fear",
        time: 123234324,
        value: 78,
        geo: {country: "France"},
    },
    {
        emotion: "anger",
        time: 123234324,
        value: 78,
        geo: {country: "Germany"},
    },
];

const countries = [];
geoJson.features.map(feature => countries.push([]));
testEmotions.map((item) => {
    if (item.geo) {
        const countryIndex = geoJson.features.findIndex((feature) => feature.properties.name === item.geo.country)
        countries[countryIndex].push({emotion: item.emotion, value: item.value})
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
        {name: "fear", value: fear.reduce((a, b) => a + b, 0) * fear.length},
        {name: "anger", value: anger.reduce((a, b) => a + b, 0) * anger.length},
        {name: "grief", value: grief.reduce((a, b) => a + b, 0) * grief.length},
        {name: "joy", value: joy.reduce((a, b) => a + b, 0) * joy.length},
    ];
    const dominantEmotion = sums.reduce((max, emotion) => max.value > emotion.value ? max : emotion);
    geoJson.features[index]["emotion"] = dominantEmotion.name;
})


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

    return <LeafletMap style={{width: "100%", height: "80vh", zIndex: 0}} center={[20, 0]} zoom={2}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key='my-geojson' data={geoJson} style={colorMapper}/>
    </LeafletMap>
}
