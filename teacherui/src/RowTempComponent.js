import React, { Component } from 'react';
import StudentsSidebar from './StudentsSidebar';
import LocationsChart from './LocationsChart';
import WarningFrequency from './WarningFrequency';
import FeelingsTag from './data/emotions.json';
import FrequencyData from './data/warningSample.json';
import LocationData from './data/locations.json';
import FeelingsCloud from './FeelingsCloud';


class RowTempComponent extends Component {

    render() {
        return (
            <div className="teacherUiRow">
                <StudentsSidebar/>
                <WarningFrequency warningVal={FrequencyData} />
                <LocationsChart locations={LocationData} />
                <FeelingsCloud cloudTags={FeelingsTag} />
            </div>

        )
    }
}

export default RowTempComponent;