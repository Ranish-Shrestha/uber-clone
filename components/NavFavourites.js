import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { NativeWindStyleSheet } from 'nativewind';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

NativeWindStyleSheet.setOutput({
    default: "native",
});

const data = [
    {
        'id': 1,
        'icon': 'home',
        'name': 'Home',
        'destination': '37 Bell Estate Rd, Scarborough, ON, Canada',
        'geometry':{
            'location':{
                'lat': 43.7052033, 
                'lng': -79.27641539999999
            }
        }
    },
    {
        'id': 2,
        'icon': 'briefcase',
        'name': 'Work',
        'destination': 'Sheppard Ave E, Scarborough, ON, Canada',
        'geometry':{
            'location':{
                'lat': 43.79365540000001, 
                'lng': -79.2398108
            }
        }
        
    }, 
]

const NavFavourites = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <View>
        <FlatList 
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className='bg-gray-200' style={{ height: 0.5 }}/> }
            renderItem={({item: { name, destination, icon, geometry }}) => (
                <TouchableOpacity 
                    onPress={() => {
                        dispatch(setDestination({
                            location: geometry.location,
                            description: destination
                        }))
                        navigation.navigate('MapScreen')
                    }}
                    className='flex-row items-center p-5'
                >
                    <Icon 
                        className='mr-4 rounded-full bg-gray-300 p-3'
                        name={icon}
                        type='ionicon'
                        color={'white'}
                        size={18}
                    />
                    <View>
                        <Text className='font-semibold text-lg'>{name}</Text>
                        <Text className='text-gray-500'>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}

export default NavFavourites

const styles = StyleSheet.create({})