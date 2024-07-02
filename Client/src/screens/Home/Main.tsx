import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from "react-native";
import NormalButton from "../../components/Button/NormalButton";
import { useSelector } from "react-redux";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { SocketIOClient } from "../../../socket";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
import { useAppDispatch } from "../../redux/store";
import { selectUser } from "../../redux/userSlice";

// import SpriteSheet from "rn-sprite-sheet";
import SpriteSheet from "../../components/SpriteSheet";
import LoadingModal from "../../components/Game/LoadingModal";
import { COLOR } from "../../utils/color";
import { useIsFocused } from "@react-navigation/native";
import Inventory from "../../../assets/inventory.svg";
import ChooseGameModal from "./ChooseGameModal";
import InventoryModal from "./Inventory";
import DiamondGameBg from "../../../assets/DiamondGameBg.jpg";
import HangmanBg from "../../../assets/HangmanBg.png";
import Thunder from "../../../assets/thunder.svg";

import { updatePet } from "../../redux/petSlice";
import { UserService } from "../../services/UserService";
import logger from "../../logger";
import { BoostEffectsService } from "../../services/BoostEffectsService";
import { calculateEnergy } from "../../utils/pet";
type Props = {};

const HomeScreen = () => {
  /** Constant */
  const health = 60;

  /** useState */
  const [isVisible, setIsVisible] = useState(false);
  const [isChooseGameModalVisible, setIsChooseGameModalVisible] =
    useState(false);
  const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false);
  const [boostEffects, setBoostEffects] = useState(3);
  const isFocused = useIsFocused();

  const [gameName, setGameName] = useState<string>("");
  const [fps, setFps] = useState<string>("10");
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);

  /** useAccount */
  const { address } = useAccount();

  /** useSelector */
  const userState = useSelector(selectUser);
  const { name, type, image, title, tokenId, attributes, level } = useSelector(
    (state: any) => state.pet,
  );

  /** useBalance */
  const { data, isError, isLoading } = useBalance({
    address: userState.address,
  });

  /** useDisconnect */
  const { disconnect } = useDisconnect(); // Add useDisconnect hook

  /** useCustomNavigation */
  const navigate = useCustomNavigation();

  /** useAppDispatch */
  const dispatch = useAppDispatch();
  const socket = SocketIOClient.getInstance();

  /** useRef */
  const mummyRef = useRef<SpriteSheet>(null);

  const play = (type: string) => {
    const parsedFps = Number(fps);

    if (mummyRef.current) {
      mummyRef.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
        onFinish: () => console.log("hi"),
      });
    }

    setLoop(true);
    setResetAfterFinish(true);
  };

  const healthBarScaleValue = new Animated.Value(1);
  const inventoryTranslateYValue = new Animated.Value(0);
  const changeGameBtnTranslateYValue = new Animated.Value(0);
  const playGameBtnTranslateYValue = new Animated.Value(0);
  let healthBarWidth =
    ((ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 200 -
      ConstantsResponsive.XR * 60 -
      ConstantsResponsive.XR * 6) *
      health) /
    100;

  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const res: any[] = await ItemAppOwnerService.getItemAppOwner(address);
  //     console.log("fetchData res", res.data);
  //     // const mappedData: any[] = res.map((nft: any) => {
  //     //   console.log("nft ", nft);
  //     //   return {
  //     //     id: nft.tokenid,
  //     //     element: ELEMENT.FIRE,
  //     //     level: getLevel(nft.exp),
  //     //     petImg: nft.data.image || "",
  //     //     name: nft.data.name,
  //     //     rarityPet: "special",
  //     //   };
  //     // });

  //     // setData(mappedData);
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate.replace("Connect");
  //     dispatch(setAddress(undefined));
  //   } else {
  //     dispatch(setAddress(address));
  //   }
  // }, [isConnected]);

  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate.replace("Connect");
  //     dispatch(setAddress(undefined));
  //   } else {
  //     dispatch(setAddress(address));
  //   }
  // }, [isConnected]);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(healthBarScaleValue, {
        toValue: 1.1,
        tension: 10,
        useNativeDriver: true,
      }),
      Animated.spring(healthBarScaleValue, {
        toValue: 1,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused, boostEffects]);

  useEffect(() => {
    if (isFocused) {
      play("walk");
    } else {
      // Optional: stop the animation when the screen is not focused
      stop();
    }
  }, [isFocused]);

  const fetchBoostEffects = async () => {
    try {
      const res: any[] = await BoostEffectsService.getBoostEffects();

      console.log("Successfully fetchBoostEffects ", res);
      const data = res.find((item: any) => item.tokenId === tokenId);
      if (data) {
        let energyCnt = calculateEnergy(data.lastTimeBoost);
        setBoostEffects(energyCnt);
      }
    } catch (error) {
      console.error("Error fetchBoostEffects:", error);
    }
  };

  useEffect(() => {
    logger.debug("eheheh fetchBoostEffects");
    if (tokenId !== "") {
      fetchBoostEffects();
    }
  }, [tokenId]);
  const fetchData = async () => {
    try {
      const res: any[] = await UserService.getNFTsByOwner(address);

      const data = res[0].data; // SET DEFAULT THE FIRST
      dispatch(updatePet(data));
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    if (!name || !type || !image || !title || !tokenId || !attributes || !level)
      fetchData();
  }, []);

  useEffect(() => {
    logger.warn(
      "name, type, image, title, tokenId, attributes, level  ",
      name,
      type,
      image,
      title,
      tokenId,
      attributes,
      level,
    );
  }, [name, type, image, title, tokenId, attributes, level]);

  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLOR.PURPLE,
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
      }}
    >
      <ChooseGameModal
        setGameName={setGameName}
        isVisible={isChooseGameModalVisible}
        setIsVisible={setIsChooseGameModalVisible}
      />
      <InventoryModal
        isVisible={isInventoryModalVisible}
        setIsVisible={setIsInventoryModalVisible}
      />
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require("../../../assets/backGroundHome_4.png")}
      />
      <LoadingModal
        gameName={gameName}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          justifyContent: "flex-end",
          top: ConstantsResponsive.YR * 2 * 120,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.sequence([
              Animated.timing(inventoryTranslateYValue, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(inventoryTranslateYValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
              }),
            ]).start(() => {
              setIsInventoryModalVisible(true);
            });
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: inventoryTranslateYValue }],
            }}
          >
            <Inventory
              height={ConstantsResponsive.YR * 120}
              width={ConstantsResponsive.XR * 120}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: ConstantsResponsive.YR * 120,
          marginTop: ConstantsResponsive.YR * 150,
        }}
      >
        <CustomText
          style={{
            // fontFamily: "mt-2",
            fontWeight: "bold",
            fontFamily: "rexlia",
            fontSize: 40,
            color: COLOR.RED_BG_BUTTON,
          }}
        >
          LEVEL {level}
        </CustomText>
        <Animated.View
          style={[
            styles.healthBar,
            { transform: [{ scale: healthBarScaleValue }] },
          ]}
        >
          {boostEffects >= 3 ? (
            <>
              <Thunder
                width={ConstantsResponsive.MAX_WIDTH * 0.1}
                height={ConstantsResponsive.MAX_WIDTH * 0.1}
              />
              <Thunder
                width={ConstantsResponsive.MAX_WIDTH * 0.1}
                height={ConstantsResponsive.MAX_WIDTH * 0.1}
              />
              <Thunder
                width={ConstantsResponsive.MAX_WIDTH * 0.1}
                height={ConstantsResponsive.MAX_WIDTH * 0.1}
              />
            </>
          ) : boostEffects >= 2 ? (
            <>
              <Thunder
                width={ConstantsResponsive.MAX_WIDTH * 0.1}
                height={ConstantsResponsive.MAX_WIDTH * 0.1}
              />
              <Thunder
                width={ConstantsResponsive.MAX_WIDTH * 0.1}
                height={ConstantsResponsive.MAX_WIDTH * 0.1}
              />
            </>
          ) : boostEffects >= 1 ? (
            <>
              <Thunder
                width={ConstantsResponsive.MAX_WIDTH * 0.1}
                height={ConstantsResponsive.MAX_WIDTH * 0.1}
              />
            </>
          ) : (
            <></>
          )}
        </Animated.View>
      </View>

      <View style={styles.playArea}>
        <View className="absolute bottom-0 left-0 right-0  items-center">
          <SpriteSheet
            ref={mummyRef}
            source={require("../../../assets/spritesSheet_18.png")}
            columns={60}
            rows={1}
            height={ConstantsResponsive.MAX_HEIGHT * 0.3}
            animations={{
              walk: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
              ],
            }}
          />
          {/* <SpriteSheet
            ref={mummyRef}
            source={require("../../../assets/spritesheet_5.png")}
            columns={21}
            offsetX={0}
            offsetY={0}
            rows={1}
            height={ConstantsResponsive.MAX_HEIGHT * 0.2}
            animations={{
              walk: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20,
              ],
            }}
          /> */}
        </View>
      </View>
      <View
        style={{
          height: "auto",
          width: ConstantsResponsive.MAX_WIDTH,
          position: "absolute",
          bottom: ConstantsResponsive.YR * 120,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
          paddingHorizontal: ConstantsResponsive.MAX_WIDTH * 0.03,
        }}
      >
        <Animated.View
          style={{ transform: [{ translateY: changeGameBtnTranslateYValue }] }}
        >
          <NormalButton
            onPress={() => {
              Animated.sequence([
                Animated.timing(changeGameBtnTranslateYValue, {
                  toValue: 10,
                  duration: 150,
                  useNativeDriver: true,
                }),
                Animated.timing(changeGameBtnTranslateYValue, {
                  toValue: 0,
                  duration: 150,
                  useNativeDriver: true,
                }),
              ]).start(() => {
                setIsChooseGameModalVisible(true);
              });
            }}
            style={styles.btnChooseGame}
          >
            <Image
              style={{
                position: "absolute",
                width: ConstantsResponsive.MAX_WIDTH * 0.3,
                height: ConstantsResponsive.MAX_HEIGHT * 0.09,
              }}
              resizeMode="stretch"
              source={require("../../../assets/backGroundButtonBrown.png")}
            />
            <Text style={[styles.textSizeChangGame, { color: COLOR.WHITE }]}>
              CHANGE GAME
            </Text>
          </NormalButton>
        </Animated.View>
        <Animated.View
          style={{ transform: [{ translateY: playGameBtnTranslateYValue }] }}
        >
          <NormalButton
            onPress={() => {
              Animated.sequence([
                Animated.timing(playGameBtnTranslateYValue, {
                  toValue: 10,
                  duration: 150,
                  useNativeDriver: true,
                }),
                Animated.timing(playGameBtnTranslateYValue, {
                  toValue: 0,
                  duration: 150,
                  useNativeDriver: true,
                }),
              ]).start(() => {
                if (!isVisible) setIsVisible(true);

                socket.emitFindMatch(gameName);
              });
            }}
            style={styles.btnPlay}
          >
            <Image
              style={{
                position: "absolute",
                width: ConstantsResponsive.MAX_WIDTH * 0.6,
                height: ConstantsResponsive.MAX_HEIGHT * 0.09,
              }}
              resizeMode="stretch"
              source={require("../../../assets/backGroundButtonRed.png")}
            />
            <View
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                columnGap: 20,
              }}
            >
              <Image
                source={gameName === "HangManGame" ? HangmanBg : DiamondGameBg}
                style={{
                  height: ConstantsResponsive.MAX_HEIGHT * 0.1 * 0.7,
                  width: ConstantsResponsive.MAX_HEIGHT * 0.1 * 0.7,
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
              />
              <Text style={styles.textSize}>Play</Text>
            </View>
          </NormalButton>
        </Animated.View>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },

  btnPlay: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: COLOR.RED_BG_BUTTON,
    justifyContent: "center",
    width: ConstantsResponsive.MAX_WIDTH * 0.6,
    height: ConstantsResponsive.MAX_HEIGHT * 0.09,
  },
  btnChooseGame: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    shadowColor: COLOR.BROWN,
    alignItems: "center",
    justifyContent: "center",
    width: ConstantsResponsive.MAX_WIDTH * 0.3,
    height: ConstantsResponsive.MAX_HEIGHT * 0.09,
  },
  labelButton: {
    height: ConstantsResponsive.YR * 80,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 100,
    top: -30,
  },
  textSize: {
    fontSize: ConstantsResponsive.YR * 50,
    lineHeight: ConstantsResponsive.YR * 50,
    fontWeight: "900",
    textAlign: "center",
    color: "white",
  },
  textSizeChangGame: {
    fontSize: ConstantsResponsive.YR * 20,
    lineHeight: ConstantsResponsive.YR * 20,
    fontWeight: "900",
    textAlign: "center",
  },

  topPanel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: ConstantsResponsive.YR * 250,
    flexDirection: "column",
  },
  statsContainer: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.YR * 120,
    flexDirection: "row",
  },
  stats: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseButton: {
    width: ConstantsResponsive.YR * 50,
    height: ConstantsResponsive.YR * 50,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pauseButtonIcon: {
    width: ConstantsResponsive.YR * 25,
    height: ConstantsResponsive.YR * 25,
  },
  levelContainer: {
    width: ConstantsResponsive.YR * 80,
    height: ConstantsResponsive.YR * 80,
    backgroundColor: "#ff1a1a",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  levelTitle: {
    fontSize: 21,
    color: "white",
    fontFamily: "LilitaOne",
  },
  levelNumber: {
    fontSize: 17,
    color: "white",
    fontFamily: "LilitaOne",
  },
  scoreIcon: {
    position: "absolute",
    left: 0,
    width: ConstantsResponsive.YR * 40,
    height: ConstantsResponsive.YR * 40,
  },
  scoreBar: {
    height: ConstantsResponsive.YR * 25,
    position: "absolute",
    left: 20,
    right: 5,
    backgroundColor: "white",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 17,
    color: "black",
    fontFamily: "LilitaOne",
  },
  timeIcon: {
    position: "absolute",
    left: 0,
    width: ConstantsResponsive.YR * 40,
    height: ConstantsResponsive.YR * 40,
  },
  timeBar: {
    height: ConstantsResponsive.YR * 25,
    position: "absolute",
    left: 20,
    right: 5,
    backgroundColor: "white",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  timeNumber: {
    fontSize: 17,
    color: "black",
    fontFamily: "LilitaOne",
  },
  healthBarContainer: {
    height: ConstantsResponsive.YR * 40,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 120,
    marginLeft: ConstantsResponsive.XR * 60,
  },
  healthIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ConstantsResponsive.YR * 46,
    height: ConstantsResponsive.YR * 40,
  },
  healthBar: {
    height: ConstantsResponsive.MAX_WIDTH * 0.1,
    width:
      ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 200 -
      ConstantsResponsive.XR * 60,
    marginLeft: ConstantsResponsive.XR * 40,
    marginTop: ConstantsResponsive.YR * 10,
    borderRadius: ConstantsResponsive.YR * 10,
    paddingHorizontal: ConstantsResponsive.MAX_WIDTH * 0.1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: COLOR.RED_BG_BUTTON,
    left: ConstantsResponsive.XR * 3,

    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },
  playArea: {
    width: ConstantsResponsive.MAX_WIDTH,
    position: "absolute",
    bottom: ConstantsResponsive.YR * 120 + ConstantsResponsive.YR * 120,

    height: ConstantsResponsive.MAX_HEIGHT * 0.3,
    flexDirection: "column",
  },
  playRow: {
    height:
      (ConstantsResponsive.MAX_HEIGHT -
        ConstantsResponsive.YR * 250 -
        ConstantsResponsive.YR * 112) /
      4,
    width: ConstantsResponsive.MAX_WIDTH,
    flexDirection: "row",
  },
  playCell: {
    width: ConstantsResponsive.MAX_WIDTH / 3,
    height:
      (ConstantsResponsive.MAX_HEIGHT -
        ConstantsResponsive.YR * 250 -
        ConstantsResponsive.YR * 112) /
      4,
    alignItems: "center",
  },
});
