import { ScrollView, View, Image, Animated } from "react-native";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import CustomText from "../../components/CustomText";
import { useEffect, useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Trophy from "../../../assets/Trophy.png";
import { useIsFocused } from "@react-navigation/native";
const LeagueScreen = () => {
  const [data, setData] = useState([
    { id: 1, rank: 2, name: "You", point: 320 },
    { id: 2, rank: 1, name: "CarlGamer", point: 490 },
    { id: 3, rank: 3, name: "Brenda", point: 220 },
    { id: 4, rank: 4, name: "Peter", point: 190 },
    { id: 5, rank: 5, name: "Jake", point: 90 },
    { id: 6, rank: 6, name: "Cheryl", point: 90 },
  ]);
  const translateXValue = new Animated.Value(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    Animated.sequence([
      Animated.spring(translateXValue, {
        toValue: 10,
        tension: 10,
        useNativeDriver: true,
      }),
      Animated.spring(translateXValue, {
        toValue: 0,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused]);

  return (
    <View
      style={{
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
        backgroundColor: COLOR.PURPLE,
      }}
    >
      {/* <Image
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT,
          position: "absolute",
        }}
        resizeMode="stretch"
        source={require("../../../assets/backGroundHome_2.jpeg")}
      /> */}
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CustomText
          style={{
            fontSize: 40,
            // fontFamily: "mt-2",
            fontWeight: "bold",
            color: COLOR.YELLOW,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 15,
          }}
        >
          ROOKIE
        </CustomText>
        <CustomText
          style={{
            fontSize: 35,
            // fontFamily: "mt-2",
            color: COLOR.YELLOW,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 15,
          }}
        >
          LEAGUE
        </CustomText>
      </View>
      <ScrollView>
        {data
          ? data.map((item, index) => (
              <Animated.View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginBottom: 10,
                  borderRadius: 20,
                  transform: [{ translateX: translateXValue }],
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <Image
                    source={Avatar}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 20,
                      marginEnd: 10,
                    }}
                  />
                  <CustomText
                    style={{ color: COLOR.WHITE, fontSize: 20, marginEnd: 10 }}
                  >
                    {item.rank}.
                  </CustomText>
                  <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
                    {item.name}
                  </CustomText>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "25%",
                  }}
                >
                  <Image
                    source={Trophy}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                  />
                  <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
                    {item.point}
                  </CustomText>
                </View>
              </Animated.View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default LeagueScreen;
