import * as React from 'react';
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeStack from '../HomeStack';
import FavoriteStack from '../FavoriteStack';

interface TabOptionType {
  [key: string]: {
    id: number;
    title: string;
    key: string;
  };
}
const TabOption: TabOptionType = {
  HomeStack: {
    id: 0,
    title: 'Search',
    key: 'HomeStack',
  },
  FavoriteStack: {
    id: 1,
    title: 'Favorite',
    key: 'FavoriteStack',
  },
  
};
const IS_IOS = Platform.OS === 'ios';
const HEIGHT = Dimensions.get('window').height
function MyTabBar({state, descriptors, navigation}) {
  
  return (
    <>
      <View style={styles.containerStyle}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
          options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;
          

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              key={label}
              activeOpacity={0.7}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonStyle}>
              
              <Text
                style={[
                  styles.labelStyle,
                  {color: isFocused ? 'black' : 'gray'},
                ]}>
                {TabOption[label]?.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {IS_IOS&&  <View style={styles.safeAreaContainer} />}
    </>
  );
}

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  
  return (
    <Tab.Navigator
      tabBar={props => MyTabBar({...props})}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen 
      name="FavoriteStack"
      component={FavoriteStack} 
      
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  safeAreaContainer: {
    backgroundColor: 'white',
    height: HEIGHT *0.03,
  },
  buttonStyle: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 20,
    marginTop: 6,
    fontWeight: 'bold',
    
  },
  numberStyle: {
    fontSize: 12,
  },
  counterWrapper: {
    position: 'absolute',
    top: 15,
    width: 16,
    height: 16,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
