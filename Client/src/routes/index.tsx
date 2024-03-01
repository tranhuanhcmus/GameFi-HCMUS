import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SVGBird from "../../assets/SVGBird.svg";
import SVGEvent from "../../assets/SVGEvent.svg";
import SVGPlay from "../../assets/SVGPlay.svg";
import SVGStore from "../../assets/SVGStore.svg"; // Import the SVG file
import SVGTrophy from "../../assets/SVGTrophy.svg";
import ConnectScreen from "../screens/Connect/Main";
import GameScreen from "../screens/Game/Main";
import PlayScreen from "../screens/Play/Main";
import TestScreen from "../screens/Test/Main";
import AlertComponent from "../components/AlertComponent";
import ComponentNavElement from "../components/ComponentNavElement";
import Header from "../components/Header";
import LoadingComponent from "../components/LoadingComponent";
import HeaderRight from "../components/HeaderRight";

type Props = {};

import { BreedScreen } from "../screens/Breed/Main";
import DetailOfPet from "../screens/PetDetail/Main";
import HomeScreen from "../screens/Home/Main";
import TrendMarketScreen from "../screens/TrendMarket/Main";
import HeaderLeft from "../components/HeaderLeft";

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
        tabBarIcon: ({ focused }: any) => (
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

        headerTitle: () => <Header name="Home" />,
        headerLeft: () => <HeaderLeft></HeaderLeft>,
        tabBarIcon: ({ focused }: any) => (
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
        headerRight: () => <HeaderRight></HeaderRight>,
        headerTitle: () => <Header name="Home" />,
        headerLeft: () => <HeaderLeft></HeaderLeft>,
        tabBarIcon: ({ focused }: any) => (
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
        tabBarIcon: ({ focused }: any) => (
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
        tabBarIcon: ({ focused }: any) => (
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
    <Stack.Navigator initialRouteName="MainTab">
      <Stack.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          headerShown: false,
        }}
      />
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
