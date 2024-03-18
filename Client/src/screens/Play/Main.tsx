import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/alertSlice";
import PetCard from "../../components/PetCard";
import { ELEMENT } from "../../constants/types";
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
    <SafeAreaView className="h-full w-full bg-[#210035]">
      <View className="mt-4 h-[90%] w-[100%] items-center justify-center bg-[#210035] ">
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
    </SafeAreaView>
  );
};

export default PlayScreen;
