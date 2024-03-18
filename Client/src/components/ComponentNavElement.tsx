// ComponentNavElement.tsx
import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

interface ComponentNavElementProps {
  focused: boolean;
  children?: React.ReactNode;
  content: string;
}

const ComponentNavElement: React.FC<ComponentNavElementProps> = ({
  focused,
  children,
  content,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {children}
      <CustomText
        style={{
          fontFamily: "rexlia",
          fontWeight: focused ? "900" : "400",
          fontSize: focused ? 20 : 18,
          color: "white",
        }}
      >
        {content}
      </CustomText>
    </View>
  );
};

export default ComponentNavElement;
