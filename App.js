import { NativeWindStyleSheet } from "nativewind";
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { KeyboardAvoidingView, Platform, StatusBar, Text, View  } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import WhereToScreen from "./screens/WhereToScreen";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const Stack = createNativeStackNavigator();
  const RootStack = createNativeStackNavigator();
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            style={{ flex: 1 }}
          >
            <RootStack.Navigator mode="modal">
              <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}} />
              <RootStack.Screen name="PlanModel" component={WhereToScreen} options={{headerShown: false}} />
            </RootStack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer> 
    </Provider>
  );
}


