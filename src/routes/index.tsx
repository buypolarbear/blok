import * as React from "react";
import { observer, inject } from "mobx-react/native";
import styled from "styled-components/native";
import { Router as ReactRouter, Switch, Route } from "react-router-native";
import Dashboard from "./_dashboard";
import Overlay from "./_overlay";
import { RouterInterface } from "../store/_router";

// -- types ----------------------------------------------------------------- //
export interface Props {
  router?: RouterInterface;
}

export interface State {
  previousLocation: Object;
}

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  width: 100%;
  height: 100%;
`;

@inject("router")
@observer
class Router extends React.Component<Props, State> {
  previousLocation = this.props.router.location;

  // -- methods ------------------------------------------------------------- //
  componentWillReceiveProps(nextProps: Props) {
    const { location } = this.props.router;
    if (
      nextProps.router.history.action !== "POP" &&
      (!location.state || !location.state.modal || !location.state.overlay)
    ) {
      this.previousLocation = this.props.router.location;
    }
  }

  isSecondaryView = location => {
    if (this.previousLocation !== location) {
      return location.state && (location.state.modal || location.state.overlay);
    } else return false;
  };

  // -- render -------------------------------------------------------------- //
  render() {
    const { router } = this.props;
    const { location } = router;
    const secondaryView = this.isSecondaryView(location);
    const l = secondaryView ? this.previousLocation : location;
    return (
      <ReactRouter history={router.history}>
        <Container>
          <Switch location={l}>
            <Route path="/dashboard/*" render={() => <Dashboard location={l} />} />
          </Switch>
          {secondaryView && [
            <Route path="/overlay/*" component={Overlay} key="overlay-route" />,
            <Route path="/modal/*" component={Overlay} key="modal-route" />
          ]}
        </Container>
      </ReactRouter>
    );
  }
}

export default Router;
