import React, { Component } from 'react';
import * as d3 from 'd3';
import EmotionsData from './data/classAtmosphere.json';


class AtmosphereChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: EmotionsData,
            yAxisAttribute: "nameEmotion",
            xAxisAttribute: "percentage",
            xAxisAttribute2: "total",
            img: "image",
            width: 400,
            height: 350
        }
        this.chartRef = React.createRef();
        this.drawChart = this.drawChart.bind(this);
    }

    drawChart() {

        var config = {
            "emoji_size": 10
        }

        var colors = ['#FF0000', '#5588ff', '#993299', '#A3A319', '#19D219'];

        var color = d3.scaleOrdinal().range(colors);

        let margin = {
            top: 60, right: 30, bottom: 40, left: 90
        }, width = this.state.width - margin.left - margin.right,
            height = this.state.height - margin.top - margin.bottom;

        let x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        // y axis 
        let y = d3.scaleBand()
            .range([0, height])
            .domain(this.state.data.map((d) =>
                d[this.state.yAxisAttribute]))
            .padding(0.1)



        let svg = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
            .attr("x", margin.left - 15)
            .attr("y", 0 - (margin.top - 45))
            .attr("text-anchor", "start")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .text("Class atmosphere")

        svg.append('g')
            .attr('class', 'yaxis')
            .call(d3.axisLeft(y))

        // creating overlapping bar chart to create filling a static bar with certain percentage
        svg.selectAll("totalBar")
            .data(this.state.data)
            .enter().append('rect')
            .attr('x', 0)
            .attr('y', (d) => y(d[this.state.yAxisAttribute]))
            .attr('width', (d) => x(d[this.state.xAxisAttribute2]))
            .attr('height', y.bandwidth() - 10)
            .attr('fill', '#f4eeff')
            .style('stroke', 'black')
            .style('stroke-width', .5)

        svg.selectAll("percentageBar")
            .data(this.state.data)
            .enter()
            .append('rect')
            .attr('opacity', '0')
            .attr('x', x(0))
            .attr('y', (d) => y(d[this.state.yAxisAttribute]))
            .attr('height', y.bandwidth() - 10)
            .attr('fill', function (d, i) {
                return color(i);
            })
            .transition().delay((d, i) => { return i * 2000 })
            .duration(2000)
            .attr('width', (d) => x(d[this.state.xAxisAttribute]))
            .attr('opacity', 1)

        svg.append('defs')
            .selectAll('pattern')
            .data(this.state.data)
            .enter()
            .append('pattern')
            .attr('id', function (d) {
                return d.nameEmotion;
            })
            .attr('width', 70)
            .attr('height', 90)
            .append('image')
            .attr("xlink:href", function (d) {
                return d.image;
            })
            .attr('width', 40)
            .attr('height', 40)
            .attr("x", 0)
            .attr("y", 0)


        // attaching circle to percentage bars
        var circle = svg.selectAll('circle')
            .data(this.state.data)
            .enter()
            .append('circle')
            .attr('opacity', '0')
            .attr('cx', x(0.5))
            .attr('cy', (d) => y(d[this.state.yAxisAttribute]) + 15)
            .attr('r', 20)
            .style("stroke", function (d, i) {
                return color(i);
            })
            .style("stroke-width", 4.5)
            .attr('fill', function (d) {
                return "url(#" + d.nameEmotion + ")";
            })
            .transition().delay((d, i) => {
                return i * 2000;
            })
            .duration(2000)
            .attr("cx", (d) => x(d[this.state.xAxisAttribute]))
            .attr('opacity', 1)
    }



    componentDidMount() {
        this.drawChart();
    }

    render() {
        return (
            <div ref="canvas">
            </div>
        )
    }

}

export default AtmosphereChart;