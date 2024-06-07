import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../../../common/colors";
import ConstantsResponsive from "../../constants/Constanst";

const Key = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(text)}
      style={[
        styles.keyContainer,
        // { backgroundColor: disabled ? "#99a" : colors.key },
      ]}
    >
      <Image
        style={{ position: "absolute", width: "100%", height: "100%" }}
        source={require("../../../assets/backGroundForKey.png")}
        resizeMode="stretch"
      />
      <Text style={styles.key}>{text}</Text>
    </TouchableOpacity>
  );
};

const Keyboard = ({ turn, onPress, correctLetters, wrongLetters }) => {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <View style={styles.container}>
      {turn
        ? keys.split("").map((_, index) => {
            const disable =
              correctLetters.includes(_) || wrongLetters.includes(_);
            return (
              <Key key={index} text={_} onPress={onPress} disabled={disable} />
            );
          })
        : keys.split("").map((_, index) => {
            const disable = true;

            return (
              <Key key={index} text={_} onPress={onPress} disabled={disable} />
            );
          })}
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 20,
    flexWrap: "wrap",
    height: "60%",
  },
  keyContainer: {
    width: "13%",
    height: "10%",

    borderRadius: 8,

    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
