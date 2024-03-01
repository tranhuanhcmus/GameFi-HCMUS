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

type Props = {};
const petArray = [
  {
    id: "1",
    petImg: "",
    element: ELEMENT.FIRE,
    level: 3,
    namePet: "4",
    rarityPet: "special",
  },
  {
    id: "2",
    petImg: "",
    element: ELEMENT.IRON,
    level: 3,
    namePet: "4",
    rarityPet: "special",
  },
  {
    id: "3",
    petImg: "",
    element: ELEMENT.LEAF,
    level: 3,
    namePet: "4",
    rarityPet: "special",
  },
  {
    id: "4",
    petImg: "",
    element: ELEMENT.STONE,
    level: 3,
    namePet: "4",
    rarityPet: "special",
  },
  {
    id: "5",
    petImg: "",
    element: ELEMENT.STONE,
    level: 3,
    namePet: "4",
    rarityPet: "special",
  },
  {
    id: "6",
    petImg: "",
    element: ELEMENT.STONE,
    level: 3,
    namePet: "4",
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
        <View className="mt-4 h-[90%] w-full items-center justify-center bg-[#210035]">
          {/* <Text className="text-white">PlayScreen</Text>
        <TouchableOpacity onPress={handleShowAlert}>
          <Text className="text-white">Show Alert</Text>
        </TouchableOpacity> */}
          <FlatList
            contentContainerStyle={{ gap: 20 }}
            columnWrapperStyle={{ gap: 20 }}
            data={petArray}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <PetCard
                  petImg={""}
                  element={item.element}
                  level={3}
                  namePet="4"
                  rarityPet=" special"
                ></PetCard>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
  );
};

export default PlayScreen;
