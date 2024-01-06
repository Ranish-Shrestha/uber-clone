import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeWindStyleSheet } from "nativewind";
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import HomeScreen from './HomeScreen';


NativeWindStyleSheet.setOutput({
  default: "native",
});

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <View>
      <TouchableOpacity 
        onPress={() => navigation.navigate(HomeScreen)}
        className='bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg'>
        <Icon name='menu'/>
      </TouchableOpacity>
      
      <View className='h-1/2'>
        <Map isdestinationSelected={destination? true: false}/>
      </View>

      <View className='h-1/2'>
        <Stack.Navigator initialRouteName={(!origin && !destination) ? 'NavigateCard': 'RideOptionsCard'}>
          <Stack.Screen name='NavigateCard' component={NavigateCard} options={{ headerShown: false }}/>
          <Stack.Screen name='RideOptionsCard' component={RideOptionsCard} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})