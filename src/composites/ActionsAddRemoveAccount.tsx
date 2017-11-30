import * as React from "react";
import TouchableIcon from "../composites/TouchableIcon";

// --- types --- //
export interface Props {
  onAddAccount: () => void;
  onRemoveAccount: () => void;
}

class ActionsAddRemoveAccount extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { onAddAccount, onRemoveAccount } = this.props;
    return [
      <TouchableIcon
        onPress={onAddAccount}
        src={require("../../assets/images/icon-add-account.png")}
        width="27px"
        height="27px"
        key="add-account-icon"
      />,
      <TouchableIcon
        onPress={onRemoveAccount}
        src={require("../../assets/images/icon-remove-account.png")}
        width="27px"
        height="27px"
        key="remove-account-icon"
      />
    ];
  }
}

export default ActionsAddRemoveAccount;
