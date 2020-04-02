import React, { Component } from "react";
import * as d3 from 'd3';


class PosNegChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.posNegEmotionVal,
            width: 650,
            height: 400
        }
        this.chartRef = React.createRef();
        this.drawChart = this.drawChart.bind(this);
    }

    drawChart() {

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

        // data contains positive and negative values
        var series = d3.stack()
            .keys(["pos", "neg"])
            .offset(d3.stackOffsetDiverging)
            (this.state.data);

        var keys = Object.keys(this.state.data);

        const x = d3.scaleBand()
            .domain(this.state.data.map(function (d) { return d.date; }))
            .rangeRound([dimensions.margin.left, dimensions.boundedWidth - dimensions.margin.right])
            .padding(0.1)


        // y axis
        const y = d3.scaleLinear()
            .domain([d3.min(series, this.stackMin), d3.max(series, this.stackMax)])
            .rangeRound([dimensions.boundedHeight - dimensions.margin.bottom, dimensions.margin.top])

        var xAxis = d3.axisBottom(x)
            .tickValues(["2019-04-01", "2019-04-30"])

        bounds.append("g")
            .attr("class", "posNegXAxis")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(xAxis)

        bounds.append("g")
            .attr("transform", "translate(" + dimensions.margin.left + ",0)")
            .call(d3.axisLeft(y))

    }
    componentDidMount() {
        this.drawChart();
    }

    stackMin(layer) {
        return d3.min(layer, function (d) {
            return d[0];
        })
    }

    stackMax(layer) {
        return d3.max(layer, function (d) {
            return d[1];
        })
    }

    render() {
        return (
            <div id='posNegChart' ref="canvas">
            </div>
        );
    }



}
export default PosNegChart;