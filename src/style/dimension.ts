import { Dimensions } from "react-native";
import { isIphoneX } from "../services/utilities";

const { width, height } = Dimensions.get("window");
const basePaddingTop = isIphoneX() ? "65px" : "40px";
const basePaddingBottom = isIphoneX() ? "94px" : "71px";
const basePaddingLeft = "20px";
const basePaddingRight = "20px";

export { width, height, basePaddingTop, basePaddingBottom, basePaddingLeft, basePaddingRight };
