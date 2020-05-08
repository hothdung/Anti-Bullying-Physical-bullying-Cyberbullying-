import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, NavbarText } from 'reactstrap';
import StudentData from './data/schoolClass.json'
import StudentsSidebar from './StudentsSidebar';
import MultipleWarnings from './MultipleWarnings';
import FrequencyData from './data/warningSample.json';
import ReportingChart from './ReportingChart';
import ReportingData from './data/reportMethods.json';
import InterventionsData from './data/interventions.json';
import MethodsTable from './MethodsTable';
import DepressiveInfo from './data/depressionDuration.json';
import DepressionComponent from './DepressionComponent';
import EmotionVals from "./data/posNegEmotionValues.json";
import PosNegChart from "./PosNegChart";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import WarningsIndividual from './warningData/WarningIndividual';
import Navigation from './Navigation';

const warning_inData = [WarningsIndividual.Warning0, WarningsIndividual.Warning1, WarningsIndividual.Warning2, WarningsIndividual.Warning3, WarningsIndividual.Warning4, WarningsIndividual.Warning5, WarningsIndividual.Warning6, WarningsIndividual.Warning7, WarningsIndividual.Warning8, WarningsIndividual.Warning9, WarningsIndividual.Warning10, WarningsIndividual.Warning11, WarningsIndividual.Warning12, WarningsIndividual.Warning13, WarningsIndividual.Warning14, WarningsIndividual.Warning15, WarningsIndividual.Warning16, WarningsIndividual.Warning17, WarningsIndividual.Warning18, WarningsIndividual.Warning19, WarningsIndividual.Warning20, WarningsIndividual.Warning21, WarningsIndividual.Warning22, WarningsIndividual.Warning23, WarningsIndividual.Warning24];

class IndividualScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            option: "Overview"
        }
    }

    handleOptionSelected = option => {
        this.setState({
            option
        })
    }

    render() {
        const { option } = this.state;

        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col lg='12' className="navCol">
                        <Navbar color="dark" fixed="top">
                            <Nav className="ml-auto">
                                <NavbarText style={{ fontWeight: 'bold', color: 'white', fontSize: "18px" }}>
                                    <VisibilityRoundedIcon /> Anti-Bullying Monitoring Dashboard
                            </NavbarText>
                            </Nav>
                            <Nav className="ml-auto"><span style={{ fontWeight: 'bold', color: 'white', fontSize: "18px" }}>{this.props.studentVal}</span></Nav>
                        </Navbar>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col lg='1'>
                        <StudentsSidebar students={StudentData}
                            onNavigate={this.props.onNavigate}
                            stateScreen={this.props.stateScreen}
                            studentVal={this.props.studentVal} />
                    </Col>
                    <Col lg='11' style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Navigation onSelect={this.handleOptionSelected}
                            option={this.state.option} />

                        <Col lg='7'>
                            <MultipleWarnings warningVal={FrequencyData} warningIndividual={warning_inData[this.props.index]}
                                colorVal={this.props.colorVal} />
                            {console.log("This is color val " + this.props.colorVal + "and warningIndi " + warning_inData[this.props.index])}
                            <MethodsTable methods={InterventionsData} />
                        </Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default IndividualScreen;