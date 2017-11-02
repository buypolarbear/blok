import * as React from "react";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import TouchableIcon from "../components/TouchableIcon";
import { isIphoneX } from "../services/utilities";

// -- types ----------------------------------------------------------------- //
export interface Props {
  activeRoute: string;
  router: Object;
}

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  padding-top: 20px;
  padding-bottom: ${isIphoneX() ? "43px" : "20px"};
  width: 100%;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Icon = styled(TouchableIcon)`
  margin-left: 25px;
  margin-right: 25px;
`;

@inject("router")
@observer
class Navigation extends React.Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {};

  // -- methods ------------------------------------------------------------- //
  onRouteChange = (route: string) => this.props.router.push(route);

  // -- render -------------------------------------------------------------- //
  render() {
    const activeRoute = this.props.router.location.pathname;
    const accountsIcon =
      activeRoute === "/"
        ? require("../../assets/images/icon-block-active.png")
        : require("../../assets/images/icon-block.png");
    const transactionsIcon =
      activeRoute === "/transactions"
        ? require("../../assets/images/icon-transactions-active.png")
        : require("../../assets/images/icon-transactions.png");
    const settingsIcon =
      activeRoute === "/settings"
        ? require("../../assets/images/icon-settings-active.png")
        : require("../../assets/images/icon-settings.png");
    return (
      <Container>
        <Icon
          onPress={() => this.onRouteChange("/")}
          width="28px"
          height="30px"
          src={accountsIcon}
        />
        <Icon
          onPress={() => this.onRouteChange("/transactions")}
          width="28px"
          height="20px"
          src={transactionsIcon}
        />
        <Icon
          onPress={() => this.onRouteChange("/settings")}
          width="31px"
          height="31px"
          src={settingsIcon}
        />
      </Container>
    );
  }
}

export default Navigation;
