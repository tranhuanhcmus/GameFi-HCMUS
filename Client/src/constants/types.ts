export const ELEMENT = {
  FIRE: "fire",
  LEAF: "leaf",
  WATER: "water",
  STONE: "stone",
  IRON: "iron",
};

export const formatElement = (types: number) => {
  switch(types) {
    case 1:
      return "fire";
    case 2:
      return "leaf";
    case 3:
      return "water";
    case 4:
        return "stone";
    case 5:
          return "iron";
    default:
      return "unknown";
  }
}

export const CATEGORY = {
  FOODPACK: "food pack",
  PACK: "pack",
  BOOST:"boost"

}