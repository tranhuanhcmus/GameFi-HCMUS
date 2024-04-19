import React, { useEffect, useState } from "react";
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
import { NFT, UserService } from "../../services/UserService";
import axios from "axios";

type Props = {};

type NFTData = {
  id: string;
  petImg: string;
  element: string;
  level: number;
  name: string;
  rarityPet: string;
};

const petArray: NFTData[] = [
  {
    id: "1",
    petImg:
      "https://www.shutterstock.com/image-vector/cute-pig-illustration-kawaii-chibi-600nw-2291790391.jpg",
    element: ELEMENT.FIRE,
    level: 3,
    name: "Harry's Pig",
    rarityPet: "special",
  },
];

const PlayScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<NFTData[]>(petArray);

  useEffect(() => {
    // Example: Dispatch an alert when the PlayScreen component mounts
    dispatch(showAlert("This is an alert from PlayScreen"));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res:NFT[] = await UserService.getNFTsByOwner(
        "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
      );

      const mappedData: NFTData[] = res.map((nft: NFT) => {
        return {
          id: nft.tokenid,
          element: ELEMENT.FIRE,
          level: 1,
          petImg:
            "https://www.shutterstock.com/image-vector/cute-pig-illustration-kawaii-chibi-600nw-2291790391.jpg",
          name: "Harry's Pig",
          rarityPet: "special",
        };
      });

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };
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
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <PetCard
                petImg={item?.petImg ? item.petImg : ""}
                element={item.element}
                level={3}
                name={item.name}
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
