import React, { Component } from 'react';
import StudentsSidebar from './StudentsSidebar';
import LocationsChart from './LocationsChart';

class RowTempComponent extends Component {
    render() {
        return (
            <div className="teacherUiRow">
                <StudentsSidebar />
                <LocationsChart />
            </div>
        )
    }
}

export default RowTempComponent;