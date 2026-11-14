import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Icon } from 'react-native-elements';
import { NativeWindStyleSheet } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectUserOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useState } from 'react';

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

dataRecentLocation = [
    {
        id: 1,
        icon: 'location',
        name :'San Francisco International Airport',
        address: '780 McDonell Rd, San Francisco, CA'
    },
    {
        id: 3,
        icon: 'location',
        name :'San Francisco International Airport',
        address: '780 McDonell Rd, San Francisco, CA'
    },
    ,
    {
        id: 5,
        icon: 'location',
        name :'Set location on map',
        address: ''
    }
];

result: any;


const WhereToScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userorigin = useSelector(selectUserOrigin);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const [origintext, setOriginText] = useState("");
    const [destinationtext, setDestinationText] = useState("");
    const searchPlace = async(searchText, placeType) => {
        fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?
        fields=formatted_address,name,geometry
        &region=ca
        &query=${searchText}&key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach((el, index) => {
                result.id = index + 1;
                result.icon = 'location';
                result.addname = el.name;
                result.address = el.formatted_address;
                result.location.lat = el.geometry.location.lat;
                result.location.lng = el.geometry.location.lng;
                dataRecentLocation.push(result);
            });
        })
        console(dataRecentLocation)
    } 

    return (
        
        <SafeAreaView >
            <View 
                className='pl-4 pr-1 bg-white'
                style={{
                    shadowOffset: { width: 2, height: 6 },
                    shadowRadius: 6,
                    shadowOpacity: 0.5,
                    elevation: 35,
                }}
            >
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
                    <View className='flex-1 flex-column justify-center'>
                        <View className='flex-row justify-between'>
                            <TextInput placeholder='Entry pick-up location' 
                                className='px-2 py-1 bg-gray-200 h-10 font-medium text-lg text-gray-700'
                                style={{ width:'95%'}}
                                selectTextOnFocus={true}
                                onChangeText={(value) => {
                                    setOriginText(value);
                                    searchPlace(value, 'origin')
                                }}
                                value={origintext}
                            />
                            <TouchableOpacity 
                                style={origintext.length > 0 ? {opacity:1} : {opacity:0}}
                                className='justify-center items-center -ml-32'
                                onPress={() => setOriginText("")}
                            >
                                <Icon className='h-6 w-14' name='close-outline' type='ionicon'/>
                            </TouchableOpacity>
                        </View>

                        <View className='flex-row justify-between mt-2'>
                            <TextInput placeholder='Where to?' 
                                className='px-2 py-1 bg-gray-200 h-10 font-medium text-lg text-gray-700' 
                                style={{ width:'95%'}}
                                selectTextOnFocus={true}
                                onChangeText={(value) => setDestinationText(value)}
                                value={destinationtext}
                            />
                            <TouchableOpacity 
                                className='justify-center items-center -ml-32'
                                style={destinationtext.length > 0 ? {opacity:1} : {opacity:0}}
                                onPress={() => setDestinationText("")}
                            >
                                <Icon className='h-6 w-14' name='close-outline' type='ionicon'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            className='-ml-2 p-2 mr-2 bg-gray-200 rounded-full'
                        >
                            <Icon size={24} name='plus-thick' type='material-community'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='bg-white -z-10'>
                <View>
                    <TouchableOpacity
                        className='flex-row items-center p-4'
                    >
                        <Icon 
                            className='mr-4 p-3'
                            name='star'
                            type='ionicon'
                        />
                        <View>
                            <Text className='font-semibold text-base'>Saved places</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className='bg-gray-200' style={{ height: 0.5 }}/>
                <FlatList
                    data={dataRecentLocation}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View className='bg-gray-200' style={{ height: 0.5 }}/> }
                    renderItem={({item: { name, address, icon }}) => (
                        <TouchableOpacity 
                            onPress={() => {
                                // dispatch(setDestination({
                                //     location: geometry.location,
                                //     description: destination
                                // }))
                                // navigation.navigate('MapScreen')
                            }}
                            className='flex-row items-center p-4'
                        >
                            <Icon 
                                className='mr-4 p-3'
                                name={icon}
                                type='ionicon'
                            />
                            <View>
                                <Text className='font-semibold text-lg'>{name}</Text>
                                <Text className='text-gray-500'>{address}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
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