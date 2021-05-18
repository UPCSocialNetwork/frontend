import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default {
  width: width,
  height: height,
  isSmallDevice: width < 375,
};
