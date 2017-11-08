import { Easing } from "react-native";

const { linear, ease, bezier } = Easing;

const easeInOutCubic = bezier(0.645, 0.045, 0.355, 1);

export { linear, ease, easeInOutCubic };
