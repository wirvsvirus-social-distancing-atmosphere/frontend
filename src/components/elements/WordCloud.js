import React, {useContext, useEffect} from "react";
import ReactWordcloud from "react-wordcloud";

import EmotionDataContext from '../../state/EmotionDataContext';

function WordCloud({selectedEmotion}) {

    const emotionData = useContext(EmotionDataContext);
    const [words, setWords] = React.useState();

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
        rotationAngles: [0, 90],
        rotations: 1,
        scale: 'sqrt',
        spiral: 'rectangular',
        deterministic: true,
    }

    return (
        <div
            style={{
                marginLeft: "auto",
                marginRight: 0,
                width: '100%'
            }}
        >
            <ReactWordcloud
                options={options}
                words={words}
                callbacks={{
                    getWordTooltip: ({text}) =>
                        `${text} ${
                            emotionData.children.find(e => e.name === text)
                                ? "(" + emotionData.children.find(e => e.name === text).size + ")"
                                : ""
                            }`
                }}
            />
        </div>
    );
}

export default WordCloud;
