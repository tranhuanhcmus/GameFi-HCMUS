import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './../Screens/HomeScreen';
import ConnectScreen from './../Screens/ConnectScreen';
import { RootStackParamList } from './navigationParams';

type Props = {}

const Stack = createNativeStackNavigator<RootStackParamList>();


const Route = (props: Props) => {
  return (
	<NavigationContainer>
      <Stack.Navigator initialRouteName='Connect' screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Connect" component={ConnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Route