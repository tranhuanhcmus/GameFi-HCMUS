import { ELEMENT } from "constants";

export const NFTAdapter = (data) => {
  let formattedData = { ...data };
  if (formattedData.data) {
    let temp = formattedData.data;
    delete formattedData.data;
    formattedData = { ...formattedData, ...temp };
  }
  return formattedData;
};
export const getElementImg=(elementId)=>{
  let  element=ELEMENT[elementId]
  let imgURL=`/images/${element}.png`
  return imgURL
}
export const getElementBgImg=(elementId)=>{
  let  element=ELEMENT[elementId]
  let imgURL=`/images/${element}_bg.png`
  return imgURL
}
export function getLevel(exp){
	let constant = 100
    let level = 0
    while (exp > 0) {
        let increase_level_exp_require = (level + 1) * constant
        let remaining_exp = exp - increase_level_exp_require
        let increase_level = 0
        if (remaining_exp > 0) {
            increase_level = 1
        } else {
            increase_level= (remaining_exp + increase_level_exp_require) / increase_level_exp_require
        }
        level += increase_level
        exp=remaining_exp
    }
    return level
}