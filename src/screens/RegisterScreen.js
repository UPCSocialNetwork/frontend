import React, { useRef } from 'react';
import { View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Footer from '../components/FooterRegister';

import Page from '../components/Page';
import Colors from '../constants/Colors';

export default function RegisterScreen() {
  const pagerRef = useRef(null);

  const pageChangeHandler = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page backgroundColor="#ffc93c" iconName="sun" title="Welcome to OnCampus app" />
          <Footer
            backgroundColor="#ffc93c"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              pageChangeHandler(1);
            }}
          />
        </View>
        <View key="2">
          <Page backgroundColor="#07689f" iconName="cloud-drizzle" title="Get yourself wet! ;)" />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              pageChangeHandler(0);
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
}
