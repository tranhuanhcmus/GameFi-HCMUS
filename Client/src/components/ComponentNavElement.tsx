// ComponentNavElement.tsx
import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";

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
          color: focused ? COLOR.WHITE : COLOR.GRAY,
          fontSize: ConstantsResponsive.XR * 25,
        }}
      >
        {content}
      </CustomText>
    </View>
  );
};

export default ComponentNavElement;
