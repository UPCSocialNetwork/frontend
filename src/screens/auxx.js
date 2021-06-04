import { TouchableOpacity } from 'react-native';

<TouchableOpacity>
  <View style={styles.dropdownIcon}></View>
  <View style={styles.dropdownTextContainer}>
    <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
      {nomMentor}
    </Text>
  </View>
  <View style={{ backgroundColor: Colors.black, height: '86%', width: 1 }}></View>
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
    <MaterialIcons style={{ marginEnd: 17 }} name="search" size={25} color={Colors.secondary} />
  </View>
</TouchableOpacity>;
