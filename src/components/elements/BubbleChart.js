import React, { useEffect, useRef } from 'react';
import CirclePack from 'circlepack-chart';
import * as d3 from 'd3'

const color = d3.scaleOrdinal(d3.schemePaired);

function BubbleChart({
    data = {
        name: '',
        children: [{
            name: 'Unemployment',
            size: 16
        }, {
            name: 'Depression',
            size: 27
        }, {
            name: 'Family loss',
            size: 8.4
        }, {
            name: 'Isolation',
            size: 5
        }]
    }
}) {
    const bubbleChartContainer = useRef();

    useEffect(() => {
        const bubbleChart = CirclePack();
        bubbleChart
            .data(data)
            .width(bubbleChartContainer.current.parentElement.clientWidth - 32)
            .height(500)
            .size('size')
            .color(d => color(d.name))
            (bubbleChartContainer.current);
    }, []);

    return (
        <div ref={bubbleChartContainer} />
    );
}

export default BubbleChart;