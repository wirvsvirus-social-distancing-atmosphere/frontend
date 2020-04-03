import React, {useEffect} from "react";
import ReactWordcloud from "react-wordcloud";

function WordCloud({data}) {
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
        let tmpWords = [
            {
                value: 1
            }
        ];

        if (data && data.children.length > 0) {
            const min = data.children.reduce(
                (min, p) => (p.size < min ? p.size : min),
                data.children[0].size
            );
            const max = data.children.reduce(
                (max, p) => (p.size > max ? p.size : max),
                data.children[0].size
            );
            const mathValue = (max - min + 1) / 10;
            data.children.forEach(item => {
                tmpWords.push({
                    text: item.name,
                    value: wordCloudValues[Math.round(item.size / mathValue) - 1]
                });
            });
            setWords(tmpWords);
        } else {
            setWords([{text: "No topics yet", value: 10}])
        }
    }, [data]);

    const options = {
        rotationAngles: [0, 10], padding: 1,
        rotations: 3,
    }

    return (
        <div
            style={{
                maxWidth:
                    window.innerWidth > 700 && window.innerHeight < 850 ? "70%" : "90%",
                marginLeft: "auto",
                marginRight: 0
            }}
        >
            <ReactWordcloud
                options={options}
                words={console.log("words", words) || words}
                callbacks={{
                    getWordTooltip: ({text}) =>
                        `${text} ${
                            data.children.find(e => e.name === text)
                                ? "(" + data.children.find(e => e.name === text).size + ")"
                                : ""
                            })`
                }}
                options={{
                    rotations: 0
                }}
            />
        </div>
    );
}

export default WordCloud;
