import React, { Component } from 'react';
import * as d3 from 'd3';
import { stackOrderAscending } from 'd3';

class ReportingChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.reportingMethods,
            width: 700,
            height: 300,
        }

        this.chartRef = React.createRef();
        this.drawChart = this.drawChart.bind(this);
    }

    drawChart() {
        var colors = d3.scaleOrdinal().range(["#AD1457", "#F57C00", "#8E24AA"]);

        var keys = ["auto", "classmate", "self"]

        let dimensions = {
            margin: {
                top: 15,
                right: 15,
                bottom: 40,
                left: 60,
            }
        }

        dimensions.boundedWidth = this.state.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = this.state.height - dimensions.margin.top - dimensions.margin.bottom;

        const wrapper = d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', this.state.width)
            .attr('height', this.state.height)

        const bounds = wrapper.append("g")
            .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)

        // x scale 

        var x = d3.scaleBand()
            .range([0, dimensions.boundedWidth])
            .padding(0.15);


        x.domain(this.state.data.map(function (d) {
            return d.month;
        }));

        // drawing x-axis
        bounds.append('g')
            .attr("class", 'x-axis')
            .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
            .call(d3.axisBottom(x));

        // configure stacking
        
        // layer with lowest some comes first
        const stackGenerator = d3.stack().keys(keys)
                            .order(stackOrderAscending);

        // creating layers
        const layers = stackGenerator(this.state.data);
        const extent = [0, d3.max(layers, layer => d3.max(layer, sequence => sequence[1]))];

        const y = d3.scaleLinear()
            .domain(extent)
            .range([dimensions.boundedHeight, 0]);

        bounds.append('g')
            .attr("class", 'y-axis')
            .call(d3.axisLeft(y));

        bounds.selectAll(".layer")
            .data(layers)
            .join("g")
            .attr("class", "layer")
            .attr("fill", layer => {
                return colors(layer);
            })
            .selectAll("rect")
            .data(layer => layer)
            .join("rect")
            .attr("x", sequence => {
                console.log(sequence);
                return x(sequence.data.month);
            })
            .attr("width", x.bandwidth())
            .attr("y", sequence => y(sequence[1]))
            .attr("height", sequence => y(sequence[0]) - y(sequence[1]))
            .attr("stroke", "#464646")
            .attr("stroke-width", 0.6);


    }
    
    componentDidMount() {
        this.drawChart();
    }

    render() {
        return (
            <div id='reportingMethods' ref="canvas" >
            </div>
        )
    }
}
export default ReportingChart;