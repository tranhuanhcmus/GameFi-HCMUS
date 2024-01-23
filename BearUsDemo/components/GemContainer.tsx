import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GemGrid from './GemGrid';

const screenWidth = Dimensions.get('window').width;

const GemContainer = () => {
  return (
    <View style={styles.container}>
      <GemGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0.8 * screenWidth,
    alignSelf: 'center', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(148 163 184)',
    // flex: 1,
    // justifyContent: 'flex-end',
  },
});

export default GemContainer;
