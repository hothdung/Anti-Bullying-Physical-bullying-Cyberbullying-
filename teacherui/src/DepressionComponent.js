import React, { Component } from 'react';
import * as d3 from 'd3';


class DepressionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.depressiveInfo,
            yAxisAttribute: "name",
            xAxisAttribute: "days",
            statusInfo: "status",
            width: 500,
            height: 300
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
                left: 20,
            }
        }

        dimensions.boundedWidth = this.state.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = this.state.height - dimensions.margin.top - dimensions.margin.bottom;

        const wrapper = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height)

        const bounds = wrapper.append("g")
            .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

        var states = ["normal", "mild", "help needed", "depressive"],
            segmentWidth = 80;

        var colors = ['#4CDC4C', '#FFFF00', '#ffae19', '#ff0000'];
        var color = d3.scaleOrdinal()
            .domain(states)
            .range(colors);

        bounds.append('rect')
            .attr("class", "initialRect")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("fill", "#b1b1b1")
            .attr("height", 15)
            .attr("width", function () {
                return segmentWidth * states.length;
            })
            .attr("x", 0);

        var progressBar = bounds.selectAll("progressB")
            .data(this.state.data)
            .enter()
            .append("rect")
            .attr("class", "progress-bar")
            .attr('height', 15)
            .attr('rx', 10)
            .attr('ry', 10)
            .attr('x', 0);

        var text = bounds.append('g')
            .append("text")
            .attr("fill", "black")
            .attr("x", 100)
            .attr("y", 100)
            .attr("text-anchor", "start")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .text(function (d) {
                console.log("here" + d.yAxisAttribute);
                return d.statusInfo;
            })

        progressBar.transition()
            .duration(2000)
            .attr("fill", function (d) {
                return color(d.status);
            })
            .attr('width', function (d) {
                var index = states.indexOf(d.status);
                console.log("This is the index" + index);
                return (index + 1) * segmentWidth;
            })

    }

    componentDidMount() {
        this.drawChart();

    }
    render() {
        return (
            <div id='depressiveInfo' ref="canvas"></div>
        )
    }
}
export default DepressionComponent;