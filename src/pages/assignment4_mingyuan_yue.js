import React from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container} from 'react-bootstrap'
import ScatterPlot from './components/scatterPlot'
import BarChart from './components/barChart'
import Tooltip from './components/tooltips'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = React.useState('4');
    //Q1.5 define hooks to link the points and bars
    //Notes: you should define the hooks at the beginning of the component; a hook cannot be defined after the if ... else... statement;
    // State to keep track of the hovered station
    const [hoveredStation, onHover] = React.useState(null); // Added state for hovered station

    const [tooltipData, setTooltipData] = React.useState(null); // Add this line
    const [tooltipX, setTooltipX] = React.useState(null);
    const [tooltipY, setTooltipY] = React.useState(null);
   
    const dataAll = useData(csvUrl);
    if (!dataAll) {
        return <pre>Loading...</pre>;
    };

    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35};
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom-120;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter( d => { 
        return d.month === MONTH[month] 
    });

   
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice()

    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

//Q1.2: Complete the xScaleBar and yScaleBar
//Hint: use d3.scaleBand for xScaleBar
    // Define scales for the bar chart
    const xScaleBar = d3.scaleBand()
    .domain(data.map(d => d.station).reverse())
    .range([0, innerWidth])
    
    const yScaleBar = d3.scaleLinear()
    .domain([0, 4000]) // Fixed domain from 0 to 4000
    .range([innerHeightBar, 0]);

    const changeHandler = (event) => {
        setMonth(event.target.value);
    };

    const onTooltipChange = (event, data) => {
        if (data) {
            setTooltipData(data);
            setTooltipX(event.clientX);
            setTooltipY(event.clientY);
        } else {
            setTooltipData(null);
            setTooltipX(null);
            setTooltipY(null);
        }
    };

    return (
        <Container >
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
                    <br />
                    <input key="monthText" type="text" value={MONTH[month]} readOnly/>
                </Col>
                
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot offsetX={margin.left} offsetY={margin.top} data={data} xScale={xScaleScatter} yScale={yScaleScatter} 
                        height={innerHeightScatter} width={innerWidth} hoveredStation={hoveredStation} onHover={onHover} onTooltipChange={onTooltipChange}/>
                    </svg>
                </Col>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <BarChart offsetX={margin.left} offsetY={margin.top} data={data} xScale={xScaleBar} 
                        yScale={yScaleBar} height={innerHeightBar} width={innerWidth} hoveredStation={hoveredStation} onHover={onHover}/>
                    </svg>
                </Col>
            </Row>
            {/* Q1.6: add the Tooltip 
            1. you should get the selected pointed first and pass it to the <Tooltip />
            2. you should define the hooks for X and Y coordinates of the tooltip; 
            3. to get the position of the mouse event, you can use event.pageX and event.pageY;
            */}
            {/* Tooltip component outside of SVG */}
            {tooltipData && (
                <Tooltip d={tooltipData} x={tooltipX} y={tooltipY} />
            )}
        </Container>
    )   
}


export default Charts