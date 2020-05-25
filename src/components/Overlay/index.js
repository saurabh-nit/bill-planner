import React, { Component } from "react";
import './style.scss'

function overFlowBody(overflow) {
  if (overflow) {document.body.classList.add('overflow-hidden');}
  else {document.body.classList.remove('overflow-hidden');}
}

class Overlay extends Component {

  componentDidMount() {
    overFlowBody(true)
  }

  componentWillUnmount() {
    overFlowBody(false)
  }

  render() {
    return (
      <div className="overlay-wrapper" onClick={this.props.requestClose}>
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
