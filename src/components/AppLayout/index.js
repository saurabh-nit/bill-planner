import React, { Component } from "react";
import RouterComponent from '../../router/index';
import { BrowserRouter } from 'react-router-dom';
import './style.scss'

class AppLayout extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="app-layout">
            <RouterComponent/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppLayout;
