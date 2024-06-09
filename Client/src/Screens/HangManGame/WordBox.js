import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useReducer } from "react";
import colors from "../../../common/colors";
import ConstantsResponsive from "../../constants/Constanst";

const WordBox = ({ wordData }) => {
  const [hint, toggleHint] = useReducer((s) => !s, false);

  const startingLetter = wordData.answer[0];
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "500", color: "white" }}>
        Answer the question:{" "}
      </Text>
      <Text style={styles.word}>{wordData.word}</Text>

      {hint && (
        <View>
          <Text>{`Starting letter is ${startingLetter}`}</Text>
        </View>
      )}
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
    fontSize: ConstantsResponsive.YR * 24,
    color: "white",
    fontWeight: "700",
    marginVertical: 8,
    textTransform: "capitalize",
  },
});
