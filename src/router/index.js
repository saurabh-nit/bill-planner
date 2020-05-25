import { Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Store from '../pages/Bills';

class RouterComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/bills" />} />
          <Route exact path="/bills" component={Store}/>
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default RouterComponent;
