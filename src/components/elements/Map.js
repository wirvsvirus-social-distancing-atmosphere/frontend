import {GeoJSON, Map as LeafletMap, Popup, TileLayer} from "react-leaflet";
import React, {useContext, useRef, useState} from "react";

import MoodDataContext from "../../state/MoodDataContext";
import EmotionDataContext from "../../state/EmotionDataContext";
import CoronaDataContext from "../../state/CoronaDataContext";
import {coronaColorsArray, emotionColorsArray, moodColorsArray} from "./mapModeColors";

import geoJson from "../../res/geo";
import emotionCategories from "../../utils/constants";
import CustomTooltip from "./CustomTooltip";
import WordCloud from "./WordCloud";
import EmotionContext from "../../state/EmotionContext";
import {FormControl, InputLabel, MenuItem, Paper, Select} from "@material-ui/core";
import CustomPopup from "./CustomPopup";

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
    if (feature.emotion === "unknown") {
        feature.emotion = undefined
    }
    return {
        fillColor: feature.emotion ? emotionColors[feature.emotion] : "#fff6df",
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

export default ({toggleShowMode}) => {
    const [distribution, setDistribution] = useState({
        country: undefined,
        distribution: []
    });
    const [mood, setMood] = useState({country: undefined, mood: undefined});
    const moodData = useContext(MoodDataContext);
    const emotionData = useContext(EmotionDataContext);
    const emotion = useContext(EmotionContext);
    const coronaData = useContext(CoronaDataContext);
    const [selectedEmotion, setSelectedEmotion] = useState();
    const [wrapper, setWrapper] = useState();
    const [onOff, setOnOff] = useState();

    const wordCloudParent = useRef();

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
        layer.on("click", function (e) {
            console.log("event", e)
            if (feature.distribution) {
                const distribution = feature.distribution.map((emotion, index) => {
                    return <CustomTooltip key={index} emotion={emotion} index={index}
                                          setSelectedEmotion={setSelectedEmotion}/>
                })
                const maxValueEmotion = distribution.reduce((prev, current) => {
                        return (prev && (prev.props.emotion.value > current.props.emotion.value)) ? prev : current;
                    }, undefined
                )
                setDistribution({
                    country: feature.properties.name,
                    region: feature.properties.region ? feature.properties.NAME_1 : undefined,
                    regionCode: feature.properties.region ? feature.properties.region : undefined,
                    distribution: distribution,
                    maxValueEmotion: maxValueEmotion.props.emotion.value > 0 ? maxValueEmotion : undefined,
                });
            }
            if (feature.mood) {
                const mood = (
                    <div>
                        <b>Average mood:</b> {Math.round(feature.mood)}
                    </div>
                );
                setMood({country: feature.properties.name, mood: mood});
            }
        });
    };

    console.log("semo", selectedEmotion)

    return (
        <LeafletMap
            onPopupOpen={() => {
                setSelectedEmotion(false)
            }}
            onPopupClose={() => {
                setSelectedEmotion(false)
            }}
            style={{width: "100%", height: "80vh", zIndex: 0}}
            center={[50, 5]}
            zoom={4}
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
                    <CustomPopup >
                        <span
                            style={{fontSize: "16px"}}>{distribution.region ? distribution.region : distribution.country}</span>
                        <br/>
                        <br/>
                        {distribution.distribution.map(emotion => emotion)}
                        {distribution.maxValueEmotion && <Paper style={{marginTop: 20, maxWidth: "250px"}}>
                            <div style={{padding: 10}}><span style={{fontSize: 16, fontWeight: "bold", }}>Most popular reasons</span>
                            <FormControl
                                style={{marginTop: 10, width: "100%", backgroundColor: "rgba(239,65,52,0.05)"}}>
                                <InputLabel htmlFor='position-simple'>Select an emotion</InputLabel>
                                <Select
                                    value={selectedEmotion ? selectedEmotion : distribution.maxValueEmotion.props.emotion.name }
                                    onChange={event => {
                                        setSelectedEmotion(event.target.value);
                                    }}>
                                    <MenuItem value={'fear'}>Fear</MenuItem>
                                    <MenuItem value={'anger'}>Anger</MenuItem>
                                    <MenuItem value={'joy'}>Joy</MenuItem>
                                    <MenuItem value={'grief'}>Grief</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                            <div ref={ wordCloudParent } style={{height: 300}}>
                                <WordCloud
                                    parent={ wordCloudParent.current }
                                    country={distribution.country}
                                    region={distribution.regionCode}
                                    selectedEmotion={selectedEmotion ? selectedEmotion : distribution.maxValueEmotion.props.emotion.name}/>
                            </div>
                        </Paper>}
                        {/*Corona 3-days-growth: {Math.round(geoJson.features.find(feature => mood.country === feature.properties.name) ? geoJson.features.find(feature => mood.country === feature.properties.name).corona : "Not found")}%*/}
                    </CustomPopup>
                )}
                {toggleShowMode !== "emotion" && (
                    <Popup>
                        <span style={{fontSize: "16px"}}>{mood.country}</span>
                        <br/>
                        <br/>
                        {/*<b>Corona 3-days-growth:</b> {Math.round(geoJson.features.find(feature => mood.country === feature.properties.name) ? geoJson.features.find(feature => mood.country === feature.properties.name).corona : "Not found")}%*/}
                        {mood.mood}
                    </Popup>
                )}
            </GeoJSON>
        </LeafletMap>
    );
};
