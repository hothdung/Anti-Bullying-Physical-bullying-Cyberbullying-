import React, { Component } from 'react';
import StudentsSidebar from './StudentsSidebar';
import LocationsChart from './LocationsChart';
import WarningFrequency from './WarningFrequency';

class RowTempComponent extends Component {
    render() {
        return (
            <div className="teacherUiRow">
                <StudentsSidebar />
                <WarningFrequency/>
                <LocationsChart/>
            </div>
        )
    }
}

export default RowTempComponent;