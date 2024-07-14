import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import NormalButton from "../../components/Button/NormalButton";
import { useSelector } from "react-redux";
import { getFilenameFromUrl } from "../../function/DownLoadResource";
import PetsModal from "./Pets";
import { updatePetActive } from "../../redux/petActiveSlice";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { updateLevel } from "../../redux/petSlice";
import { SocketIOClient } from "../../../socket";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
import { useAppDispatch } from "../../redux/store";
import { selectUser } from "../../redux/userSlice";
import { StatusBarHeight } from "../../function/CalculateStatusBar";
import { FOODVALUE } from "../../utils/constantValue";

// import SpriteSheet from "rn-sprite-sheet";
import SpriteSheet from "../../components/SpriteSheet";

import { COLOR } from "../../utils/color";
import { setAddress } from "../../redux/userSlice";
import { useIsFocused } from "@react-navigation/native";

import Inventory from "../../../assets/inventory.svg";

import { playSound } from "../../function/SoundGame";
import ListFood from "../../components/ListFood";
import { useNavigation } from "@react-navigation/native";
import { ItemAppOwnerService } from "../../services/ItemAppOwnerService";
import StatsModal from "./Stats";
import { ItemGameOwnerService } from "../../services/ItemGameOwnerService";
import { API } from "../../apis/constants";
import { selectLoading } from "../../redux/loadingSlice";
import { height } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import Breed from "../../../assets/breed.svg";
import { setFatherPet, setMotherPet } from "../../redux/breedSlice";
import { EatService } from "../../services/EatService";
import { getLevel } from "../../utils/pet";
type Props = {};

interface item {
  id: string;
  owner: string;
  quantity: number;

  tokenId: number;
}

interface FeedState {
  feed: string | null;
  pageX: number;
  pageY: number;
}
const PetScreen = () => {
  /** Constant */
  const health = 60;

  /** useState */
  const [isVisible, setIsVisible] = useState(false);

  const [isVisibleStats, setIsVisibleStats] = useState(false);

  const [gameName, setGameName] = useState<string>("");
  const [fps, setFps] = useState<string>("10");
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [pet, setPet] = useState();

  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );

  const isFocused = useIsFocused();

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  /** useSelector */
  const userState = useSelector(selectUser);
  const {
    name,
    type,
    image,
    assets,
    active,
    title,
    tokenId,
    attributes,
    level,
    hp,
    atk,
  } = useSelector((state: any) => state.pet);

  const { tokenId: tokenIdActive, active: activeSet } = useSelector(
    (state: any) => state.petActive,
  );

  /** useBalance */
  const { data, isError, isLoading } = useBalance({
    address: userState.address,
  });

  /** useCustomNavigation */
  const navigate = useCustomNavigation();

  /** useAppDispatch */
  const dispatch = useAppDispatch();
  const socket = SocketIOClient.getInstance();

  const { isLoading: isLoadingFetch } = useSelector(selectLoading);

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
  const [feed, setFeed] = useState<FeedState>({
    feed: null,
    pageX: 600,
    pageY: 600,
  });

  const [foodArray, setFoodArray] = useState<any>([]);

  const fetchData = async () => {
    try {
      const res: any[] = await ItemAppOwnerService.getItems(
        "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
      );
      console.log(res);
      const data = res.filter((item) => item.category == "food");

      setFoodArray(data);
    } catch (error) {
      console.error("ItemGameOwnerService.getItems", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address, isFocused]);

  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };

  useEffect(() => {
    if (isFocused) {
      play("walk");
    } else {
      // Optional: stop the animation when the screen is not focused
      stop();
    }
  }, [isFocused]);
  const removeFoodItem = async (id: number, pageX: number, pageY: number) => {
    try {
      const foodItem = foodArray.find((food: any) => food.id === id);
      const foodImage = foodItem.image;

      setFeed({ feed: foodImage, pageX: pageX, pageY: pageY });
      if (foodItem.quality === "normal") {
        dispatch(updateLevel(FOODVALUE.normal));
      } else if (foodItem.quality === "rare") {
        dispatch(updateLevel(FOODVALUE.rare));
      } else {
        dispatch(updateLevel(FOODVALUE.superRare));
      }

      const food: item = {
        id: id.toString(),
        owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        quantity: 1,
        tokenId: tokenId,
      };
      setTimeout(() => {
        playSound(sound, "eatingSound");
      }, 100);

      setFoodArray((prevArray: any) =>
        prevArray.filter((item: any) => item.id !== id),
      );
      await EatService.Eat(food);
    } catch (err) {
      console.log(err);
    }
  };

  const [imageSource, setImageSource] = useState({
    uri: "",
    height: 0,
    width: 0,
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);

    Image.getSize(
      assets,
      (width, height) => {
        setImageSource({
          height: height,
          width: width,
          uri: assets,
        });
        setIsImageLoaded(true);
        play("walk");
      },
      (error) => {
        console.error("Error loading image", error);
      },
    );
  }, [assets]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timer: NodeJS.Timeout | null = null;
    const startTime = Date.now();
    const middleX = ConstantsResponsive.MAX_WIDTH / 3;
    const a = 30; // Adjust this to change the curvature of the parabola

    if (feed.feed) {
      // Interval to adjust pageX and pageY every 200ms
      interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
        setFeed((prevFeed) => {
          const newPageY = prevFeed.pageY - ConstantsResponsive.YR;
          const newPageX = a * Math.pow(elapsedTime, 2) + middleX;
          return {
            ...prevFeed,
            pageX: newPageX,
            pageY: newPageY,
          };
        });
      }, 100);

      // Timeout to hide the image after 1500ms
      timer = setTimeout(() => {
        setFeed({
          feed: null,
          pageX: 0, // Reset pageX when hiding the image
          pageY: 0,
        });
        if (interval) clearInterval(interval); // Clear the interval if it exists
      }, 1000); // Hide the image after 1500ms
    }

    return () => {
      if (interval) clearInterval(interval); // Clear the interval on cleanup
      if (timer) clearTimeout(timer); // Clear the timeout on cleanup
    };
  }, [feed.feed]);

  const [healthBarWidth, setHealthBarWidth] = useState(0);

  useEffect(() => {
    setHealthBarWidth(
      ((ConstantsResponsive.MAX_WIDTH -
        ConstantsResponsive.XR * 400 -
        ConstantsResponsive.XR * 60 -
        ConstantsResponsive.XR * 10) *
        (getLevel(level) - Math.floor(getLevel(level))) *
        100) /
        100,
    );
  }, [level]);

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
      <PetsModal isVisible={isVisible} setIsVisible={setIsVisible}></PetsModal>
      <StatsModal
        isVisible={isVisibleStats}
        setIsVisible={setIsVisibleStats}
      ></StatsModal>
      {feed?.feed && (
        <Image
          resizeMode="contain"
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.2,
            height: ConstantsResponsive.MAX_HEIGHT * 0.08,
            position: "absolute",
            zIndex: 100,
            left: ConstantsResponsive.XR * feed.pageX,
            top: ConstantsResponsive.YR * feed.pageY + StatusBarHeight,
          }}
          source={{ uri: API.server + feed?.feed }}
        ></Image>
      )}
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require("../../../assets/backGroundHome_4.png")}
      />

      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          justifyContent: "space-between",
          top: StatusBarHeight,

          paddingHorizontal: ConstantsResponsive.XR * 15,
        }}
      >
        <NormalButton
          onPress={() => {
            setIsVisible(true);
          }}
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.25,
            height: ConstantsResponsive.YR * 60,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            borderRadius: ConstantsResponsive.YR * 20,

            shadowColor: COLOR.SHADOW_BROWN,
          }}
        >
          <Image
            style={{
              position: "absolute",
              borderRadius: ConstantsResponsive.YR * 20,

              width: ConstantsResponsive.MAX_WIDTH * 0.25,
              height: ConstantsResponsive.YR * 60,
            }}
            resizeMode="stretch"
            source={require("../../../assets/backGroundButtonBrown-1.png")}
          />
          <CustomText style={styles.textSize}>MY PETS</CustomText>
        </NormalButton>

        {tokenId == tokenIdActive && activeSet == true ? (
          <NormalButton
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.4,
              height: ConstantsResponsive.YR * 60,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              columnGap: ConstantsResponsive.XR * 10,
              borderRadius: ConstantsResponsive.YR * 20,
              paddingVertical: ConstantsResponsive.YR * 20,
            }}
          >
            <Image
              source={require("../../../assets/fightActive.png")}
              style={{ height: "240%" }}
              resizeMode="contain"
            ></Image>
            <CustomText
              style={[
                styles.textSize,
                {
                  color: COLOR.CREAM,
                  fontWeight: "heavy",
                  fontSize: ConstantsResponsive.YR * 26,
                },
              ]}
            >
              ACTIVE
            </CustomText>
          </NormalButton>
        ) : (
          <NormalButton
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.4,
              height: ConstantsResponsive.YR * 60,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              columnGap: ConstantsResponsive.XR * 10,
              borderRadius: ConstantsResponsive.YR * 20,
              paddingVertical: ConstantsResponsive.YR * 20,
              shadowColor: COLOR.RED_BG_BUTTON,
            }}
            onPress={() => {
              dispatch(
                updatePetActive({
                  name: name,
                  type: type,
                  image: image,
                  title: title,
                  hp: hp,
                  atk: atk,
                  active: true,
                  assets: assets,
                  tokenId: tokenId,
                  level: level,
                  attributes: {
                    ...attributes,
                  },
                }),
              );
            }}
          >
            <Image
              style={{
                position: "absolute",
                borderRadius: ConstantsResponsive.YR * 20,
                paddingVertical: ConstantsResponsive.YR * 20,
                width: ConstantsResponsive.MAX_WIDTH * 0.4,
                height: ConstantsResponsive.YR * 60,
              }}
              resizeMode="stretch"
              source={require("../../../assets/backGroundButtonRed_1.png")}
            />
            <Image
              source={require("../../../assets/fight.png")}
              style={{ height: "240%" }}
              resizeMode="contain"
            ></Image>
            <CustomText style={styles.textSize}>SET AS ACTIVE</CustomText>
          </NormalButton>
        )}
      </View>

      <View
        style={{
          height: "auto",
          width: ConstantsResponsive.MAX_WIDTH,
          position: "absolute",
          top: StatusBarHeight + ConstantsResponsive.YR * 90,
          rowGap: ConstantsResponsive.YR * 20,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomText
            style={{
              fontFamily: "rexlia",
              fontSize: ConstantsResponsive.YR * 40,
              fontWeight: "heavy",
              color: COLOR.BLACK,
            }}
          >
            {name}
          </CustomText>
          <View
            style={{
              height: ConstantsResponsive.YR * 60,

              width: ConstantsResponsive.MAX_WIDTH,
              display: "flex",
              flexDirection: "row",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{
                fontWeight: "bold",
                fontSize: ConstantsResponsive.YR * 28,
                color: COLOR.BLACK,
                alignSelf: "center",
                fontFamily: "rexlia",
              }}
            >
              LEVEL {Math.floor(getLevel(level))}
            </CustomText>
            <View style={styles.healthBar}>
              <View
                style={[styles.healthBarInner, { width: healthBarWidth }]}
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          paddingHorizontal: ConstantsResponsive.XR * 10,
          justifyContent: "center",

          width: ConstantsResponsive.XR * 80,
          borderRadius: ConstantsResponsive.XR * 30,
          height: ConstantsResponsive.XR * 100,
          left: ConstantsResponsive.XR * 10,
          rowGap: 2,
          top: ConstantsResponsive.YR * 3 * 120,
        }}
        onPress={() => {
          setIsVisibleStats(true);
        }}
      >
        <Image
          style={{
            position: "absolute",
            borderRadius: ConstantsResponsive.XR * 30,
            paddingVertical: ConstantsResponsive.YR * 20,
            width: ConstantsResponsive.XR * 80,
            height: ConstantsResponsive.XR * 100,
          }}
          resizeMode="stretch"
          source={require("../../../assets/backGroundButtonBrown-1.png")}
        />
        <View
          style={{
            backgroundColor: COLOR.YELLOW_BOX,
            width: ConstantsResponsive.XR * 35,
            height: ConstantsResponsive.XR * 15,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            backgroundColor: COLOR.YELLOW_BOX,
            width: ConstantsResponsive.XR * 50,
            height: ConstantsResponsive.XR * 15,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            backgroundColor: COLOR.YELLOW_BOX,
            width: ConstantsResponsive.XR * 20,
            height: ConstantsResponsive.XR * 15,
            borderRadius: 10,
          }}
        />
        <CustomText
          style={{
            fontFamily: "rexlia",
            color: COLOR.WHITE,
            fontSize: ConstantsResponsive.XR * 20,
            position: "absolute",
            alignSelf: "center",
            bottom: -4,
          }}
        >
          STATS
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          paddingHorizontal: ConstantsResponsive.XR * 10,
          justifyContent: "center",
          zIndex: 100,

          width: ConstantsResponsive.XR * 80,
          borderRadius: ConstantsResponsive.XR * 30,
          height: ConstantsResponsive.XR * 100,
          left: ConstantsResponsive.XR * 10,
          rowGap: 2,
          top: ConstantsResponsive.YR * 3 * 155,
        }}
        onPress={() => {
          dispatch(setFatherPet({ id: null, name: null, image: null }));
          dispatch(setMotherPet({ id: null, name: null, image: null }));
          navigate.navigate("Breed");
        }}
      >
        <Image
          style={{
            position: "absolute",
            borderRadius: ConstantsResponsive.XR * 30,
            paddingVertical: ConstantsResponsive.YR * 20,
            width: ConstantsResponsive.XR * 80,
            height: ConstantsResponsive.XR * 100,
          }}
          resizeMode="stretch"
          source={require("../../../assets/backGroundButtonBrown-1.png")}
        />
        <Breed
          width={ConstantsResponsive.XR * 50}
          height={ConstantsResponsive.XR * 70}
          style={{
            position: "absolute",
            marginLeft: ConstantsResponsive.XR * 15,
            marginTop: ConstantsResponsive.XR * 10,
          }}
        />
        <CustomText
          style={{
            fontFamily: "rexlia",
            color: COLOR.WHITE,
            fontSize: ConstantsResponsive.XR * 20,
            position: "absolute",
            alignSelf: "center",
            bottom: -4,
          }}
        >
          BREED
        </CustomText>
      </TouchableOpacity>

      <View style={styles.playArea}>
        <View className="absolute bottom-0 left-0 right-0  items-center ">
          {isImageLoaded ? (
            <SpriteSheet
              ref={mummyRef}
              source={imageSource}
              columns={60}
              height={ConstantsResponsive.YR * 300}
              rows={1}
              animations={{
                walk: Array.from({ length: 60 }, (_, i) => i),
              }}
            />
          ) : (
            isLoadingFetch == false && (
              <ActivityIndicator size="large" color="#0000ff" />
            )
          )}
        </View>
      </View>
      <View
        style={{
          height: "auto",
          width: ConstantsResponsive.MAX_WIDTH,
          position: "absolute",
          bottom: ConstantsResponsive.YR * 100,
          rowGap: ConstantsResponsive.YR * 20,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            height: "auto",

            width: ConstantsResponsive.MAX_WIDTH,
            display: "flex",
            flexDirection: "row",
            columnGap: ConstantsResponsive.XR * 10,
            paddingHorizontal: ConstantsResponsive.XR * 50,
          }}
        >
          {foodArray.length > 0 && (
            <ListFood arrayFood={foodArray} onPress={removeFoodItem} />
          )}

          <NormalButton
            onPress={() => {
              navigate.navigate("MainTab", {
                screen: "ShopScreen",
              });
            }}
            style={styles.btnGetFood}
          >
            <Image
              style={{
                position: "absolute",
                borderRadius: ConstantsResponsive.YR * 20,
                width: ConstantsResponsive.MAX_WIDTH * 0.25,
                padding: ConstantsResponsive.XR * 12,
                height: ConstantsResponsive.MAX_HEIGHT * 0.075,
              }}
              resizeMode="stretch"
              source={require("../../../assets/backGroundButtonBrown-1.png")}
            />
            <CustomText style={styles.textSize} className="font-rexlia">
              GET FOOD
            </CustomText>
          </NormalButton>
        </View>
      </View>
    </View>
  );
};

export default PetScreen;
const styles = StyleSheet.create({
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },

  btnGetFood: {
    position: "relative",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLOR.SHADOW_BROWN,

    borderRadius: ConstantsResponsive.YR * 20,
    width: ConstantsResponsive.MAX_WIDTH * 0.25,
    padding: ConstantsResponsive.XR * 12,
    height: ConstantsResponsive.MAX_HEIGHT * 0.075,
  },

  textSize: {
    fontSize: ConstantsResponsive.YR * 22,
    fontFamily: "rexlia",
    fontWeight: "900",
    textAlign: "center",

    color: COLOR.WHITE,
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

  healthBarContainer: {
    height: ConstantsResponsive.YR * 40,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 120,
    marginLeft: ConstantsResponsive.XR * 60,
  },

  healthBar: {
    height: ConstantsResponsive.YR * 20,
    width:
      ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 400 -
      ConstantsResponsive.XR * 60,
    marginLeft: ConstantsResponsive.XR * 40,

    backgroundColor: COLOR.WHITE,
    borderWidth: 2,
    borderColor: COLOR.BLACK,
    borderRadius: ConstantsResponsive.YR * 10,
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: COLOR.BLACK,
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
});
