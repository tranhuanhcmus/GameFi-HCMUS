import { Dimensions, StatusBar, Platform } from "react-native";

// Get status bar height only on Android (on iOS it's handled automatically)
const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight : 0;

// Define responsive constants
const ConstantsResponsive = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height - (STATUS_BAR_HEIGHT || 0),
  XR: Dimensions.get("screen").width / 650,
  YR: (Dimensions.get("screen").height - (STATUS_BAR_HEIGHT || 0)) / 1024,
};

export default ConstantsResponsive;
