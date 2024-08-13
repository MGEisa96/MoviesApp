import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {
    return (
        <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
               <MainStackNavigator />
            </PersistGate>
              </Provider>  
            </GestureHandlerRootView>
        </NavigationContainer>
    );
};

export default App;
