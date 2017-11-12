import * as React from "react";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import TouchableIcon from "../composites/TouchableIcon";
import { isIphoneX } from "../services/utilities";
import { RouterStoreInterface } from "../store/_router";

// --- types --- //
export interface Props {
  router?: RouterStoreInterface;
}

// --- styling --- //
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
class Navigation extends React.Component<Props, {}> {
  // --- methods --- //
  onRouteChange = (route: string) => this.props.router.push(route);

  // --- render --- //
  render() {
    const activeRoute = this.props.router.pathname;
    const accountsIcon =
      activeRoute === "/dashboard/accounts"
        ? require("../../assets/images/icon-block-active.png")
        : require("../../assets/images/icon-block.png");
    const transactionsIcon =
      activeRoute === "/dashboard/transactions"
        ? require("../../assets/images/icon-transactions-active.png")
        : require("../../assets/images/icon-transactions.png");
    const settingsIcon =
      activeRoute === "/dashboard/settings"
        ? require("../../assets/images/icon-settings-active.png")
        : require("../../assets/images/icon-settings.png");
    return (
      <Container>
        <Icon
          onPress={() => this.onRouteChange("/dashboard/accounts")}
          width="28px"
          height="30px"
          src={accountsIcon}
        />
        <Icon
          onPress={() => this.onRouteChange("/dashboard/transactions")}
          width="28px"
          height="20px"
          src={transactionsIcon}
        />
        <Icon
          onPress={() => this.onRouteChange("/dashboard/settings")}
          width="31px"
          height="31px"
          src={settingsIcon}
        />
      </Container>
    );
  }
}

export default Navigation;
