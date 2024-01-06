import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeWindStyleSheet } from 'nativewind';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const destination = useSelector(selectDestination);

  return (
    <SafeAreaView className='bg-white flex-1'>
      <Text className='text-center py-5 text-xl'>Good Morning, Ranish</Text>
      <View className='border-t border-gray-200 flex-shrink'>
        <View>
          <GooglePlacesAutocomplete 
            placeholder={!destination ? 'Where To?' : destination.description}
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en'
            }}
            onPress={(data, details) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description
                })
              )
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />

        </View>
        <NavFavourites />
      </View>

      <View className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100'>

        <TouchableOpacity 
          onPress={() =>  navigation.navigate('RideOptionsCard')}
          className='flex flex-row justify-between bg-black w-27 px-4 py-3 rounded-full'
        >
          <Icon name='car' type='font-awesome' color={'white'} size={16}/>
          <Text className='ml-2 text-white text-center'>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row justify-between w-27 px-4 py-3 rounded-full'>
          <Icon name='fast-food-outline' type='ionicon' color={'black'} size={16}/>
          <Text className='ml-2 text-center'>Eats</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
})