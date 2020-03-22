/* 
Fragen:
  - wird itemanteil in DB berechnet?
  - Text für Finish, und wo gelangt man hin, wenn man darauf klickt?
*/

import React from "react";
import Ranking from "../../elements/Ranking";

function ScreenB() {
  const [tmpData, setTmpData] = React.useState({
    selektion: [
      {
        name: "Zuhause bleiben",
        value: 20.2
      },
      { name: "Zocken is geil.", value: 39 },
      {
        name: "Zuhause bleiben",
        value: 20
      },
      { name: "Zocken is geil.", value: 39 },
      {
        name: "Zuhause bleiben",
        value: 20
      },
      { name: "Zocken is geil.", value: 39 },
      {
        name: "Zuhause bleiben",
        value: 20
      },
      { name: "Zuhause bleiben", value: 39 }
    ],
    modifikation: [
      {
        name: " Desinfektion",
        value: 20
      },
      { name: "Hände waschen", value: 4 }
    ],
    aufmerksamkeit: [
      {
        name: "Netflix",
        value: 15
      },
      { name: "Kuscheln", value: 14 },
      { name: "Offline", value: 24 }
    ],
    umdeutung: [
      {
        name: "Zeit für Familie",
        value: 34
      },
      { name: "Nachbarn helfen", value: 39 }
    ],
    reaktion: [
      {
        name: "Yoga/Meditation",
        value: 20
      }
    ]
  });
  function saveNewItem(name, category) {
    let tmp = { ...tmpData };
    tmp[category].push({ name: name, value: 37 });
    setTmpData(tmp);
  }
  function sortData() {
    let sortedData = { ...tmpData };
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
