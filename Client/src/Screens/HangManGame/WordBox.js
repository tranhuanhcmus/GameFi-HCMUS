import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useReducer } from "react";
import colors from "../../../common/colors";
import ConstantsResponsive from "../../constants/Constanst";

const WordBox = ({ wordData }) => {
  const [hint, toggleHint] = useReducer((s) => !s, false);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "700",
          fontSize: ConstantsResponsive.YR * 19,
          color: "white",
        }}
      >
        Answer the question:{" "}
      </Text>
      <Text style={styles.word}>{wordData.question}</Text>
    </View>
  );
};

export default WordBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  word: {
    fontSize: ConstantsResponsive.YR * 20,
    color: "white",
    fontWeight: "700",
    marginVertical: 8,
    textTransform: "capitalize",
  },
});
