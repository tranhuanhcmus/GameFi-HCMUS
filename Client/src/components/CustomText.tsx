// CustomText.tsx
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

interface CustomTextProps {
  style?: StyleProp<TextStyle>;
  className?: string;
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  className,
}) => {
  const [fontsLoaded, fontError] = useFonts({
    rexlia: require("../../assets/fonts/rexlia-rg.otf"),
    "mrt-mid": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  useEffect(() => {
    const loadFonts = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded || fontError) {
    // Return a loading indicator or fallback UI if needed
    return null;
  }

  return (
    <Text style={style} className={className}>
      {children}
    </Text>
  );
};

export default CustomText;
