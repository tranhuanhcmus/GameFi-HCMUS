import React, { PureComponent } from "react";
import {
  Animated,
  Easing,
  View,
  ViewStyle,
  StyleProp,
  Platform,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";

import { Image as RNImage } from "react-native";
import { Image as ExpoImage } from "expo-image";

import PropTypes from "prop-types";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { ImageURISource } from "react-native";

const ImageComponent = Platform.OS === "ios" ? RNImage : ExpoImage;
const AnimatedFastImage = Animated.createAnimatedComponent(ImageComponent);

type AnimationType = {
  [key: string]: number[];
};

interface SpriteSheetProps {
  source: ImageSourcePropType;
  columns: number;
  rows: number;
  animations: AnimationType;
  viewStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  height?: number;
  width?: number;
  onLoad?: () => void;
  frameWidth?: number;
  frameHeight?: number;
  offsetX?: number; // Add offsetX to the props interface
  offsetY?: number; // Add offsetY to the props interface
}

interface SpriteSheetState {
  imageHeight: number;
  imageWidth: number;
  defaultFrameHeight: number;
  source: any;
  defaultFrameWidth: number;
  translateYInputRange: number[];
  translateYOutputRange: number[];
  translateXInputRange: number[];
  translateXOutputRange: number[];
  frameHeight: number;
  frameWidth: number;
  offsetX: number;
  offsetY: number;
  animationType?: string;
}

const stylePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
  PropTypes.array,
]);
const sourcePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
]);

export default class SpriteSheet extends PureComponent<
  SpriteSheetProps,
  SpriteSheetState
> {
  static propTypes = {
    source: sourcePropType.isRequired,
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    animations: PropTypes.object.isRequired,
    viewStyle: stylePropType,
    imageStyle: stylePropType,
    height: PropTypes.number,
    width: PropTypes.number,
    onLoad: PropTypes.func,
    frameWidth: PropTypes.number,
    frameHeight: PropTypes.number,
  };

  static defaultProps = {
    columns: 1,
    rows: 1,
    animations: {},
    offsetY: 0,
    offsetX: 0,
  };

  time = new Animated.Value(0);
  interpolationRanges: {
    [key: string]: {
      translateY: { in: number[]; out: number[] };
      translateX: { in: number[]; out: number[] };
    };
  } = {};

  constructor(props: SpriteSheetProps) {
    super(props);
    this.state = {
      imageHeight: 0,
      imageWidth: 0,
      defaultFrameHeight: 0,
      source: null,
      defaultFrameWidth: 0,
      translateYInputRange: [0, 1],
      translateYOutputRange: [0, 1],
      translateXInputRange: [0, 1],
      translateXOutputRange: [0, 1],
      frameHeight: 0,
      frameWidth: 0,
      offsetX: 0,
      offsetY: 0,
    };

    let {
      source,
      height,
      width,
      rows,
      columns,
      frameHeight,
      frameWidth,
      offsetY,
      offsetX,
    } = this.props;
    let image = resolveAssetSource(source as ImageURISource);
    let ratio = 1;
    let imageHeight = image.height;
    let imageWidth = image.width;
    offsetX = -offsetX!;
    offsetY = -offsetY!;
    frameHeight = frameHeight || image.height / rows;
    frameWidth = frameWidth || image.width / columns;

    if (width) {
      ratio = (width * columns) / image.width;
      imageHeight = image.height * ratio;
      imageWidth = width * columns;
      frameHeight = (image.height / rows) * ratio;
      frameWidth = width;
    } else if (height) {
      ratio = (height * rows) / image.height;
      imageHeight = height * rows;
      imageWidth = image.width * ratio;
      frameHeight = height;
      frameWidth = (image.width / columns) * ratio;
    }

    Object.assign(this.state, {
      imageHeight,
      imageWidth,
      frameHeight,
      frameWidth,
      source,
    });

    this.generateInterpolationRanges();
  }
  updateData() {
    const { source, height, width, rows, columns } = this.props;
    const image = resolveAssetSource(source as ImageURISource);
    let ratio = 1;

    let imageHeight = image.height;
    let imageWidth = image.width;
    let frameHeight = image.height / rows;
    let frameWidth = image.width / columns;

    if (width) {
      ratio = (width * columns) / image.width;
      frameHeight = Math.floor((image.height / rows) * ratio);
      frameWidth = width;
      imageHeight = frameHeight * rows; //Math.floor(image.height * ratio);
      imageWidth = frameWidth * columns; //Math.floor(width * columns);
    } else if (height) {
      ratio = (height * rows) / image.height;
      imageHeight = height * rows;
      imageWidth = image.width * ratio;
      frameHeight = height;
      frameWidth = (image.width / columns) * ratio;
    }

    this.setState({
      imageHeight,
      imageWidth,
      frameHeight,
      frameWidth,
      source,
    });

    this.generateInterpolationRanges();
  }
  componentDidUpdate() {
    if (this.state.source !== this.props.source) {
      this.updateData();
    }
  }

  render() {
    const {
      imageHeight,
      imageWidth,
      frameHeight,
      frameWidth,
      animationType,
      offsetX,
      offsetY,
    } = this.state;
    const { viewStyle, imageStyle, source, onLoad } = this.props;

    const {
      translateY = { in: [0, 0], out: [offsetY, offsetY] },
      translateX = { in: [0, 0], out: [offsetX, offsetX] },
    } = this.interpolationRanges[animationType!] || {};

    return (
      <View
        style={[
          viewStyle,
          {
            height: frameHeight,
            width: frameWidth,
            overflow: "hidden",
          },
        ]}
      >
        <AnimatedFastImage
          source={source as ImageURISource}
          onLoad={onLoad}
          style={[
            imageStyle as any,
            {
              height: imageHeight,
              width: imageWidth,
              transform: [
                {
                  translateX: this.time.interpolate({
                    inputRange: translateX.in,
                    outputRange: translateX.out,
                  }),
                },
                {
                  translateY: this.time.interpolate({
                    inputRange: translateY.in,
                    outputRange: translateY.out,
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  }

  generateInterpolationRanges = () => {
    const { animations } = this.props;

    for (const key in animations) {
      if (animations.hasOwnProperty(key)) {
        const length = animations[key].length;
        const input: number[] = Array.from({ length }, (_, i) => [
          i,
          i + 0.99999999999,
        ]).flat();

        this.interpolationRanges[key] = {
          translateY: {
            in: input,
            out: animations[key]
              .map((i) => {
                const { y } = this.getFrameCoords(i);
                return [y, y];
              })
              .flat(),
          },
          translateX: {
            in: input,
            out: animations[key]
              .map((i) => {
                const { x } = this.getFrameCoords(i);
                return [x, x];
              })
              .flat(),
          },
        };
      }
    }
  };

  stop = (cb?: (value: number) => void) => {
    this.time.stopAnimation(cb);
  };

  reset = (cb?: (value: number) => void) => {
    this.time.stopAnimation(cb);
    this.time.setValue(0);
  };

  play = ({
    type,
    fps = 24,
    loop = false,
    resetAfterFinish = false,
    onFinish = () => {},
  }: {
    type: string;
    fps?: number;
    loop?: boolean;
    resetAfterFinish?: boolean;
    onFinish?: () => void;
  }) => {
    let { animations } = this.props;
    let { length } = animations[type];

    this.setState({ animationType: type }, () => {
      let animation = Animated.timing(this.time, {
        toValue: length,
        duration: (length / fps) * 1000,
        easing: Easing.linear,
        useNativeDriver: true, // Using native animation driver instead of JS
      });

      this.time.setValue(0);

      if (loop) {
        Animated.loop(animation).start();
      } else {
        animation.start(() => {
          if (resetAfterFinish) {
            this.time.setValue(0);
          }
          onFinish();
        });
      }
    });
  };

  getFrameCoords = (i: number) => {
    let { columns, offsetX, offsetY } = this.props;
    let { frameHeight, frameWidth } = this.state;
    let currentColumn = i % columns!;
    let xAdjust = -currentColumn * frameWidth!;
    xAdjust -= offsetX!;
    let yAdjust = -((i - currentColumn) / columns!) * frameHeight!;
    yAdjust -= offsetY!;

    return {
      x: xAdjust,
      y: yAdjust,
    };
  };
}
