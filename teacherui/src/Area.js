import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import StudentsSidebar from './StudentsSidebar';
import LocationsChart from './LocationsChart';
import WarningFrequency from './WarningFrequency';
import FeelingsTag from './data/emotions.json';
import FrequencyData from './data/warningSample.json';
import LocationData from './data/locations.json';
import FeelingsCloud from './FeelingsCloud';

class Area extends Component {


    render() {
        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col lg='2'>
                        <StudentsSidebar />
                    </Col>
                    <Col lg='7'>
                        <WarningFrequency warningVal={FrequencyData} />
                        <FeelingsCloud cloudTags={FeelingsTag} />
                    </Col>
                    <Col lg='3'> 
                    <LocationsChart locations={LocationData} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Area;