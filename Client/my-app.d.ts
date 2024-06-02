/// <reference types="nativewind/types" />
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.mp3";
declare module 'react-native/Libraries/Image/resolveAssetSource' {
  import { ImageURISource, ImageResolvedAssetSource } from 'react-native';

  const resolveAssetSource: (source: ImageURISource) => ImageResolvedAssetSource;

  export default resolveAssetSource;
}
