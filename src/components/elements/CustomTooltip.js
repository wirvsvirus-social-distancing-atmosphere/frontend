import React from "react";
import WordCloud from "./WordCloud";
import emotionCategories from "../../utils/constants";
import {emotionColorsArray} from "./mapModeColors";

const emotionColors = {
    [emotionCategories.JOY]: emotionColorsArray.joy,
    [emotionCategories.ANGER]: emotionColorsArray.anger,
    [emotionCategories.FEAR]: emotionColorsArray.fear,
    [emotionCategories.GRIEF]: emotionColorsArray.grief
};

export default ({emotion, index, setSelectedEmotion}) => {
    let average = emotion.value / emotion.length / emotion.length;
    average = isNaN(emotion.value / emotion.length) ? 0 : average;
    return (
        Math.round(average) !== 0 && <div onClick={() => setSelectedEmotion(emotion)} style={{ marginBottom: 5, width: "100%" }} key={index}>
            <b>
                {emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)}:
            </b>{" "}
            {Math.round(average)} {/*({emotion.length} entries)*/}
            <div
                style={{
                    backgroundColor: emotionColors[emotion.name],
                    width: average + "%",
                    height: 15
                }}
            />
        </div>
    );
}
