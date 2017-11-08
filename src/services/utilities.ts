import { Dimensions, Platform } from "react-native";

export const isIphoneX = () => {
  const dimension = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !(Platform as any).isPad &&
    !(Platform as any).isTVOS &&
    (dimension.height === 812 || dimension.width === 812)
  );
};
