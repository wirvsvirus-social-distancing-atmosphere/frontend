import React, { useEffect } from "react";
import ReactWordcloud from "react-wordcloud";

function WordCloud({ data }) {
  const [words, setWords] = React.useState();
  useEffect(() => {
    let tmpWords = [];
    if (data) {
      data.children.forEach(item => {
        tmpWords.push({
          text: item.name,
          value: item.size
        });
      });
      setWords(tmpWords);
    }
  }, [data]);
  return (
    <div style={{ maxHeight: 300, maxWidth: 300 }}>
      <ReactWordcloud words={words} />
    </div>
  );
}

export default WordCloud;
