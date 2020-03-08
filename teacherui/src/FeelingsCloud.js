import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = word => Math.log2(word.value) * 8;
const rotate = word => word.value % 2 === 1 ? 0 : 90;

class FeelingsCloud extends Component {

    componentDidMount() {
        setInterval(() => {
            this.forceUpdate();
        }, 3000);
    }

    render() {

        return (
            <div className='tag-cloud'>
                <h4 style={{ 'textAlign': 'start' }}>Feelings</h4>
                <WordCloud
                    data={this.props.cloudTags}
                    width={400}
                    height={300}
                    fontSizeMapper={fontSizeMapper}
                    rotate={rotate}
                    font='serif'
                    onWordMouseOver={(word) => {
                        console.log(word.value);
                    }}
                />
            </div>
        )
    }
}



export default FeelingsCloud;