import React, { Component } from 'react';
import { PropTypes } from 'react'
import Area from './Area';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as Loading from "./data/monitoring.json";
import IndividualScreen from './IndividualScreen';
import { Route } from 'react-router-dom'


var defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


class App extends Component {

  constructor(props) {
    super(props);
    this.setIndividualScreen = this.setIndividualScreen.bind(this);
    this.state = {
      done: undefined,
      screen: 'overview',
      studentName: ""
    };

  }

  componentDidMount() {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
          this.setState({ done: true });
        });
    }, 8100);
  }

  setIndividualScreen(name) {
    this.setState(() => ({
      screen: 'individual',
      studentName: name
    }))
  }


  render() {
    return (
      <div>
        <Route exact path='/' render={() => (<Area
          onNavigate={this.setIndividualScreen}
        />)} />
        <Route path='/individual' render={() => (
          <IndividualScreen studentVal={this.state.studentName}
            onNavigate={this.setIndividualScreen}
            stateScreen={this.state.screen} />)} />
      </div>
    )
  }

}

export default App;
