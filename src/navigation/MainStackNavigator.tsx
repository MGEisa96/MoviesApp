import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from './BottomTabs';
import Screens from './screenNames';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';


const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Screens.TABS_STACK} component={Tabs}  />
            <Stack.Screen
                name={Screens.DETAILS_SCREEN}
                component={MovieDetailsScreen}
                options={{
                    headerShown: true,
                    headerBackTitle: '',
                    title: 'Movie Details',
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
};

export default MainStackNavigator;
