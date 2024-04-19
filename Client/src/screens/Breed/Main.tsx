import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  SafeAreaViewBase,
} from "react-native";
import Heart from "../../../assets/heart.png";
import { RoundButton } from "../../components/Button/RoundButton";
import backGroundImage from "../../../assets/background3.png";
import CustomText from "../../components/CustomText";
import { COLOR } from "../../utils/color";
import AwesomeButton from "react-native-really-awesome-button";
import ConstantsResponsive from "../../constants/Constanst";
export function BreedScreen() {
  return (
    <SafeAreaView className="h-screen w-screen bg-[#210035]">
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={backGroundImage}
      />
      <View style={styles.container}>
        <CustomText style={styles.title}>Breed</CustomText>
        <View className="h-[50%] w-[90%] object-cover">
          <Image source={Heart} alt="Heart" style={styles.imageContainer} />
        </View>

        <View style={styles.addButtonContainer}>
          <RoundButton
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <RoundButton
            onPress={() => {
              console.log("Pressed");
            }}
          />
        </View>
        <AwesomeButton
          style={styles.breedButton}
          onPress={() => {
            console.log("Pressed");
          }}
          width={225}
          height={65}
          borderRadius={20}
          backgroundColor={COLOR.RED}
        >
          <CustomText style={styles.breedText}>Breed</CustomText>
        </AwesomeButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PURPLE,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
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
    // width: 225,
    // height: 65,
    // borderRadius: 20,
    // backgroundColor: COLOR.RED,
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
