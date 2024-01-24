import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { COLOR } from "../utils/color";
import CustomText from "../components/CustomText";
import Heart from "../../assets/heart.png";

export function BreedScreen() {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Breed</CustomText>
      <Image source={Heart} alt="Heart" style={styles.imageContainer} />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            console.log("Press");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            console.log("Press");
          }}
        ></TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.breedButton}
        onPress={() => {
          console.log("Pressed");
        }}
      >
        <CustomText style={styles.breedText}>Breed</CustomText>
      </TouchableOpacity>
    </View>
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
    width: 400,
    height: 400,
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
  addButton: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: COLOR.YELLOW,
  },
  breedButton: {
    width: 225,
    height: 65,
    borderRadius: 20,
    backgroundColor: COLOR.RED,
    justifyContent: "center",
    marginTop: 22,
  },
  breedText: {
    textAlign: "center",
    color: COLOR.WHITE,
    fontSize: 28,
  },
});
