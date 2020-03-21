import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function Histogram({
    data = {
        labels: ['15.03.2020', '16.03.2020', '17.03.2020', '18.03.2020', '19.03.2020', '20.03.2020', '21.03.2020'],
        datasets: [{
            label: '# Anzahl',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            cubicInterpolationMode: 'monotone',
            fill: false,
            data: [100, 125, 191, 185, 215, 225, 128]
        }]
    },
}) {
    const histogramContainer = useRef();

    useEffect(() => {
        var ctx = histogramContainer.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true
            }
        });
    }, []);

    return (
        <canvas ref={histogramContainer} id="histogram" responsive="true" width="200" height="100"></canvas>
    );
}

export default Histogram;