import * as React from "react";
import styled from "styled-components/native";
import { TICKER } from "../services/enums";
import { width } from "../style/dimension";
import Option from "../composites/Option";

// --- types --- //
export interface Props {
  selected: TICKER;
  onSelect: (option: TICKER) => void;
}

// --- styling --- //
const OptionCard = styled(Option)`
  width: ${(width - 60) / 2}px;
`;

const TypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

class AddAccountType extends React.Component<Props, {}> {
  // --- methods --- //
  renderOptions = (selected: TICKER, options: TICKER[]) =>
    options.map(option => (
      <OptionCard
        key={option}
        type={option}
        selected={selected === option}
        onPress={() => this.props.onSelect(option)}
      />
    ));

  // --- render --- //
  render() {
    const { selected, ...props } = this.props;
    return (
      <TypeContainer {...props}>
        {this.renderOptions(selected, [
          TICKER.BTC,
          TICKER.ETH,
          TICKER.LTC,
          TICKER.XRP,
          TICKER.DASH,
          TICKER.STEEM
        ])}
      </TypeContainer>
    );
  }
}

export default AddAccountType;
