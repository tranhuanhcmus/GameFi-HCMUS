import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SVGBird from "../../assets/SVGBird.svg";
import SVGEvent from "../../assets/SVGEvent.svg";
import SVGPlay from "../../assets/SVGPlay.svg";
import SVGStore from "../../assets/SVGStore.svg"; // Import the SVG file
import SVGTrophy from "../../assets/SVGTrophy.svg";
import ConnectScreen from "../Screens/ConnectScreen";
import GameScreen from "../Screens/GameScreen";
import { View } from "react-native";
import PlayScreen from "../Screens/PlayScreen";
import TestScreen from "../Screens/TestScreen";
import AlertComponent from "../components/AlertComponent";
import ComponentNavElement from "../components/ComponentNavElement";
import Header from "../components/Header";
import LoadingComponent from "../components/LoadingComponent";

type Props = {};

import { BreedScreen } from "../Screens/BreedScreen";
import DetailOfPet from "../Screens/DetailOfPetScreen";
import HomeScreen from "../Screens/HomeScreen";
import TrendMarketScreen from "../Screens/TrendMarketScreen";

type LocalRootStackParamList = {
  Breed: undefined;
  DetailOfPet: undefined;
  Connect: undefined;
  MainTab: undefined;
  Game: undefined;
  TrendMarket: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<LocalRootStackParamList>();
const Tab = createBottomTabNavigator();

// Bottom tab navigator.
const MainTab = () => (
  <Tab.Navigator
    initialRouteName="PlayScreen"
    screenOptions={{
      headerShadowVisible: false, // applied here

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
      component={TrendMarketScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#210035",
        },

        headerTitle: (props) => <Header name="Home" />,
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
      component={HomeScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#210035",
        },

        headerTitle: (props) => <Header name="Home" />,
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
      component={BreedScreen}
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
        headerShown: true,
        headerStyle: {
          backgroundColor: "#210035",
        },
        headerTintColor: "#fff",
        headerShadowVisible: false, // applied here

        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarIcon: ({ focused }) => (
          <ComponentNavElement content="Pet" focused={focused}>
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
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Game">
      {/* <Stack.Screen
        name="Connect"
        component={MainTab}
        options={{
          headerTitle: () => <Header name="Home" />,
          headerStyle: {
            backgroundColor: "#0C0113",
          },
          //headerTitle: () => <HeaderLeft></HeaderLeft>,
        }}
      /> */}
      <Stack.Screen
        name="Breed"
        component={BreedScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailOfPet"
        component={DetailOfPet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainTab"
        options={{
          headerShown: false,
        }}
        component={MainTab}
      />
    </Stack.Navigator>
    <AlertComponent />
    <LoadingComponent />
  </NavigationContainer>
);

export default Route;
