import { View, Image, FlatList, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeWindStyleSheet } from "nativewind";
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import NavScreen from './NavScreen';
import EatsScreen from './EatsScreen';
import WhereToScreen from './WhereToScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

NativeWindStyleSheet.setOutput({
    default: "native",
});

const dataNav = [
    {
        id: '123',
        title: 'Rides',
        image: 'https://links.papareact.com/3pn',
        screen: 'NavScreen'
    },
    {
        id: '456',
        title: 'Eats',
        image: 'https://links.papareact.com/28w',
        screen: "EatsScreen"
    }
]

const HomeScreen = () => {
    const Tab = createMaterialTopTabNavigator();
    const RootStack = createNativeStackNavigator();
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    const itemsRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    
    const origin = useSelector(selectOrigin);
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const [permissioin, setPermission] = useState(null);
    const [weather, setWeather] = useState(null);


    useEffect(()=>{
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setPermission(status);

            if (status !== 'granted') {
                return;
            }

            let position = await Location.getCurrentPositionAsync({});
            setLocation(position);

            const latitude = 43.7052033// position.coords.latitude; 
            const longitude = -79.27641539999999//position.coords.longitude; 

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`)
            .then(response => response.json())
            .then(data => {
                dispatch(setOrigin({
                    location: data.results[0].geometry.location,
                    description: data.results[0].formatted_address
                }))
            })
            .catch(error => console.log(error));

        })();

        
        dispatch(setDestination(null))
        
    }, []) 

    return (
      <SafeAreaView
          style={{ flex: 1 }}
      >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: () => {
                if (route.name === 'Ride') {
                  return (
                    <View className='flex-row items-center -ml-12'>
                      <Image style={{ width: 60, height: 40, resizeMode: 'contain' }}
                      source={{ uri: 'https://links.papareact.com/3pn' }}/>
                      <Text className="text-xl font-semibold">Rides</Text>
                    </View>
                    
                  )
                } else if (route.name === 'Eat') {
                  return (
                    <View className='flex-row items-center -ml-12'>
                      <Image style={{ width: 60, height: 40, resizeMode: 'contain' }}
                      source={{ uri: 'https://links.papareact.com/28w' }}/>
                      <Text className="text-xl font-semibold">Eats</Text>
                    </View>
                    
                  )
                }
              },
              scrollEnabled: false,
              tabBarStyle: {
                height: 60,
                backgroundColor: 'white',
                paddingBottom: 10,
              },
              tabBarActiveTintColor:'black',
              tabBarIndicatorStyle: {
                backgroundColor: 'black',
                height: 2,
              },
              tabBarShowLabel: false,
              tabBarPressOpacity: 1,
              tabBarPressColor:'#fff',
            })}
          >
            <Tab.Screen name="Ride" component={NavScreen} />
            <Tab.Screen name="Eat" component={EatsScreen} />
          </Tab.Navigator>
      </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    navBtn: {
        paddingBottom: 8,
    },
    navBtnActive: {
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    }
})
