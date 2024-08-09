import { ScrollView, View, Image, Animated, StatusBar } from "react-native";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import CustomText from "../../components/CustomText";
import { useEffect, useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Trophy from "../../../assets/Trophy.png";
import { useIsFocused } from "@react-navigation/native";
import { LeagueService } from "../../services/LeagueService";
import logger from "../../logger";
import { shortenString } from "../../utils/StringUtils";
const LeagueScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    StatusBar.setHidden(true);
    StatusBar.setTranslucent(true);
  }, []);
  const fetchData = async () => {
    const data = await LeagueService.getUserCupsList();
    const newData = data.map((user: any, index: number) => ({
      id: index + 1,
      rank: index + 1,
      ...user, // Spread the user data to include name and point
    }));
    setData(newData);
  };
  // const [data, setData] = useState([
  //   { id: 1, rank: 2, name: "You", point: 320 },
  //   { id: 2, rank: 1, name: "CarlGamer", point: 490 },
  //   { id: 3, rank: 3, name: "Brenda", point: 220 },
  //   { id: 4, rank: 4, name: "Peter", point: 190 },
  //   { id: 5, rank: 5, name: "Jake", point: 90 },
  //   { id: 6, rank: 6, name: "Cheryl", point: 90 },
  // ]);
  const translateXValue = new Animated.Value(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
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
    }
  }, [isFocused, data]);

  return (
    <View
      style={{
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
        backgroundColor: COLOR.PURPLE,
      }}
    >
      <Image
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT,
          position: "absolute",
        }}
        resizeMode="stretch"
        source={require("../../../assets/backGroundForInventory.png")}
      />
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
            fontFamily: "rexlia",

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
            fontFamily: "rexlia",
            color: COLOR.YELLOW,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 15,
          }}
        >
          LEAGUE
        </CustomText>
      </View>

      {data && data.length ? (
        <ScrollView>
          {data.map((item: any, index) => (
            <Animated.View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

                alignItems: "center",

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
                  style={{
                    color: COLOR.WHITE,
                    fontSize: 20,
                    marginEnd: 10,
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  {item.rank}.
                </CustomText>
                <CustomText
                  style={{
                    color: COLOR.WHITE,
                    fontSize: 20,
                    fontFamily: "rexlia",
                  }}
                >
                  {shortenString(item.owner)}
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
                <CustomText
                  style={{
                    color: COLOR.WHITE,
                    fontSize: 20,
                    fontFamily: "rexlia",
                  }}
                >
                  {item.total_cups}
                </CustomText>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomText
            style={{
              fontSize: 35,
              fontFamily: "rexlia",
              color: COLOR.YELLOW,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 15,
            }}
          >
            No leagues here
          </CustomText>
        </View>
      )}
    </View>
  );
};

export default LeagueScreen;
