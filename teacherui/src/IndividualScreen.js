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
import EmotionVals from "./data/posNegEmotionValues.json";
import PosNegChart from "./PosNegChart";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import WarningsIndividual from './warningData/WarningIndividual';
import Navigation from './Navigation';
import Toolbar from '@material-ui/core/Toolbar';
import DepressionComponent from './DepressionComponent'
import DurationInfo from './data/depressionDuration.json'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

const warning_inData = [WarningsIndividual.Warning0, WarningsIndividual.Warning1, WarningsIndividual.Warning2, WarningsIndividual.Warning3, WarningsIndividual.Warning4, WarningsIndividual.Warning5, WarningsIndividual.Warning6, WarningsIndividual.Warning7, WarningsIndividual.Warning8, WarningsIndividual.Warning9, WarningsIndividual.Warning10, WarningsIndividual.Warning11, WarningsIndividual.Warning12, WarningsIndividual.Warning13, WarningsIndividual.Warning14, WarningsIndividual.Warning15, WarningsIndividual.Warning16, WarningsIndividual.Warning17, WarningsIndividual.Warning18, WarningsIndividual.Warning19, WarningsIndividual.Warning20, WarningsIndividual.Warning21, WarningsIndividual.Warning22, WarningsIndividual.Warning23, WarningsIndividual.Warning24];

class IndividualScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            option: "Overview",
            manuals: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    handleOptionSelected = option => {
        this.setState({
            option
        })
    }

    fetchData() {
        fetch('http://147.46.215.219:8080/outputManual', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Server bad response!");
            }
            return response.json().then((data) => {

                this.setState({
                    manuals: data
                })
            })
        }).catch(error => {
            console.log("Parsing not successful!", error);
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { option, manuals } = this.state;

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
                        <Paper>
                            <Navigation onSelect={this.handleOptionSelected}
                                option={this.state.option}
                                stateScreen={this.props.stateScreenF} />
                        </Paper>
                        {this.state.option === "Overview" ?
                            <div><MultipleWarnings warningVal={FrequencyData} warningIndividual={warning_inData[this.props.index]}
                                colorVal={this.props.colorVal} />
                                <MethodsTable methods={InterventionsData} /></div> :
                            <div style={{ marginTop: 80 }}>
                                <Col lg='7' style={{ float: "left" }}>
                                    <ReportingChart reportingMethods={ReportingData} />
                                </Col>
                                <Col lg='3' style={{ float: "left", marginLeft: "80px" }}>
                                    <PosNegChart posNegEmotionVal={EmotionVals} />
                                    <hr />
                                    <DepressionComponent depressiveInfo={DurationInfo} studentVal={this.props.studentVal} />
                                    {manuals.map(manual => {
                                        const { long, lat, bpm, message } = manual;
                                        return (
                                            <div>
                                                <p>Longitude: {long}</p>
                                                <p>Latitude: {lat}</p>
                                                <p>bpm: {bpm}</p>
                                                <p>message: {message}</p>
                                            </div>
                                        );
                                    })}
                                </Col>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default IndividualScreen;