import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { API } from "../apis/constants";
import ConstantsResponsive from "../constants/Constanst";
import CustomText from "./CustomText";

interface Props {
  name: string;
  quantity: number;
  itemImg?: any;
}

const ItemShowComponent: React.FC<Props> = ({ name, quantity, itemImg }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", columnGap: 5 }}>
      <Image
        resizeMode="contain"
        source={{ uri: API.server + itemImg }}
        style={styles.img}
      />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: ConstantsResponsive.YR * 30,
          }}
        >
          {quantity}X
        </CustomText>
        <CustomText
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            maxWidth: ConstantsResponsive.XR * 100,
            fontSize: ConstantsResponsive.YR * 20,
          }}
        >
          {name}
        </CustomText>
      </View>
    </View>
  );
};
export default ItemShowComponent;
const styles = StyleSheet.create({
  container: {
    height: ConstantsResponsive.MAX_HEIGHT / 2.5,
    borderRadius: ConstantsResponsive.XR * 60,
  },

  img: {
    width: ConstantsResponsive.MAX_WIDTH / 3,

    height: ConstantsResponsive.MAX_WIDTH / 3,
  },
});
