import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, Nav, NavbarText } from "reactstrap";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import StudentData from './data/schoolClass.json'
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
import DepressiveInfo from './data/depressionDuration.json';
import DepressionComponent from './DepressionComponent';
import EmotionVals from "./data/posNegEmotionValues.json";
import PosNegChart from "./PosNegChart";

class Area extends Component {


    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Navbar color="dark" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Nav className="navBar">
                                <NavbarText style={{ fontWeight: 'bold', color: 'white', fontSize: "18px" }}>
                                    <VisibilityRoundedIcon />  Anti-Bullying Monitoring Dashboard Overview
                                    </NavbarText>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col lg='1'>
                        <StudentsSidebar students={StudentData} />
                    </Col>
                    <Col lg='7'>
                        <WarningFrequency warningVal={FrequencyData} />
                        <ReportingChart reportingMethods={ReportingData} />
                        <MethodsTable methods={InterventionsData} />
                    </Col>
                    <Col lg='3'>
                        <AtmosphereChart emotionsVal={EmotionData} />
                        <FeelingsCloud cloudTags={FeelingsTag} />
                        <LocationsChart locations={LocationData} />
                    </Col>
                </Row>
                <Row>
                    <Col lg='6'>
                        <DepressionComponent depressiveInfo={DepressiveInfo} />
                    </Col>
                    <Col lg='6'>
                        <PosNegChart posNegEmotionVal={EmotionVals} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Area;