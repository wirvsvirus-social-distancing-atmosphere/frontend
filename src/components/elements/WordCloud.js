import React, {useContext, useEffect} from "react";
import ReactWordcloud from "react-wordcloud";
import {makeStyles} from "@material-ui/core/styles";

import EmotionDataContext from '../../state/EmotionDataContext';
import breakpoints from '../../breakpoints';

const useStyles = makeStyles(theme => ({
    root: {
        height: '300px',
        width: '250px',
        marginLeft: "auto",
        marginRight: 0,
        width: '100%',

        [`@media ${breakpoints.tablet}`]: {
            height: '400px',
            width: '500px',
        },
        [`@media ${breakpoints.desktop}`]: {
            height: '500px',
            width: '600px',
        },
    },
}));

function WordCloud({selectedEmotion, country = undefined, region = undefined, parent}) {
    const classes = useStyles();

    const emotionData = useContext(EmotionDataContext);
    const [words, setWords] = React.useState();
    console.log(parent)

    const wordCloudValues = [
        5,
        6,
        7.25,
        8.8125,
        10.7656,
        13.207,
        16.2587,
        20.0733,
        24.8415,
        30.8018
    ];

    useEffect(() => {

        let avg = 0;
        const tempData = {};
        const children = [];
        let selection = [];
        if (emotionData && emotionData.emotions) {
            selection = emotionData.emotions.filter(emotion => emotion.category === selectedEmotion);

            {console.log("preselection", selection, selectedEmotion,country, region)}
            if(country){
                //TODO: activate region-specific selection when we have enough emotion data
                /*if(region){
                    selection = selection.filter(emotion => emotion.geo && emotion.geo.region && emotion.geo.region === region);
                } else {
                    selection = selection.filter(emotion => emotion.geo && emotion.geo.country && emotion.geo.country === country);
                }*/
                selection = selection.filter(emotion => emotion.geo && emotion.geo.country && emotion.geo.country === country);
            }

            {console.log("selection", selection, country, region)}
            selection.forEach(entry => {
                    const d = entry;
                    avg += d.value;
                    if (!tempData[d.emotion]) {
                        tempData[d.emotion] = {
                            count: 0,
                            value: 0
                        };
                    }
                tempData[d.emotion] = {
                        count: tempData[d.emotion].count + 1,
                        value: tempData[d.emotion].value + d.value
                    };
                }
            );
            avg /= selection.length;
        }
        Object.keys(tempData).forEach(key => {
            children.push({
                name: key,
                size: tempData[key].count /* / selection.length */
            });
        });

        const structurizedData = {
            name: "",
            children
        }

        let tmpWords = [
            {
                value: 1
            }
        ];

        if (structurizedData && structurizedData.children.length > 0) {
            const min = structurizedData.children.reduce(
                (min, p) => (p.size < min ? p.size : min),
                structurizedData.children[0].size
            );
            const max = structurizedData.children.reduce(
                (max, p) => (p.size > max ? p.size : max),
                structurizedData.children[0].size
            );
            const mathValue = (max - min + 1) / 10;
            structurizedData.children.forEach(item => {
                tmpWords.push({
                    text: item.name,
                    value: wordCloudValues[Math.round(item.size / mathValue) - 1]
                });
            });
            setWords(tmpWords);
        } else {
            setWords([{text: "No topics yet", value: 10}])
        }
    }, [emotionData, selectedEmotion]);

    const options = {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSizes: [12, 20],
        rotationAngles: [0, 90],
        rotations: 1,
        scale: 'sqrt',
        spiral: 'rectangular',
        deterministic: true,
    }

    return (
        <div
            className={ classes.root }
        >
            <ReactWordcloud
                options={options}
                words={words}
                size={ parent ? [parent.clientWidth, parent.clientHeight] : undefined }
                /*callbacks={{
                    getWordTooltip: ({text}) =>
                        `${text} ${
                            emotionData.children.find(e => e.name === text)
                                ? "(" + emotionData.children.find(e => e.name === text).size + ")"
                                : ""
                            }`
                }}*/
            />
        </div>
    );
}

export default WordCloud;
