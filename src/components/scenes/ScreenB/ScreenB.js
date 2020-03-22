import React from "react";
import Ranking from "../../elements/Ranking";

function ScreenB() {
  const [tmpData, setTmpData] = React.useState({
    selektion: ["Zuhause bleiben"],
    modifikation: [
      "Desinfektion",
      "Hände waschen",
      "Desinfektion",
      "Desinfektion"
    ],
    aufmerksamkeit: ["Netflix", "Kuscheln", "Offline"],
    umdeutung: ["Zeit für Familie", "Nachbarn helfen"],
    reaktion: ["Yoga/Meditation"]
  });
  function getPercentagePerItem(data) {
    let newData = {
      selektion: [],
      modifikation: [],
      aufmerksamkeit: [],
      umdeutung: [],
      reaktion: [],
      totalItemsPerCategory: {
        selektion: data.selektion.length,
        modifikation: data.modifikation.length,
        aufmerksamkeit: data.aufmerksamkeit.length,
        umdeutung: data.umdeutung.length,
        reaktion: data.reaktion.length
      }
    };
    Object.keys(data).forEach(function(item) {
      data[item].sort();
      let prev = data[item][0];
      for (let i = 0; i < data[item].length; i++) {
        if (newData[item].length === 0) {
          newData[item][0] = { name: data[item][i], value: 1 };
        } else if (data[item][i] !== prev) {
          newData[item].push({ name: data[item][i], value: 1 });
        } else {
          newData[item][newData[item].length - 1].value++;
        }
        prev = data[item][i];
      }
    });
    return newData;
  }
  function saveNewItem(name, category) {
    let tmp = { ...tmpData };

    tmp[category].push(name); //TODO
    setTmpData(tmp);
  }
  function sortData() {
    let data = { ...tmpData };
    let sortedData = getPercentagePerItem(data);
    sortedData.selektion.sort((a, b) => (a.value < b.value ? 1 : -1));
    sortedData.modifikation.sort((a, b) => (a.value < b.value ? 1 : -1));
    sortedData.aufmerksamkeit.sort((a, b) => (a.value < b.value ? 1 : -1));
    sortedData.umdeutung.sort((a, b) => (a.value < b.value ? 1 : -1));
    sortedData.reaktion.sort((a, b) => (a.value < b.value ? 1 : -1));
    return <Ranking data={sortedData} saveNewItem={saveNewItem} />;
  }
  return <div>{sortData()}</div>;
}

export default ScreenB;
