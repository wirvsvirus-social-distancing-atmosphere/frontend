import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import firebase from "../../utils/firebase";

function Histogram() {
  const histogramContainer = useRef();

  var now = Date.now();
  var nowRound = Math.round(now);
  const last4Weeks = nowRound - 2419200000 / 4; //TODO: <- expand to 4 weeks (= remove /4)

  const preparedData = items => {
    const day = 86400000;
    const dayArray = [];
    const valuesPerDayArray = [];

    //TODO: expand to 31 days
    for (let x = 7; x >= 0; x--) {
      dayArray.push(new Date(nowRound - x * day));
      valuesPerDayArray.push([]);
    }

    for (let x = 0; x < items.length; x++) {
      for (let i = 0; i < dayArray.length; i++) {
        if (
          dayArray[i].getDate() === new Date(items[x].time).getDate() &&
          dayArray[i].getMonth() === new Date(items[x].time).getMonth()
        ) {
          valuesPerDayArray[i].push(items[x].value);
        }
      }
    }

    let meansPerDay = [];
    for (let x = 0; x < valuesPerDayArray.length; x++) {
      let sum = 0;
      for (let i = 0; i < valuesPerDayArray[x].length; i++) {
        sum += valuesPerDayArray[x][i];
      }
      let mean = sum / valuesPerDayArray[x].length;
      if (isNaN(mean)) {
        mean = 50;
      }
      meansPerDay.push(mean);
    }
    const labels = dayArray.map(date => date.getDate() + ".");
    return { labels: labels, data: meansPerDay };
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("mood")
      .where("time", ">=", last4Weeks)
      .get()
      .then(function(querySnapshot) {
        let items = [];
        querySnapshot.forEach(function(doc) {
          items.push(doc.data());
        });
        const chartData = preparedData(items);
        const data = {
          labels: chartData.labels,
          datasets: [
            {
              label: "World Mood Curve",
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgb(54, 162, 235)",
              cubicInterpolationMode: "monotone",
              fill: false,
              data: chartData.data
            }
          ]
        };

        var ctx = histogramContainer.current.getContext("2d");
        new Chart(ctx, {
          type: "line",
          data,
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            maintainAspectRatio: false,
            responsive: true
          }
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <canvas
      ref={histogramContainer}
      id="histogram"
      responsive="true"
      width="400"
      height="150"
    ></canvas>
  );
}

export default Histogram;
