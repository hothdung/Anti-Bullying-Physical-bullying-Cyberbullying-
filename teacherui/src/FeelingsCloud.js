import React, { Component } from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'd3-transition';
import { select } from 'd3-selection';


const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#F3CE00"],
    fontFamily: "impact",
    deterministic: true,
    fontSizes: [25, 40],
    fontWeight: "normal",
    fontStyle: "normal",
    rotationAngles: [0, 90],
    rotations: 3,
    padding: 1,
    transitionDuration: 1000,

};

function getCallbacks(callback) {

    return function (word, event) {
        const isActive = callback !== "onWordMouseOut";
        const element = event.target;
        const text = select(element);

        text.transition()
            .attr('font-size', isActive ? "300%" : '100%')
            .attr('text-decoration', isActive ? 'underline' : 'none');
    }
}



const callbacks = {
    getWordTooltip: word =>
        `The emotion "${word.text}" appeared in class ${word.value} times.`,
    onWordMouseOut: getCallbacks('onWordMouseOut'),
    onWordMouseOver: getCallbacks('onWordMouseOver')
};


class FeelingsCloud extends Component {

    render() {

        return (
            <div className='tag-cloud' style={{ width: '100%', height: '100%' }}>
                <h4 style={{ 'textAlign': 'start' }}>Feelings</h4>
                <ReactWordcloud callbacks={callbacks} options={options} words={this.props.cloudTags} />
            </div>
        )
    }
}



export default FeelingsCloud;