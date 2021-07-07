import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import MainNavigation from "./MainNavigation";

import Form from "../Form/Form";
import FormCode from "../FormCode/FormCode";

import "./Main.css";
import { transformReactToHtml } from "../../helpers";

class Main extends Component {
  state = {
    transformeredHTML: "",
  };

  transformData(data) {
    const transformeredHTML = transformReactToHtml(data);
    this.setState({ transformeredHTML });
  }

  render() {
    return (
      <div className="main-container">
        <Switch>
          <Route exact={true} path="/">
            <Form
              onDropped={this.props.onDropped}
              droppedElement={this.props.droppedElement}
              transformData={data => this.transformData(data)}
            />
          </Route>
          <Route path="/code">
            <FormCode htmlCode={this.state.transformeredHTML} />
          </Route>
        </Switch>
        <MainNavigation pathname={this.props.location.pathname} />
      </div>
    );
  }
}

export default withRouter(Main);
