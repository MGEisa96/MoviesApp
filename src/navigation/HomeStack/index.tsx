import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import Screens from '../screenNames';
import useMoviesApi from '../../Hooks/useMovieApi';


const Stack = createStackNavigator();

export default function HomeStack() {
    
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
}
