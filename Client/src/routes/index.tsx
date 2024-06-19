import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bear from "../../assets/iconBear.svg";
// import SVGEvent from "../../assets/SVGEvent.svg";
// import SVGPlay from "../../assets/SVGPlay.svg";
// import SVGStore from "../../assets/SVGStore.svg"; // Import the SVG file
// import SVGTrophy from "../../assets/SVGTrophy.svg";
import ConnectScreen from "../Screens/Connect/Main";
import GameScreen from "../Screens/Game/Main";
import PlayScreen from "../Screens/Play/Main";
import ShopScreen from "../Screens/Shop/Main";
import AlertComponent from "../components/AlertComponent";
import ComponentNavElement from "../components/ComponentNavElement";
import Header from "../components/Header";
import LoadingComponent from "../components/LoadingComponent";
import HeaderRight from "../components/HeaderRight";
import HangManGame from "../Screens/HangManGame/index";
import Breed from "../../assets/breed.svg";

import { BreedScreen } from "../Screens/Breed/Main";
import DetailOfPet from "../Screens/PetDetail/Main";
import HomeScreen from "../Screens/Home/Main";
import TrendMarketScreen from "../Screens/TrendMarket/Main";
import HeaderLeft from "../components/HeaderLeft";
import LeagueScreen from "../Screens/League/Main";
import EventScreen from "../Screens/Event/Main";
import Thunder from "../../assets/thunder.svg";
import Star from "../../assets/star.svg";
import Trophy from "../../assets/trophy.svg";
import Coin from "../../assets/coin.svg";
import ProfileScreen from "../Screens/Profile/Main";
import Match3Game from "../Screens/Match3Game/Main";
import { flare } from "viem/chains";
import { height } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import ConstantsResponsive from "../constants/Constanst";
const navArr: NavItem[] = [
  {
    name: "ShopScreen",
    header: true,
    component: ShopScreen,
    content: "Shop",
    svg: <Coin height="100%" width="100%" />,
  },
  {
    name: "TrendMarketScreen",
    component: TrendMarketScreen,
    content: "Event",
    header: true,
    svg: <Star height="100%" width="100%" />,
  },
  {
    name: "HomeScreen",
    component: HomeScreen,
    content: "Play",
    header: true,
    svg: <Thunder height="100%" width="100%" />,
  },
  {
    name: "LeagueScreen",
    component: LeagueScreen,
    content: "League",
    svg: <Trophy height="100%" width="100%" />,
  },

  {
    name: "DetailOfPet",
    component: DetailOfPet,
    content: "Pet",
    header: true,
    svg: <Bear height="100%" width="100%" />,
  },
];

type NavItem = {
  name: string;
  component: any;
  content: string;
  svg: React.ReactNode;
  header?: boolean;
};

const renderNavElement = (data: NavItem[]) => {
  return data.map((item, index) => (
    <Tab.Screen
      key={index}
      name={item.name}
      component={item.component}
      options={{
        headerTransparent: true,
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerShown: item.header || false,

        headerLeft: () => <HeaderLeft></HeaderLeft>,
        headerTitle: () => <Header name="Home" />,
        headerRight: () => <HeaderRight></HeaderRight>,
        tabBarIcon: ({ focused }: any) => (
          <ComponentNavElement content={item.content} focused={focused}>
            <View
              style={{
                height: focused
                  ? ConstantsResponsive.YR * 55
                  : ConstantsResponsive.YR * 45,
                width: focused
                  ? ConstantsResponsive.XR * 55
                  : ConstantsResponsive.XR * 45,
              }}
            >
              {item.svg}
            </View>
          </ComponentNavElement>
        ),
        lazy: true,
      }}
    />
  ));
};

type LocalRootStackParamList = {
  Breed: undefined;
  DetailOfPet: undefined;
  Connect: undefined;
  MainTab: undefined;
  Game: undefined;
  Match3Game: undefined;
  HangManGame: undefined;
  TrendMarket: undefined;
  Home: undefined;
  Shop: undefined;
  Play: undefined;
  League: undefined;
  Event: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<LocalRootStackParamList>();
const Tab = createBottomTabNavigator();

// Bottom tab navigator.
const MainTab = () => (
  <Tab.Navigator initialRouteName="Connect" screenOptions={Screenstyle}>
    {renderNavElement(navArr)}
  </Tab.Navigator>
);

const Route = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Connect">
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
        name="Match3Game"
        component={Match3Game}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HangManGame"
        component={HangManGame}
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
      <Stack.Screen
        name="Shop"
        options={{
          headerShown: false,
        }}
        component={ShopScreen}
      />
      <Stack.Screen
        name="TrendMarket"
        options={{
          headerShown: false,
        }}
        component={TrendMarketScreen}
      />
      <Stack.Screen
        name="Play"
        options={{
          headerShown: false,
        }}
        component={PlayScreen}
      />

      <Stack.Screen
        name="League"
        component={LeagueScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          navigationBarHidden: false,
        }}
      />
    </Stack.Navigator>
    <AlertComponent />
    <LoadingComponent />
  </NavigationContainer>
);

export default Route;

const Screenstyle: BottomTabNavigationOptions = {
  headerShadowVisible: false,
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 0,

    borderBottomWidth: 0,
    shadowColor: "#000000",
    elevation: 0,
    backgroundColor: "rgba(255, 255, 255, 0)",
    height: 90,
  },
};
