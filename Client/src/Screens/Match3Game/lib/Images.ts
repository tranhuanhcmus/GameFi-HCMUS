// Beans
export const PINK_BEAN = require('../assets/PinkJellyBean.png')
export const PURPLE_BEAN = require('../assets/PurpleJellyBean.png')
export const BLUE_BEAN = require('../assets/BlueJellyBean.png')
export const ORANGE_BEAN = require('../assets/OrangeJellyBean.png')
export const GREEN_BEAN = require('../assets/GreenJellyBean.png')
export const YELLOW_BEAN = require('../assets/YellowJellyBean.png')
export const RED_BEAN = require('../assets/RedJellyBean.png')

// Colors
const COLORS = {
  BLUE: 0,
  RED: 1,
  YELLOW: 2,
  PINK: 3,
  PURPLE: 4,
  ORANGE: 5,
  GREEN: 6,
}

export const PINK_BEAN_OBJ: ImageObjType = {
  image: PINK_BEAN,
  color: COLORS.PINK,
}

export const BLUE_BEAN_OBJ: ImageObjType = {
  image: BLUE_BEAN,
  color: COLORS.BLUE,
}

export const RED_BEAN_OBJ: ImageObjType = {
  image: RED_BEAN,
  color: COLORS.RED,
}

export const PURPLE_BEAN_OBJ: ImageObjType = {
  image: PURPLE_BEAN,
  color: COLORS.PURPLE,
}

export const YELLOW_BEAN_OBJ: ImageObjType = {
  image: YELLOW_BEAN,
  color: COLORS.YELLOW,
}

export const GREEN_BEAN_OBJ: ImageObjType = {
  image: GREEN_BEAN,
  color: COLORS.GREEN,
}

export const ORANGE_BEAN_OBJ: ImageObjType = {
  image: ORANGE_BEAN,
  color: COLORS.ORANGE,
}

export const BEAN_OBJS = [PINK_BEAN_OBJ, PURPLE_BEAN_OBJ, BLUE_BEAN_OBJ, ORANGE_BEAN_OBJ, GREEN_BEAN_OBJ, YELLOW_BEAN_OBJ, RED_BEAN_OBJ]

export interface ImageObjType {
  image: any
  color: number
}
