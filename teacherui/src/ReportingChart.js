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

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        const bar = bounds.selectAll(".layer")
            .data(layers)
            .join("g")
            .attr("class", "layer")
            .attr("fill", layer => {
                return colors(layer);
            })

        bar.selectAll("rect")
            .data(layer => layer)
            .join("rect")
            .style('opacity', 0)
            .attr("x", sequence => {
                return x(sequence.data.month);
            })
            .attr("width", x.bandwidth())
            .attr("y", sequence => y(sequence[1]))
            .attr("height", sequence => y(sequence[0]) - y(sequence[1]))
            .on("mouseover", function (d) {
                var methodName = d3.select(this.parentNode).datum().key;
                //console.log(methodName);
                div.transition()
                    .duration(200)
                    .style("opacity", .7);
                div.html(methodName + ": " + (d[1] - d[0]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);

            })
            .transition().delay(function (d, i) { return i * 850; })
            .duration(850)
            .style('opacity', 1);

        var legend = bounds.append("g")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", dimensions.boundedWidth - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colors)

        legend.append("text")
            .attr("x", dimensions.boundedWidth - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .style("font-weight", "bold")
            .text(function (d) { return d; })
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