// points.js: Renders the points of the scatter plot with stroke around each point
// Author: Mingyuan Yue
// Creation Date: 2024-03-17

import React from 'react';

function Points({ data, xScale, yScale, hoveredStation, onHover, onTooltipChange }) {
    // Determines the color of a point; red if hovered, otherwise steelblue.
    const getColor = (station) => station === hoveredStation ? 'red' : 'steelblue';

    // Determines the radius of a point; 10 if hovered, otherwise 5.
    const getRadius = (station) => station === hoveredStation ? 10 : 5;

    const handleMouseEnter = (event, d) => {
        onHover(d.station);
        onTooltipChange(event, d);
    };

    const handleMouseLeave = () => {
        onHover(null);
        onTooltipChange(null, null);
    };

    // Render the points or an empty group if no data is present.
    return (
        <g>
            {/* Draw all points */}
            {data?.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.tripdurationS)}
                    cy={yScale(d.tripdurationE)}
                    r={getRadius(d.station)}
                    fill={getColor(d.station)}
                    stroke="black"
                    strokeWidth="1"
                    onMouseEnter={(event) => handleMouseEnter(event, d)} // Pass both the event and data
                />
            ))}
            {/* If a station is hovered, draw a yellow rectangle to cover other points */}
            {hoveredStation && (
                <rect
                    x={0}
                    y={0}
                    width="91%"
                    height="90%"
                    fill="yellow"
                    fillOpacity="0.5"
                />
            )}
            {hoveredStation && data.filter(d => d.station === hoveredStation).map((d, i) => (
                <circle
                    key={`hover-${i}`} // Ensuring unique key for React
                    cx={xScale(d.tripdurationS)}
                    cy={yScale(d.tripdurationE)}
                    r={getRadius(d.station)} // Adjusted size for the hovered point
                    fill={getColor(d.station)} // Adjusted color for the hovered point
                    stroke="black"
                    strokeWidth="1"
                    onMouseOut={handleMouseLeave} // Using onMouseOut to hide tooltip and unhighlight
                />
            ))}
        </g>
    );
}

export default Points; // Export the Points component