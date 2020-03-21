import React from "react";
import Ranking from "../../Ranking";

function Admission() {
  const tmpData = {
    selektion: [
      {
        name: "Zuhause bleiben",
        value: 20
      },
      { name: "Zocken is geil.", value: 39 }
    ],
    modifikation: [
      {
        name: " Desinfektion",
        value: 20
      },
      { name: "Hände waschen", value: 39 }
    ],
    aufmerksamkeit: [
      {
        name: "Zuhause bleiben",
        value: 20
      },
      { name: "Zocken is geil.", value: 39 }
    ],
    regulation: [
      {
        name: "Yoga/Meditation",
        value: 20
      },
      { name: "Zocken is geil.", value: 39 }
    ]
  };
  return (
    <div>
      <Ranking data={tmpData} />
    </div>
  );
}

export default Admission;
