import React, { Component } from "react";
import * as d3 from 'd3';


class PosNegChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.depressiveInfo,
            width: 450,
            height: 200
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
    }
    componentDidMount() {
        this.drawChart();
    }

    render() {
        return (
            <div id='posNegChart' ref="canvas">
            </div>
        );
    }



}
export default PosNegChart;