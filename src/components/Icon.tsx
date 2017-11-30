import * as React from "react";
import styled from "styled-components/native";

// --- types --- //
export interface Props {
  width: string;
  height: string;
  source: any;
}

// --- styling --- //
const SIcon = styled.Image`
  width: ${(p: Props) => p.width || "20px"};
  height: ${p => p.height || "20px"};
`;

class Icon extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { width, height, source, ...props } = this.props;
    return <SIcon width={width} height={height} source={source} {...props} />;
  }
}

export default Icon;
