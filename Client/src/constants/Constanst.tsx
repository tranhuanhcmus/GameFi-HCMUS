import { Dimensions } from "react-native";

// Define responsive constants
const ConstantsResponsive = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  XR: Dimensions.get("screen").width / 650,
  YR: Dimensions.get("screen").height / 1024,
};

export default ConstantsResponsive;
