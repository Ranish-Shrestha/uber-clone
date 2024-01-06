import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Icon } from 'react-native-elements';
import { NativeWindStyleSheet } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

NativeWindStyleSheet.setOutput({
    default: "native",
});

dataMenu = [
    {
        id: 1,
        fronticon: 'time',
        text: 'Pick up now',
        rareicon: 'chevron-down-outline'
    },
    {
        id: 2,
        fronticon: 'arrow-forward-outline',
        text: 'One way',
        rareicon: 'chevron-down-outline'
    },
    {
        id: 3,
        fronticon: 'person',
        text: 'For me',
        rareicon: 'chevron-down-outline'
    }
]

const WhereToScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        
        <SafeAreaView >
            <View className='pl-4 pr-1 bg-white'>
                <View className='flex-row pt-2'>
                    <TouchableOpacity 
                        onPress={() => {navigation.goBack()}}
                        className='relative rounded-full '
                    >
                        <Icon name='arrow-back-outline' type='ionicon' size={32} />
                    </TouchableOpacity>
                    <Text className='ml-16 pl-7 text-xl font-semibold'>Plan your ride</Text>
                </View>

                <View className='h-10'>
                    <ScrollView 
                        horizontal 
                        contentContainerStyle={{
                            gap: 10,
                        }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            dataMenu.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index}>
                                        <View className='bg-gray-200 rounded-3xl max-h-10 h-10'>
                                            <View className='flex-row px-3 py-2 items-center'>
                                                <Icon name={item.fronticon} type='ionicon' size={24}/>
                                                <Text className='font-semibold px-2'>{item.text}</Text>
                                                <Icon name={item.rareicon} type='ionicon' size={24}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                
                <View className='flex-row items-center py-2'>
                    <View>
                        <Image style={{  height:70, width:30, marginRight:10, marginTop:5, resizeMode: 'contain' }} 
                        source={require('../assets/images/transit.png')}/>
                    </View>
                    <View className='flex-column'>
                        
                        <GooglePlacesAutocomplete 
                            placeholder={!origin ? 'Entry pick-up location' : origin.description}
                            styles={toInputBoxStyles}
                            query={{
                                key: GOOGLE_MAPS_APIKEY,
                                language: 'en',
                                components: "country:ca|country:gb",
                            }}
                            onPress={(data, details) => {
                                dispatch(
                                    setOrigin({
                                        location: details.geometry.location,
                                        description: data.structured_formatting.main_text
                                    })
                                )
                            }}
                            fetchDetails={true}
                            enablePoweredByContainer={false}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                        />

                        <GooglePlacesAutocomplete 
                            placeholder={!destination ? 'Where to?' : destination.description}
                            styles={toInputBoxStyles}
                            query={{
                                key: GOOGLE_MAPS_APIKEY,
                                language: 'en',
                                components: "country:ca|country:gb",
                            }}
                            onPress={(data, details) => {
                                dispatch(
                                    setDestination({
                                        location: details.geometry.location,
                                        description: data.structured_formatting.main_text
                                    })
                                )
                            }}
                            fetchDetails={true}
                            enablePoweredByContainer={false}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            className='ml-4 p-2 bg-gray-200 rounded-full'
                        >
                            <Icon size={24} name='plus-thick' type='material-community'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WhereToScreen

const toInputBoxStyles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingTop: 5,
      width: 280,
      flex: 0
    },
    textInput: {
      backgroundColor: '#DDDDDF',
      borderRadius: 0,
      fontSize: 18,
      height: 35
    },
  })