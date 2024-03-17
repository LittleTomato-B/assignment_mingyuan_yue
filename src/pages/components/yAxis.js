// yAxis.js: Renders the Y-axis of the scatter plot or bar chart based on scale type
// Author: Mingyuan Yue
// Creation Date: 2024-03-17

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Import the xCale just for typechecking whether this is a scatterplot or a barchart
function YAxis({ xScale, yScale, height, axisLabel }) {
    const axisRef = useRef();

    useEffect(() => {
        // Create the Y-axis generator
        const yAxisGenerator = d3.axisLeft(yScale).tickSizeOuter(0);

        // Apply the axis generator to the ref
        const yAxis = d3.select(axisRef.current).call(yAxisGenerator);

        // Modify the font size of ticks
        yAxis.selectAll("text")
            .style("font-size", "10.5px");

        // Remove any existing axis-label before appending a new one
        yAxis.select(".axis-label").remove();

        // Append the axis label text
        // Note: In D3 v5 and above, the second parameter of selection.append can be a function that returns the element to append.
        // Modify the position of the axis label of the two charts individually
        if (typeof xScale.bandwidth === 'function') {

            d3.select(axisRef.current)
            .append("text")
            .attr("class", "axis-label")
            .attr("transform", `rotate(-90) translate(${-height / 2 + 120}, 20)`) // Centralize the label and adjust the position to the left of the axis
            .style("text-anchor", "end")
            .style("fill", "black") // Ensure the label is filled with black color
            .style("font-size", "18px") // Set the font size here
            .text(axisLabel);

        } else {

            d3.select(axisRef.current)
            .append("text")
            .attr("class", "axis-label")
            .attr("transform", `rotate(-90) translate(${-height / 2 + 180}, 20)`) // Centralize the label and adjust the position to the left of the axis
            .style("text-anchor", "end")
            .style("fill", "black") // Ensure the label is filled with black color
            .style("font-size", "18px") // Set the font size here
            .text(axisLabel);
        }
        

    }, [yScale, height, axisLabel]);

    // Return the Y-axis group element with the transformation applied to centralize it vertically
    return <g ref={axisRef} transform={`translate(0,0)`}></g>;
}

export default YAxis;