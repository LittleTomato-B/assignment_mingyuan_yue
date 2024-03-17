// barChart.js: Renders the bar chart for monthly data
// Author: Mingyuan Yue
// Creation Date: 2024-03-17

import React from 'react';
import Bars from './bars';
import XAxis from './xAxis';
import YAxis from './yAxis';

function BarChart({ offsetX, offsetY, data, xScale, yScale, width, height, hoveredStation, onHover }) {
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Bars data={data} xScale={xScale} yScale={yScale} height={height} hoveredStation={hoveredStation} onHover={onHover} />
            <XAxis xScale={xScale} height={height} width={width} />
            <YAxis xScale={xScale} yScale={yScale} height={height} axisLabel={"Bikers start from"} />
        </g>
    );
}

export default BarChart;