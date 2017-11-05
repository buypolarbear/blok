import * as React from "react";
import { Route, Switch } from "react-router-native";
import { inject, observer } from "mobx-react/native";
import Background from "../components/Background";
import AccountsView from "../views/AccountsView";
import TransactionsView from "../views/TransactionsView";
import SettingsView from "../views/SettingsView";
import Navigation from "../composites/Navigation";
import DashboardRouteAnimation from "../components/DashboardRouteAnimation";

// -- types ----------------------------------------------------------------- //
export interface Props {
  router: Object;
}

@inject("router")
@observer
class Dashboard extends React.Component<Props, {}> {
  // -- render -------------------------------------------------------------- //
  render() {
    const { router } = this.props;
    return (
      <Background>
        <DashboardRouteAnimation pathname={router.location.pathname}>
          <Switch location={router.location}>
            <Route exact path="/" component={AccountsView} />
            <Route path="/transactions" component={TransactionsView} />
            <Route path="/settings" component={SettingsView} />
          </Switch>
        </DashboardRouteAnimation>
        <Navigation />
      </Background>
    );
  }
}

export default Dashboard;
