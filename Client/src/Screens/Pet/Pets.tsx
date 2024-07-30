import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PetCard from "../../components/PetCard";
import ConstantsResponsive from "../../constants/Constanst";
import { ELEMENT } from "../../constants/types";
import { showAlert } from "../../redux/alertSlice";

import CustomText from "../../components/CustomText";
import { NFT, UserService } from "../../services/UserService";
import { COLOR } from "../../utils/color";
import { getLevel } from "../../utils/pet";

import log from "../../logger/index";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import breedSlice, { setFatherPet, setMotherPet } from "../../redux/breedSlice";
import { useAccount } from "wagmi";

import AwesomeButton from "react-native-really-awesome-button";

import CloseButton from "../../../assets/carbon_close-filled.svg";
import useFetch from "../../hooks/useFetch";
import { updatePet } from "../../redux/petSlice";
import { updatePetActive } from "../../redux/petActiveSlice";

type Props = {};

type NFTData = {
  id: string;
  petImg: string;
  energy: number;
  element: string;
  level: number;
  atk: number;
  hp: number;
  name: string;
  rarityPet: string;
  tokenUri: string;
  attributes: {
    element: number;
    eye: string;
    fur: string;
    item: string;
  };
};

const petArray: NFTData[] = [];

const PetsModal = ({
  isVisible,
  setIsVisible,
  route,
  isBreed,
}: {
  isVisible: boolean;
  route?: any;
  isBreed?: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  // const [isBreed, setIsBreed] = useState(route?.params)
  // const { isBreed } = props.route.params;
  const { address, isConnecting, isDisconnected } = useAccount();

  const { assets } = useSelector((state: any) => state.pet);
  const [data, setData] = useState<NFTData[]>(petArray);
  const dispatch = useDispatch();
  const navigate = useCustomNavigation();
  const { fatherPet, motherPet } = useSelector((state: any) => state.breed);
  const { apiData, serverError } = useFetch(() =>
    UserService.getNFTsByOwner(
      address || "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
    ),
  );

  useEffect(() => {
    mappingData();
  }, [apiData]);

  const mappingData = () => {
    if (apiData) {
      const mappedData: any[] = apiData.map((nft: any) => {
        return {
          id: nft.tokenId,
          energy: nft.energy,
          hp: nft.data.hp,
          atk: nft.data.atk,
          level: nft.exp,
          petImg: nft.data.image,
          tokenId: nft.data.tokenId,
          assets: nft.data.assets,
          name: nft.data.name,
          rarityPet: "special",
          tokenUri: nft.data.tokenUri,
          attributes: {
            element: nft.data.attributes.element,
            eye: nft.data.attributes.eye,
            fur: nft.data.attributes.fur,
            item: nft.data.attributes.item,
          },
        };
      });

      if (!assets && mappedData[0]) {
        dispatch(
          updatePet({
            ...mappedData[0],
            active: true,

            attributes: { ...mappedData[0].attributes },
          }),
          updatePetActive({
            ...mappedData[0],
            active: true,

            attributes: { ...mappedData[0].attributes },
          }),
        );
      }

      setData([...mappedData]);
    }
  };

  const onPress = (item: any) => {
    try {
      if (!fatherPet.id) {
        setIsVisible(false);
        dispatch(setFatherPet(item));
      } else if (!motherPet.id) {
        setIsVisible(false);
        dispatch(setMotherPet(item));
      }
    } catch (e) {
      console.log("Loi");
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.backgroundImage}>
        <Image
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT * 0.7,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../../assets/backGroundForInventory.png")}
        />
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 20,
            height: "10%",

            paddingEnd: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <CloseButton></CloseButton>
          </TouchableOpacity>
        </View>
        <View style={styles.playArea} className="items-center justify-center ">
          <FlatList
            contentContainerStyle={{
              gap: 20,
            }}
            columnWrapperStyle={{
              gap: 20,
              width: "100%",
            }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <PetCard
                item={{ ...item }}
                petImg={item.petImg}
                level={item.level}
                name={item.name}
                rarityPet={item.rarityPet}
                isBreed={isBreed}
                tokenUri={item.tokenUri}
                attributes={item.attributes}
                onPress={() => onPress(item)}
              />
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PetsModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT * 0.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
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
    marginTop: ConstantsResponsive.YR * 80,
    display: "flex",
    flex: 1,
    marginBottom: ConstantsResponsive.YR * 20,
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
