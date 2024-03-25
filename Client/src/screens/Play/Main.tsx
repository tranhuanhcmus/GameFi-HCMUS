import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/alertSlice";
import PetCard from "../../components/PetCard";
import { ELEMENT } from "../../constants/types";
import ConstantsResponsive from "../../constants/Constanst";
import { flare } from "viem/chains";

type Props = {};

const petArray = [
  {
    id: "1",
    petImg:
      "https://www.shutterstock.com/image-vector/cute-pig-illustration-kawaii-chibi-600nw-2291790391.jpg",
    element: ELEMENT.FIRE,
    level: 3,
    name: "Harry's Pig",
    rarityPet: "special",
  },
  {
    id: "100",
    title: "Andres",
    type: "NFT",
    tokenId: "100",
    element: ELEMENT.FIRE,
    name: "Harry's Pig",
    description: "This is a normal Pig",
    attributes: {
      type: "Pig",
    },
    image:
      "https://www.shutterstock.com/image-vector/cute-pig-illustration-kawaii-chibi-600nw-2291790391.jpg",
  },
  {
    id: "2",
    petImg: "",
    element: ELEMENT.IRON,
    level: 3,
    name: "4",
    rarityPet: "special",
  },
  {
    id: "3",
    petImg: "",
    element: ELEMENT.LEAF,
    level: 3,
    name: "4",
    rarityPet: "special",
  },
  {
    id: "4",
    petImg: "",
    element: ELEMENT.STONE,
    level: 3,
    name: "4",
    rarityPet: "special",
  },
  {
    id: "5",
    petImg: "",
    element: ELEMENT.STONE,
    level: 3,
    name: "4",
    rarityPet: "special",
  },
  {
    id: "6",
    petImg: "",
    element: ELEMENT.STONE,
    level: 3,
    name: "4",
    rarityPet: "special",
  },
];
const PlayScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Example: Dispatch an alert when the PlayScreen component mounts
    dispatch(showAlert("This is an alert from PlayScreen"));
  }, [dispatch]);

  const handleShowAlert = () => {
    // Example: Dispatch an alert when a button is pressed
    dispatch(showAlert("Test Alert!"));
  };

  return (
    <View style={styles.backgroundImage} className="bg-[#210035]">
      <View
        style={styles.playArea}
        className="mt-4 h-[90%] w-[100%] items-center justify-center "
      >
        <FlatList
          className="flex-1"
          contentContainerStyle={{
            gap: 20,
          }}
          columnWrapperStyle={{
            gap: 20,
            width: "100%",
          }}
          data={petArray}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <PetCard
              petImg={item?.petImg ? item.petImg : ""}
              element={item.element}
              level={3}
              name={item.name}
              rarityPet=" special"
            ></PetCard>
          )}
        />
      </View>
    </View>
  );
};

export default PlayScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
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
    height: ConstantsResponsive.YR * 20,
    width:
      ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 200 -
      ConstantsResponsive.XR * 60,
    marginLeft: ConstantsResponsive.XR * 40,
    marginTop: ConstantsResponsive.YR * 10,
    backgroundColor: "white",
    borderRadius: ConstantsResponsive.YR * 10,
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: "#ff1a1a",
    left: ConstantsResponsive.XR * 3,

    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },
  playArea: {
    width: ConstantsResponsive.MAX_WIDTH,
    marginTop: ConstantsResponsive.YR * 150,
    height:
      ConstantsResponsive.MAX_HEIGHT -
      ConstantsResponsive.YR * 150 -
      ConstantsResponsive.YR * 112,
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
