import React from "react";
import { Container, Row, Col } from 'reactstrap';
import StudentData from './data/schoolClass.json'
import StudentsSidebar from './StudentsSidebar';
import WarningFrequency from './WarningFrequency';
import FrequencyData from './data/warningSample.json';
import ReportingChart from './ReportingChart';
import ReportingData from './data/reportMethods.json';
import InterventionsData from './data/interventions.json';
import MethodsTable from './MethodsTable';
import DepressiveInfo from './data/depressionDuration.json';
import DepressionComponent from './DepressionComponent';
import EmotionVals from "./data/posNegEmotionValues.json";
import PosNegChart from "./PosNegChart";

function IndividualScreen(props) {
    return (
        <Container fluid={true}>
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
                    <PosNegChart posNegEmotionVal={EmotionVals} />
                    <DepressionComponent depressiveInfo={DepressiveInfo} />
                </Col>
            </Row>
        </Container>
    )
}

export default IndividualScreen;