import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import PetAvatar from "../../../assets/Pet.png";
import backGroundImage from "../../../assets/background3.png";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { COLOR } from "../../utils/color";
import Egg from "../../../assets/Egg.png";
import Hourglass from "../../../assets/Hourglass.png";
import Plus from "../../../assets/Plus.png";
import QuestionMark from "../../../assets/Question.png";
import { useSelector } from "react-redux";
import log from "../../logger/index";
import SpriteSheet from "rn-sprite-sheet";

const URL = "http://192.168.1.12:4500"; // YOU CAN CHANGE THIS.

const Pet = (props: any) => {
  const navigate = useCustomNavigation();
  const { name, image } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!name && !image) {
          navigate.navigate("Play", { isBreed: true });
        }
      }}
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: COLOR.DARKER_PURPLE,
        paddingTop: 10,
        borderRadius: 10,
        width: "40%",
        height: "auto",
      }}
    >
      <View
        style={{
          width: "70%",
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: COLOR.WHITE,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            alt="Alternative"
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        ) : (
          <Image source={Plus} alt="" style={{ width: "80%", height: "80%" }} />
        )}
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            color: COLOR.WHITE,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {name ? name : "Pick a pet"}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const ChildPet = (props: any) => {
  const navigate = useCustomNavigation();
  const { name, image } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!name && !image) {
          navigate.navigate("Play", { isBreed: true });
        }
      }}
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: COLOR.DARKER_PURPLE,
        paddingTop: 10,
        borderRadius: 10,
        width: "40%",
        height: "auto",
      }}
    >
      <View
        style={{
          width: "70%",
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: COLOR.WHITE,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            alt="Alternative"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            source={QuestionMark}
            alt=""
            style={{
              width: "80%",
              height: "80%",
            }}
          />
        )}
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            color: COLOR.WHITE,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {name ? name : "New generation"}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export function BreedScreen() {
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     name: "White bear",
  //     image: PetAvatar,
  //   },
  //   {
  //     id: 2,
  //     name: "Brown bear",
  //     image: PetAvatar,
  //   },
  // ]);
  const { fatherPet, motherPet } = useSelector((state: any) => state.breed);
  const [data, setData] = useState([fatherPet, motherPet]);
  const navigate = useCustomNavigation();

  const eggRef = useRef<SpriteSheet>(null);

  useEffect(() => {
    log.info(fatherPet, motherPet);
    setData([fatherPet, motherPet]);
  }, [fatherPet, motherPet]);

  useEffect(() => {
    playRunAnimation("walk");
  }, []);
  /**
   *
   * @param father
   * @param mother
   */

  const breedFunction = async (father: any, mother: any) => {
    console.log("father", father);
    console.log("mother ", mother);
    console.log(`${URL}/bears/breed`);
    if (!father || !mother) {
      console.error("Invalid father or mother data for breeding");
      return; // Or handle the error differently
    }

    try {
      const response = await axios.post(`${URL}/bears/breed`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          dad: father,
          mom: mother,
        },
      });

      console.log("POST request successful:", response.data);
    } catch (postError: any) {
      console.error("Error making POST request:", postError);
    }
  };

  const playRunAnimation = (type: string) => {
    if (eggRef.current) {
      eggRef.current.play({
        type,
        // fps: isNaN(parsedFps) ? 16 : parsedFps,
        // loop,
        // resetAfterFinish,
      }); // Play "run" animation
    }
  };

  return (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT * 0.8,
        backgroundColor: COLOR.PURPLE,
      }}
    >
      <SafeAreaView>
        {/* <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require("../../../assets/background2.jpg")}
      /> */}
        <View
          style={{
            width: "100%",
            height: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 40,
          }}
        >
          {data
            ? data.map((item, index) => (
                <Pet key={index} name={item.name} image={item.petImg}></Pet>
              ))
            : null}
        </View>

        {/* <Image
        source={Egg}
        style={{
          width: ConstantsResponsive.MAX_WIDTH / 6,
          height: ConstantsResponsive.MAX_WIDTH / 6,
          alignSelf: "center",
          marginVertical: 20,
        }}
      /> */}
        <View
          id="spritesheet_egg"
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT * 0.1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <SpriteSheet
            ref={eggRef}
            source={require("../../../assets/spritesheet_egg.jpg")}
            columns={6}
            rows={1}
            height={20}
            width={20}
            animations={{
              walk: [0, 1, 2, 3, 4, 5],
            }}
          /> */}
        </View>
        <View
          style={{
            alignItems: "center",
            width: ConstantsResponsive.MAX_WIDTH,
            height: "auto",
          }}
        >
          <ChildPet name={null} image={null}></ChildPet>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            source={Hourglass}
            style={{
              width: "100%",
              height: "30%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 40,
            }}
          />
          {data
            ? data.map((item, index) => (
                <Pet key={index} name={item.name} image={item.petImg}></Pet>
              ))
            : null}
        </View>
        <Image
          source={Egg}
          style={{
            width: ConstantsResponsive.MAX_WIDTH / 6,
            height: ConstantsResponsive.MAX_WIDTH / 6,
            alignSelf: "center",
            marginVertical: 20,
          }}
        />
        <View
          style={{
            alignItems: "center",
            width: ConstantsResponsive.MAX_WIDTH,
            height: "auto",
          }}
        >
          <ChildPet name={null} image={null}></ChildPet>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            source={Hourglass}
            style={{
              width: ConstantsResponsive.MAX_WIDTH / 20,
              height: ConstantsResponsive.MAX_HEIGHT / 20,
            }}
          />
          <CustomText
            style={{ textAlign: "center", color: COLOR.WHITE, fontSize: 20 }}
          >
            10 min
          </CustomText>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: ConstantsResponsive.MAX_HEIGHT * 0.05,
          }}
        >
          <AwesomeButton
            style={{ justifyContent: "center", alignSelf: "center" }}
            onPress={() => {
              if (fatherPet.id && motherPet.id) {
                breedFunction(fatherPet, motherPet);
              }

              // navigate.navigate("DetailOfPet");
            }}
            width={225}
            height={65}
            borderRadius={20}
            backgroundColor={COLOR.GREEN}
          >
            <CustomText
              style={{ textAlign: "center", color: COLOR.WHITE, fontSize: 20 }}
            >
              MAKE BEAR
            </CustomText>
          </AwesomeButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: COLOR.WHITE,
    marginBottom: 10,
  },
  idInputBox: {
    width: 231,
    height: 52,
    backgroundColor: COLOR.GRAY,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PURPLE,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  title: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontFamily: "mrt-bold",
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  addButtonContainer: {
    width: "80%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: -30,
    zIndex: 99,
  },

  breedButton: {
    justifyContent: "center",
    marginTop: 22,
  },
  breedText: {
    textAlign: "center",
    color: COLOR.WHITE,
    fontSize: 28,
  },
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
});
