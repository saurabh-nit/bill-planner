import React, { Component } from "react";
import Overlay from '../Overlay'
import Transition from '../Transition'
import './style.scss'

class OverlayPopup extends Component {

  requestClose = (e) => {
    if (this.node.contains(e.target)) {
      return false;
    } else {
      this.props.closePopup()
    }
  };

  render() {
    return (
      <Transition visible={this.props.isOverlayOpen} classNames="fade">
        <Overlay requestClose={this.requestClose}>
          <div id="pop-up" className="modal-popup" ref={node => { this.node = node; }}>
            {this.props.children}
          </div>
        </Overlay>
      </Transition>
    );
  }
}

export default OverlayPopup;
