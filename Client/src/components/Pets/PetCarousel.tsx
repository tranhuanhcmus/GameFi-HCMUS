import React from "react";
import Pet from "../../../assets/Pet.png";
import { Image } from "react-native";

type Props = {};

const PetCarousel = (props: Props) => {
  return <Image className="h-full w-full object-contain" source={Pet} />;
};

export default PetCarousel;
