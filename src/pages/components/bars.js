// bars.js: Renders bars for the bar chart
// Author: Mingyuan Yue
// Creation Date: 2024-03-13

import React, { useState } from 'react';

function Bars({ data, xScale, yScale, height, hoveredStation, onHover }) {
    // This function determines the color of a bar based on the hovered station.
    const getColor = (currentStation) => currentStation === hoveredStation ? 'red' : 'steelblue';

    // Event handlers for mouse enter and leave
    const handleMouseEnter = (station) => {
        // Check if onHover is a function before calling it
        if (typeof onHover === 'function') {
            onHover(station);
        }
    };

    const handleMouseLeave = () => {
        // Check if onHover is a function before calling it
        if (typeof onHover === 'function') {
            onHover(null);
        }
    };

    return (
        <g className="bars">
            {data.map((d, index) => (
                <rect
                    key={index}
                    x={xScale(d.station)}
                    y={yScale(d.start)}
                    width={xScale.bandwidth()}
                    height={height - yScale(d.start)}
                    fill={getColor(d.station)} // Use the getColor function
                    stroke="black"
                    strokeWidth="1"
                    onMouseEnter={() => handleMouseEnter(d.station)} // Call handleMouseEnter with the station
                    onMouseLeave={handleMouseLeave} // Call handleMouseLeave
                />
            ))}
        </g>
    );
}

export default Bars;