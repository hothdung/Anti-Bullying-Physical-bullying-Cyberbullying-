import React, { Component } from 'react';
import Area from './Area';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as Loading from "./data/monitoring.json";


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
    this.state = {
      done: undefined
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


  render() {
    return (
      <div>
        <Area />
      </div>
    )
  }

}

export default App;
