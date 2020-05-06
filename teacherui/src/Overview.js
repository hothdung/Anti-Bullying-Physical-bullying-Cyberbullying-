import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, NavbarText } from 'reactstrap';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import StudentData from './data/schoolClass.json'
import StudentsSidebar from './StudentsSidebar';
import WarningFrequency from './WarningFrequency';
import FrequencyData from './data/warningSample.json';
import InterventionsData from './data/interventions.json';
import MethodsTable from './MethodsTable';
import Navigation from './Navigation';
import { spacing } from '@material-ui/system';


const cstyle = {
    margin: "0px",
    padding: "0px",
    border: "0px"
}
class Overview extends Component {

    render() {
        return (
            <Container fluid={true} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row noGutters={true} style={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}>
                    <Col lg="12" className="navCol" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Navbar color="dark" fixed="top">
                            <Nav className="ml-auto">
                                <NavbarText style={{ fontWeight: 'bold', color: 'white', fontSize: "18px" }}>
                                    <VisibilityRoundedIcon />  Anti-Bullying Monitoring Dashboard Overview
                                    </NavbarText>
                            </Nav>
                            <Nav className="ml-auto"><span style={{ fontWeight: 'bold', color: 'white', fontSize: "18px" }}>Class {this.props.classNameVal[0].studentsClassname}</span></Nav>
                        </Navbar>
                    </Col>
                </Row >
                <Row noGutters={true} style={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}>
                    <Col lg='1' style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <StudentsSidebar students={StudentData}
                            onNavigate={this.props.onNavigate} />
                    </Col>
                    <Col lg='11' style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Navigation />
                        <WarningFrequency warningVal={FrequencyData} />
                        <MethodsTable methods={InterventionsData} />
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default Overview;