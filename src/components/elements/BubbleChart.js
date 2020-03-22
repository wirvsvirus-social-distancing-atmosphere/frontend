import React, { useEffect, useRef } from 'react';
import CirclePack from 'circlepack-chart';
import * as d3 from 'd3'
import firebase from '../../utils/firebase';

const color = d3.scaleOrdinal(d3.schemePaired);

function BubbleChart({data}) {
    const bubbleChartContainer = useRef();
    useEffect(() => {
        if (data) {
            console.log(data)
            d3.select(bubbleChartContainer.current)
                .selectAll("*").remove();
            const bubbleChart = CirclePack();
            bubbleChart
                .data(data)
                .width(300)
                .height(500)
                .size('size')
                .color(d => color(d.name))
                (bubbleChartContainer.current);
        }
    }, [data]);

    return (
        <div ref={bubbleChartContainer} />
    );
}

export default BubbleChart;