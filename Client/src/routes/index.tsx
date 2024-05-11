import React from "react";
import { View } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SVGBird from "../../assets/SVGBird.svg";
import SVGEvent from "../../assets/SVGEvent.svg";
import SVGPlay from "../../assets/SVGPlay.svg";
import SVGStore from "../../assets/SVGStore.svg"; // Import the SVG file
import SVGTrophy from "../../assets/SVGTrophy.svg";
import ConnectScreen from "../screens/Connect/Main";
import GameScreen from "../screens/Game/Main";
import PlayScreen from "../screens/Play/Main";
import ShopScreen from "../screens/Shop/Main";
import TestScreen from "../screens/Test/Main";
import AlertComponent from "../components/AlertComponent";
import ComponentNavElement from "../components/ComponentNavElement";
import Header from "../components/Header";
import LoadingComponent from "../components/LoadingComponent";
import HeaderRight from "../components/HeaderRight";
import HangManGame from "../screens/HangManGame/index";

type Props = {};
import { BreedScreen } from "../screens/Breed/Main";
import DetailOfPet from "../screens/PetDetail/Main";
import HomeScreen from "../screens/Home/Main";
import TrendMarketScreen from "../screens/TrendMarket/Main";
import HeaderLeft from "../components/HeaderLeft";

const navArr: NavItem[] = [
  {
    name: "ShopScreen",
    header: true,
    component: ShopScreen,
    content: "Shop",
    svg: <SVGStore height="100%" width="100%" />,
  },
  {
    name: "EventScreen",
    component: TrendMarketScreen,
    content: "Event",
    header: true,
    svg: <SVGEvent height="100%" width="100%" />,
  },
  {
    name: "PlayScreen",
    component: HomeScreen,
    content: "Play",
    header: true,
    svg: <SVGPlay height="100%" width="100%" />,
  },
  {
    name: "TrophyScreen",
    component: BreedScreen,
    content: "Breed",
    svg: <SVGTrophy height="100%" width="100%" />,
  },

  {
    name: "PetScreen",
    component: PlayScreen,
    content: "Pet",
    header: true,
    svg: <SVGBird height="100%" width="100%" />,
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

        headerShown: item.header || false,

        headerLeft: () => <HeaderLeft></HeaderLeft>,
        headerTitle: () => <Header name="Home" />,
        headerRight: () => <HeaderRight></HeaderRight>,
        tabBarIcon: ({ focused }: any) => (
          <ComponentNavElement content={item.content} focused={focused}>
            <View
              className={`${focused ? "h-[45px] w-[45px]" : "h-[30px] w-[30px]"}`}
            >
              {item.svg}
            </View>
          </ComponentNavElement>
        ),
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
  HangManGame: undefined;
  TrendMarket: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<LocalRootStackParamList>();
const Tab = createBottomTabNavigator();

// Bottom tab navigator.
const MainTab = () => (
  <Tab.Navigator initialRouteName="PlayScreen" screenOptions={screenStyle}>
    {renderNavElement(navArr)}
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
    </Stack.Navigator>
    <AlertComponent />
    <LoadingComponent />
  </NavigationContainer>
);

export default Route;

const screenStyle: BottomTabNavigationOptions = {
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
