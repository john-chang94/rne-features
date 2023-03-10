import { Platform, Dimensions, StatusBar } from "react-native";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

export const screenWidth = Dimensions.get("window").width;
export const statusBar = StatusBar.currentHeight;
