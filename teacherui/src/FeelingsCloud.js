import React, { Component } from 'react';
import { TagCloud } from 'react-tagcloud';
import randomColor from 'randomcolor';

class FeelingsCloud extends Component {

    render() {

        return (
            <TagCloud
                minSize={3*2}
                maxSize={20*2}
                tags={this.props.cloudTags}
            />
        )
    }
}


export default FeelingsCloud;