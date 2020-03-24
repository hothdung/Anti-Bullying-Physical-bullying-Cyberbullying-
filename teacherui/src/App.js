import React, { Component } from 'react';
import Area from './Area';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
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
            <div class="preloader">
              <h1>Anti-Bullying Dashboard</h1>
              <Lottie options={defaultOptions} height={200} width={200} />
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
