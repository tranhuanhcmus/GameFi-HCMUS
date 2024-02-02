import React from 'react';
// import GemGrid from './components/GemGrid';
import GemContainer from './components/GemContainer';
import DraggableGrid from './components/SwappableGrid';
import { StyleSheet, Text, View } from 'react-native';
import GameScreen from './screens/GameScreen';

const App = () => {
  // return <GemGrid></GemGrid>;
  return <GemContainer></GemContainer>;
  // return <DraggableGrid></DraggableGrid>
  // return <GameScreen />;
};

export default App;
