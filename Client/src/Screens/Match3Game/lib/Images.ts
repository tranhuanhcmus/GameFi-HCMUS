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
  isJar: undefined
}

export const BLUE_BEAN_OBJ: ImageObjType = {
  image: BLUE_BEAN,
  color: COLORS.BLUE,
  isJar: undefined
}

export const RED_BEAN_OBJ: ImageObjType = {
  image: RED_BEAN,
  color: COLORS.RED,
  isJar: undefined
}

export const PURPLE_BEAN_OBJ: ImageObjType = {
  image: PURPLE_BEAN,
  color: COLORS.PURPLE,
  isJar: undefined
}

export const YELLOW_BEAN_OBJ: ImageObjType = {
  image: YELLOW_BEAN,
  color: COLORS.YELLOW,
  isJar: undefined
}

export const GREEN_BEAN_OBJ: ImageObjType = {
  image: GREEN_BEAN,
  color: COLORS.GREEN,
  isJar: undefined
}

export const ORANGE_BEAN_OBJ: ImageObjType = {
  image: ORANGE_BEAN,
  color: COLORS.ORANGE,
  isJar: undefined
}

export const BEAN_OBJS = [PINK_BEAN_OBJ, PURPLE_BEAN_OBJ, BLUE_BEAN_OBJ, ORANGE_BEAN_OBJ, GREEN_BEAN_OBJ, YELLOW_BEAN_OBJ, RED_BEAN_OBJ]

export interface ImageObjType {
  isJar: any
  image: any
  color: number
}
