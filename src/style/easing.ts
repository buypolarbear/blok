import { Easing } from "react-native";

const { linear, ease, bezier } = Easing;

const easeInOutCubic = bezier(0.645, 0.045, 0.355, 1);
const easeInQuad = bezier(0.55, 0.085, 0.68, 0.53);
const easeOutQuad = bezier(0.25, 0.46, 0.45, 0.94);

export { linear, ease, easeInOutCubic, easeInQuad, easeOutQuad };
