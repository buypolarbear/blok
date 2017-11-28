import * as React from "react";
import * as ReactNative from "react-native";

const { View, KeyboardAvoidingView: KeyboardView, Platform } = ReactNative;

// --- types --- //
export interface Props extends ReactNative.KeyboardAvoidingView {
  children: React.ReactChild | React.ReactChild[];
}

class KeyboardAvoidingView extends React.Component<Props, {}> {
  render() {
    const { children, ...props } = this.props;
    const view =
      Platform.OS === "android" ? (
        <View {...props}>{children}</View>
      ) : (
        <KeyboardView behavior="padding" {...props}>
          {children}
        </KeyboardView>
      );
    return view;
  }
}

export default KeyboardAvoidingView;
