import React from 'react';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileInfoScreen from './screens/ProfileInfoScreen';
import RegisterScreen from './screens/RegisterMailScreen';

import Navigator from './routes/homeStack';

export default function App() {
  return <Navigator />;
}
