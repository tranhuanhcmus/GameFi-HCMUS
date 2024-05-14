import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Healthpoint from "../../../assets/Healthpoint.svg";
import Pet from "../../../assets/Pet.png"; // TODO: CHANGE LATER
import Damage from "../../../assets/Damage.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import StatisticModal from "./StatisticModal";
export default function DetailOfPet(props: any) {
  const [data, setData] = useState({ ...props.route.params });
  const [isStaticModalVisible, setIsStaticModalVisible] = useState(false);
  const navigate = useCustomNavigation();
  return (
    <View
      style={{
        backgroundColor: COLOR.PURPLE,
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
        display: "flex",
      }}
    >
      <StatisticModal
        isVisible={isStaticModalVisible}
        setIsVisible={setIsStaticModalVisible}
      />
      <CustomText
        style={{
          fontSize: 40,
          color: COLOR.YELLOW,
          fontFamily: "mrt-mid",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {data.name}
      </CustomText>

      <View style={[styles.petContainer, { marginBottom: 0, marginTop: 40 }]}>
        <TouchableOpacity
          onPress={() => {
            setIsStaticModalVisible(true);
          }}
        >
          <CustomText style={{ color: COLOR.WHITE }}>STATS</CustomText>
        </TouchableOpacity>
        <Image
          source={data.petImg !== "" ? { uri: data.petImg } : { uri: Pet }}
          alt=""
          style={styles.petImage}
        />
      </View>

      {/* Level */}
      <View
        style={[
          styles.levelContainer,
          {
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 100,
          },
        ]}
      >
        <CustomText style={styles.levelTitle}>Level</CustomText>
        <CustomText style={styles.levelTitle}>{data.level}</CustomText>
      </View>
      <View
        style={{
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AwesomeButton
          onPress={() => {
            navigate.navigate("Play");
          }}
          backgroundDarker={COLOR.DARK_YELLOW}
          backgroundColor={COLOR.YELLOW}
          width={80}
          height={30}
          borderRadius={40}
        >
          Back
        </AwesomeButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  petNameTitle: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontFamily: "mrt-mid",
  },
  hpTitle: {
    fontSize: 30,
    color: COLOR.RED,
    fontFamily: "mrt-mid",
  },
  damgeTitle: {
    fontSize: 30,
    color: COLOR.GRAY,
    fontFamily: "mrt-mid",
  },
  hpContainer: {
    width: "50%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  hpBar: {
    width: 100,
    height: 15,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLOR.RED,
  },
  damageContainer: {
    width: "60%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  damageBar: {
    width: 100,
    height: 15,
    backgroundColor: COLOR.GRAY2,
  },
  petContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  equipmentContainer: {
    width: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  petImage: {
    width: "70%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR.YELLOW,
  },
  levelContainer: {
    width: "100%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  levelTitle: {
    fontSize: 30,
    color: COLOR.WHITE,
    fontFamily: "mrt-mid",
  },
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
});
