import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ItemCardReducer from "./src/features/items";
import NumberReducer from "./src/features/numbers";
import Notification from './src/Screens/Assignment_4/index4'; 
import Home from './src/Screens/home';
import Demo from './src/Screens/Assignment_4/demo';
import ReduxOperations from './src/Screens/Assignment_7/index7';
// import storage from 'redux-persist/lib/storage'
// import { PersistGate } from 'redux-persist/integration/react'
// import { combineReducers } from 'redux'

const Stack = createNativeStackNavigator();

// const persistConfig = {
//   key: 'root',
//   storage
// };

// const rootReducer = combineReducers({
//   ItemCard: ItemCardReducer,
//   Numbers: NumberReducer,
// });


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const persistor = persistStore(store);

const store = configureStore({
  reducer: {
    ItemCard: ItemCardReducer,
    Numbers: NumberReducer,
  }
}); 

function App() {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="Assignment_4" component={Notification} />
            <Stack.Screen name="home" component={Home} options={{ title: 'Assignments' }} />
            <Stack.Screen name="demo" component={Demo} options={{ title: 'Demo Screen' }} />
            <Stack.Screen name="Assignment_7" component={ReduxOperations} options={{ title: 'Redux Operations' }} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

export default App;