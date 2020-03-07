import React, { Component } from 'react';
import StudentsSidebar from './StudentsSidebar';
import LocationsChart from './LocationsChart';
import WarningFrequency from './WarningFrequency';
import FeelingsTag from './data/emotions.json';
import FeelingsCloud from './FeelingsCloud';


class RowTempComponent extends Component {
    
    render() {
        return (
            <div className="teacherUiRow">
                <StudentsSidebar />
                <WarningFrequency />
                <LocationsChart />
                <FeelingsCloud cloudTags={FeelingsTag} />
            </div>

        )
    }
}

export default RowTempComponent;