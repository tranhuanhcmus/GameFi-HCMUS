import React from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { selectLoading } from "../redux/loadingSlice";

const LoadingComponent: React.FC = () => {
  const { isLoading } = useSelector(selectLoading);

  if (!isLoading) {
    return null; // Don't render anything if not loading
  }

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="white" animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default LoadingComponent;
