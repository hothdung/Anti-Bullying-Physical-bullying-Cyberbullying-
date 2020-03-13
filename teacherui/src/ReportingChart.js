import React, { Component } from 'react';
import * as d3 from 'd3';
import ReportingData from './data/reportMethods.json';

class ReportingChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 700,
            height: 300,
        }

        this.chartRef = React.createRef();
        this.drawChart = this.drawChart.bind(this);
    }

    drawChart() {
        var colors = d3.scaleOrdinal().range(["#00008E", "#FF6666", "#FFFF00"]);

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

        // x scale 

        var x = d3.scaleBand()
            .rangeRound([0, dimensions.width])
            .paddingInner(0.05)
            .align(0.1);

        // y scale

        var y = d3.scaleLinear()
            .rangeRound([dimensions.height, 0])

        const bounds = wrapper.append("g")
            .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)
        d3.json(ReportingData).then(function (d, i, t, cols) {
            for (i = 1, t = 0; i < cols.length; ++i)
                t += d[cols[i]] = +d[cols[i]];
            d.total = t;

            return d;

        }, function (error, data) {
            if (error) throw error;
            var keys = data.cols.slice(1);

            data.sort(function (a, b) { return b.total - a.total; });

            // setting domain

            x.domain(data.map(function (d) {
                return d.month;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.total;
            })]).nice();
            colors.domain(keys);

            // drawing the chart

            bounds.append('g')
                .selectAll('g')
                .data(d3.stack().keys(keys)(data))
                .enter()
                .append('g')
                .attr('fill', function (d) { return colors(d.key) })
                .selectAll("rect")
                .data(function (d) {
                    return d;
                })
                .enter()
                .append('rect')
                .attr('x', function (d) {
                    return x(d.data.month);
                })
                .attr('y', function (d) {
                    return y(d[0]) - y(d[1]);
                })
                .attr('width', x.bandwidth())

            bounds.append('g')
                .attr("class", 'xaxis')
                .attr("transform", "translate(0," + dimensions.height + ")")
                .call(d3.axisBottom(x));

            bounds.append("g")
                .attr("class", 'yaxis')
                .call(d3.axisLeft(y).ticks(null, 's'))
                .append('text')
                .attr('x', 2)
                .attr('y', y(y.ticks().pop()) + 0.5)
                .attr('dy', '0.32em')
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchror", 'start');
        });

    }



    componentDidMount() {
        this.drawChart();
    }

    render() {
        return (
            <div id='reportingMethods' ref="canvas">
            </div>
        )
    }
}
export default ReportingChart;