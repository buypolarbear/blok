import * as React from "react";
import { observer, inject } from "mobx-react/native";
import { Router as ReactRouter, Switch, Route } from "react-router-native";
import Dashboard from "./_dashboard";
import { RouterInterface } from "../store/_router";

// -- types ----------------------------------------------------------------- //
export interface Props {
  router?: RouterInterface;
}

export interface State {
  previousLocation: Object;
}

@inject("router")
@observer
class Router extends React.Component<Props, State> {
  previousLocation = this.props.router.location;

  // -- methods ------------------------------------------------------------- //
  componentWillReceiveProps(nextProps: Props) {
    const { location } = this.props.router;
    if (nextProps.router.history.action !== "POP" && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.router.location;
    }
  }

  isModal = location =>
    location.state && location.state.modal && this.previousLocation !== location;

  // -- render -------------------------------------------------------------- //
  render() {
    const { router } = this.props;
    const { location } = router;
    const l = this.isModal(location) ? this.previousLocation : location;
    return (
      <ReactRouter history={router.history}>
        <Switch location={l}>
          <Route path="/dashboard/*" render={() => <Dashboard location={l} />} />
        </Switch>
      </ReactRouter>
    );
  }
}

export default Router;
