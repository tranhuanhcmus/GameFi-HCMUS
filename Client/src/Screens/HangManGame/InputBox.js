import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../../common/colors";
import ConstantsResponsive from "../../constants/Constanst";

const InputBox = ({ correctLetters, answer }) => {
  return (
    <View style={styles.inputContainer}>
      <Image
        resizeMode="stretch"
        source={require("../../../assets/backGroundForKeyQuestion.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      {answer.split("").map((letter, index) => {
        const l = letter.toUpperCase();
        return (
          <Text key={index} style={styles.text}>
            {correctLetters.includes(l) ? l : "-"}
          </Text>
        );
      })}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 8,

    alignItems: "center",
    padding: 2,
    width: "100%",
    height: "9%",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 3,
  },
});
