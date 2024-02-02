import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreBoard = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ff00',
    width: '100%',
    height: '10%',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginLeft: 50,
  },
});

export default ScoreBoard;
