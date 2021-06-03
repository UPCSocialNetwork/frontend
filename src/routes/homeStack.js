import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Intro from '../screens/IntroScreen';
import Login from '../screens/LoginScreen';
import RegisterMail from '../screens/RegisterMailScreen';
import RegisterPassword from '../screens/RegisterPasswordScreen';
import RegisterCentre from '../screens/RegisterCentreScreen';
import RegisterAssig from '../screens/RegisterAssigScreen';
import RegisterMentor1 from '../screens/RegisterMentor1Screen';
import RegisterMentor2 from '../screens/RegisterMentor2Screen';
import ProfileInfoScreen from '../screens/ProfileInfoScreen';
import listXatScreen from '../screens/listXatScreen';
import RegisterProfile from '../screens/RegisterProfileScreen';
/*
 */

const screens = {
  Intro: {
    screen: Intro,
  },
  Login: {
    screen: Login,
  },
  RegisterMail: {
    screen: RegisterMail,
  },
  RegisterPassword: {
    screen: RegisterPassword,
  },
  RegisterCentre: {
    screen: RegisterCentre,
  },
  RegisterAssig: {
    screen: RegisterAssig,
  },
  RegisterMentor1: {
    screen: RegisterMentor1,
  },
  RegisterMentor2: {
    screen: RegisterMentor2,
  },
  RegisterProfile: {
    screen: RegisterProfile,
  },
  ProfileInfoScreen: {
    screen: ProfileInfoScreen,
  },
  listXatScreen: {
    screen: listXatScreen,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
  },
});

export default createAppContainer(HomeStack);
