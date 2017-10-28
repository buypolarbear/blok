/* @flow */
import { Dimensions, Platform } from "react-native";

export const isIphoneX = (): boolean => {
  const dimension = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimension.height === 812 || dimension.width === 812)
  );
};
