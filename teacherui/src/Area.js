import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import StudentsSidebar from './StudentsSidebar';
import LocationsChart from './LocationsChart';
import WarningFrequency from './WarningFrequency';
import FeelingsTag from './data/emotions.json';
import FrequencyData from './data/warningSample.json';
import LocationData from './data/locations.json';
import FeelingsCloud from './FeelingsCloud';
import AtmosphereChart from './AtmosphereChart';
import EmotionData from './data/classAtmosphere.json';
import ReportingChart from './ReportingChart';
import ReportingData from './data/reportMethods.json';
import InterventionsData from './data/interventions.json';
import MethodsTable from './MethodsTable';

class Area extends Component {


    render() {
        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col lg='1'>
                        <StudentsSidebar />
                    </Col>
                    <Col lg='7'>
                        <WarningFrequency warningVal={FrequencyData} />
                        <ReportingChart reportingMethods={ReportingData} />
                        <MethodsTable methods={InterventionsData} />
                    </Col>
                    <Col lg='3'>
                        <AtmosphereChart emotionsVal={EmotionData} />
                        <LocationsChart locations={LocationData} />
                        <FeelingsCloud cloudTags={FeelingsTag} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Area;