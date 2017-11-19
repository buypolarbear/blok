import * as React from "react";
import { observer, inject } from "mobx-react/native";
import styled from "styled-components/native";
import { Router as ReactRouter, Switch, Route } from "react-router-native";
import Dashboard from "./_dashboard";
import Overlay from "./_overlay";
import CameraView from "./_camera";
import { RouterStoreInterface } from "../store/_router";
import { AccountsStoreInterface } from "../store/_accounts";

// --- types --- //
export interface Props {
  router?: RouterStoreInterface;
  accounts?: AccountsStoreInterface;
}

export interface State {
  previousLocation: Object;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  height: 100%;
`;

@inject("router", "accounts")
@observer
class Router extends React.Component<Props, State> {
  previousLocation = this.props.router.location;

  // --- methods --- //
  componentDidMount() {
    this.props.accounts.getAccountsFromMemory();
  }

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

  // --- render --- //
  render() {
    const { router } = this.props;
    const { location } = router;
    const secondaryView = this.isSecondaryView(location);
    const baseLocation = secondaryView ? this.previousLocation : location;
    return (
      <ReactRouter history={router.history}>
        <Container>
          <Switch location={baseLocation}>
            <Route path="/dashboard/*" render={() => <Dashboard location={baseLocation} />} />
          </Switch>
          <Route path="/" render={() => <Overlay location={location} />} />
          <CameraView />
        </Container>
      </ReactRouter>
    );
  }
}

export default Router;
