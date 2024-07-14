import React, { useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
} from "react-native";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";
import { ImageSourcePropType } from "react-native";
import NormalButton from "./Button/NormalButton";
import { API } from "../apis/constants";

interface Food {
  id: number;
  image: ImageSourcePropType;
}

interface Props {
  arrayFood: Food[];
  onPress: (id: number, x: number, y: number) => void;
}

const ListFood: React.FC<Props> = (props: Props) => {
  const refs = useRef<{ [key: number]: any }>({});

  const handlePress = (id: number) => {
    const handle = findNodeHandle(refs.current[id]);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        props.onPress(id, pageX, pageY);
      });
    }
  };
  const containerWidth =
    props.arrayFood.length >= 2
      ? ConstantsResponsive.MAX_WIDTH * 0.425
      : ConstantsResponsive.MAX_WIDTH * 0.2;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.arrayFood.map((food, index) => (
          <TouchableOpacity
            key={food.id}
            ref={(el) => (refs.current[food.id] = el)}
            onPress={() => {
              handlePress(food.id);
            }}
            style={[
              styles.foodItem,
              index !== props?.arrayFood?.length - 1 && styles.foodItemMargin, // Apply margin except for the last item
            ]}
          >
            <Image
              style={{
                position: "absolute",
                borderRadius: ConstantsResponsive.YR * 30,
                width: ConstantsResponsive.MAX_WIDTH * 0.2,
                padding: ConstantsResponsive.XR * 10,
                height: ConstantsResponsive.MAX_HEIGHT * 0.08,
              }}
              resizeMode="stretch"
              source={require("../../assets/backGroundButtonBrown-1.png")}
            />
            <Image
              source={{ uri: API.server + food.image }}
              resizeMode="contain"
              style={styles.foodImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListFood;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
  },
  foodItem: {
    borderRadius: ConstantsResponsive.YR * 30,
    width: ConstantsResponsive.MAX_WIDTH * 0.2,
    padding: ConstantsResponsive.XR * 10,
    height: ConstantsResponsive.MAX_HEIGHT * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  foodItemMargin: {
    marginRight: ConstantsResponsive.MAX_WIDTH * 0.025, // Add margin to create the gap between items
  },
  foodImage: {
    width: "100%",
    height: "100%",
  },
});
