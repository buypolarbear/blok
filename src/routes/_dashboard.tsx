import * as React from "react";
import { Route, Switch } from "react-router-native";
import Background from "../components/Background";
import AccountsView from "../views/AccountsView";
import TransactionsView from "../views/TransactionsView";
import SettingsView from "../views/SettingsView";
import Navigation from "../composites/Navigation";
import DashboardRouteAnimation from "../components/DashboardRouteAnimation";
import { RouterStoreInterface } from "../store/_router";

// --- types --- //
export interface Props {
  location: RouterStoreInterface["location"];
}

class Dashboard extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { location } = this.props;
    return (
      <Background>
        <DashboardRouteAnimation pathname={location.pathname}>
          <Switch location={location}>
            <Route path="/dashboard/accounts" component={AccountsView} />
            <Route path="/dashboard/transactions" component={TransactionsView} />
            <Route path="/dashboard/settings" component={SettingsView} />
          </Switch>
        </DashboardRouteAnimation>
        <Navigation />
      </Background>
    );
  }
}

export default Dashboard;
