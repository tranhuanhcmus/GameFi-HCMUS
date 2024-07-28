export const ELEMENT = {
  FIRE: "fire",
  THUNDER: "thunder",
  WATER: "water",
  FROZEN: "frozen",
  DARK: "dark",
  FOREST: "forest",
};

export const GAMETYPE ={
  WORDMASTER:"Word Master",
  DIAMONDPUZZLE: "Diamond Puzzle",

}

export const formatElement = (types: number) => {
  switch(types) {
    case 1:
      return "thunder";
    case 2:
      return "fire";
    case 3:
      return "water";
    case 4:
        return "frozen";
    case 5:
          return "forest";
    case 6:
         return "dark";
    default:
      return "unknown";
  }
}

export const CATEGORY = {
  FOODPACK: "food pack",
  PACK: "pack",
  REWARD:"reward",
  BOOST:"boost"

}

export const BOOST ={
  HEALTH: "Boost Health 4h",
  DAMAGE: "Boost Damage 4h",
  
}