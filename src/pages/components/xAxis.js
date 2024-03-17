// xAxis.js: Renders the X-axis of the scatter plot or bar chart with conditional formatting
// Author: Mingyuan Yue
// Creation Date: 2024-03-17

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function XAxis({ xScale, height, axisLabel }) {
    const axisRef = useRef();

    useEffect(() => {
        // Create the X-axis generator
        const xAxisGenerator = d3.axisBottom(xScale);

        // If it's a bar chart (scaleBand), remove the ticks
        if (typeof xScale.bandwidth === 'function') {
            xAxisGenerator.tickSize(0);
        }
        
        // Modify the font size of ticks
        xAxisGenerator.tickFormat(d => d.toString()).tickSizeOuter(0);

        // Call the axis generator on the ref
        const xAxis = d3.select(axisRef.current).call(xAxisGenerator);

        // Modify the font size of ticks
        xAxis.selectAll("text")
            .style("font-size", "10.5px");

        // Remove any existing axis-label before appending a new one
        xAxis.select(".axis-label").remove();

        // Conditional formatting for bar chart
        if (typeof xScale.bandwidth === 'function') {
            xAxis.selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", ".25em")
                .attr("dy", ".25em")
                .attr("transform", "rotate(75)");
        } else {
            // For scatter plot, center the text and add the axis label
            xAxis.selectAll("text")
                .style("textAnchor", "middle");
            
            // Append the axis label text for scatter plot only
            d3.select(axisRef.current)
                .append("text")
                .attr("class", "axis-label")
                .attr("x", 545)
                .attr("y", -10)
                .style("text-anchor", "end")
                .style("fill", "black")
                .style("font-size", "18px")
                .text(axisLabel);
        }
    }, [xScale, axisLabel]);

    // Return the X-axis group element
    return <g ref={axisRef} transform={`translate(0,${height})`}></g>;
}

export default XAxis;