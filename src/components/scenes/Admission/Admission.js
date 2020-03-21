/* 
    "New" Label ? --> <span className="new badge"></span>
*/

import React from "react";
import Ranking from "../../Ranking";

function Admission() {
  const tmpData = {
    selektion: [
      {
        name: "Zuhause bleiben",
        value: 202
      },
      { name: "Zocken is geil.", value: 39 }
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
        value: 345
      },
      { name: "Nachbarn helfen", value: 39 }
    ],
    reaktion: [
      {
        name: "Yoga/Meditation",
        value: 20
      }
    ]
  };

  function sortData() {
    let sortedData = { ...tmpData };
    sortedData.selektion.sort((a, b) => (a.value > b.value ? 1 : -1));
    sortedData.modifikation.sort((a, b) => (a.value > b.value ? 1 : -1));
    sortedData.aufmerksamkeit.sort((a, b) => (a.value > b.value ? 1 : -1));
    sortedData.umdeutung.sort((a, b) => (a.value > b.value ? 1 : -1));
    sortedData.reaktion.sort((a, b) => (a.value > b.value ? 1 : -1));
    return <Ranking data={sortedData} />;
  }
  return <div>{sortData()}</div>;
}

export default Admission;
