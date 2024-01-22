import React from "react";

import HomeScreen from "./../Screens/HomeScreen";

import GameScreen from "../Screens/GameScreen";

type Props = {};
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./navigationParams";
import TestScreen from "../Screens/TestScreen";
import ConnectScreen from "../Screens/ConnectScreen";
import ComponentNavElement from "../components/ComponentNavElement";
import SVGStore from "../../assets/SVGStore.svg"; // Import the SVG file
import SVGTrophy from "../../assets/SVGTrophy.svg";
import SVGEvent from "../../assets/SVGEvent.svg";
import SVGPlay from "../../assets/SVGPlay.svg";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SVGBird from "../../assets/SVGBird.svg";
import PlayScreen from "../Screens/PlayScreen";
import { Svg } from "react-native-svg";
import AlertComponent from "../components/AlertComponent";
import LoadingComponent from "../components/LoadingComponent";
import Header from "../components/Header";

import { flare } from "viem/chains";

type LocalRootStackParamList = {
  Connect: undefined;
  MainTab: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<LocalRootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator
    initialRouteName="PlayScreen"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        left: 20,
        right: 20,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        shadowColor: "transparent",
        elevation: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: 90,
      },
    }}
  >
    <Tab.Screen
      name="ShopScreen"
      component={PlayScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <ComponentNavElement content="Shop" focused={focused}>
            <SVGStore
              width={`${focused ? "50" : "30"}`}
              height={`${focused ? "50" : "30"}`}
            />
          </ComponentNavElement>
        ),
      }}
    />
    <Tab.Screen
      name="EventScreen"
      component={ConnectScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <ComponentNavElement content="Event" focused={focused}>
            <SVGEvent
              width={`${focused ? "50" : "30"}`}
              height={`${focused ? "50" : "30"}`}
            />
          </ComponentNavElement>
        ),
      }}
    />

    <Tab.Screen
      name="PlayScreen"
      component={TestScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <ComponentNavElement content="Play" focused={focused}>
            <SVGPlay
              width={`${focused ? "50" : "30"}`}
              height={`${focused ? "50" : "30"}`}
            />
          </ComponentNavElement>
        ),
      }}
    />
    <Tab.Screen
      name="TrophyScreen"
      component={PlayScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <ComponentNavElement content="Trophy" focused={focused}>
            <SVGTrophy
              width={`${focused ? "50" : "30"}`}
              height={`${focused ? "50" : "30"}`}
            />
          </ComponentNavElement>
        ),
      }}
    />
    <Tab.Screen
      name="PetScreen"
      component={PlayScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <ComponentNavElement content="Shop" focused={focused}>
            <SVGBird
              width={`${focused ? "50" : "30"}`}
              height={`${focused ? "50" : "30"}`}
            />
          </ComponentNavElement>
        ),
      }}
    />
  </Tab.Navigator>
);

const Route = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Game">
      <Stack.Screen
        name="Connect"
        component={MainTab}
        options={{
          headerTitle: () => <Header name="Home" />,
          headerStyle: {
            backgroundColor: "#0C0113",
          },
          //headerTitle: () => <HeaderLeft></HeaderLeft>,
        }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
    <AlertComponent />
    <LoadingComponent />
  </NavigationContainer>
);

export default Route;
