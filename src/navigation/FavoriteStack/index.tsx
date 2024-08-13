import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import FavoriteMoviesScreen from '../../screens/FavoriteMoviesScreen';
import Screens from '../screenNames';


const Stack = createStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.FAVORITE_SCREEN} component={FavoriteMoviesScreen}
      options={{
        headerShown: true,
        
        title: 'Favourite',
        headerStyle: {
            backgroundColor: 'white',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}
      />
    </Stack.Navigator>
  );
}
