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
        {!this.state.done ? (
          <FadeIn>
            <div className="preloader">
              <h1>Anti-Bullying Dashboard</h1>
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="creators">
                <img className="hci-icon" src={`${process.env.PUBLIC_URL}/images/hcilogo.png`} width="55px" height="40px" alt="hci-logo" />
                <p>Creators: Jaeyoung Kim, Thanh Dung Ho, Jihwan Kim (SNU HCI Lab)</p></div>
            </div>
          </FadeIn>
        ) : (
            <Area />
          )}
      </div>
    )
  }

}

export default App;
