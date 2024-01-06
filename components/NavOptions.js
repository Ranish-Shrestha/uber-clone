import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { NativeWindStyleSheet } from "nativewind";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

NativeWindStyleSheet.setOutput({
    default: "native",
});

const data = [
    {
        id: '1',
        title: 'Ride',
        image: require('../assets/images/UberX.png'),
        promp: false,
        screen: 'MapScreen'
    },
    {
        id: '2',
        title: 'Reserve',
        image: require('../assets/images/reserve.png'),
        promp: false,
        screen: "EatsScreen"
    },
    {
        id: '3',
        title: 'Rental Cars',
        image: require('../assets/images/rental.png'),
        promp: true,
        screen: "EatsScreen"
    },
    {
        id: '4',
        title: 'Travel',
        image: require('../assets/images/travel.png'),
        promp: true,
        screen: "EatsScreen"
    },
]


const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

  return (
    <View>
        <View className='flex-row justify-between pl-4 pr-4 pb-2 items-baseline'>
            <Text className='font-bold text-lg '>Suggestions</Text>
            <Text className='text-sm pr-4'>See All</Text>
        </View>
        <FlatList
            data={data}
            horizontal
            contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly', paddingBottom: 14}}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                
                <TouchableOpacity
                    onPress={()=> navigation.navigate(item.screen)}
                    disabled={!origin}
                    className='items-center'
                >    
                    <View className='bg-green-800 rounded-lg -mb-2 z-10'
                        style={ item.promp == true ? { opacity: 1 } : { opacity: 0 } }
                    >
                        <Text className='text-white text-center pl-2 pr-2 '>Promo</Text>
                    </View>
                    <View className="p-4 bg-gray-200 rounded-xl">
                        
                        <Image 
                            style={{
                                width: 60,
                                height: 40, 
                                resizeMode: 'contain'
                            }}
                            source={ item.image }
                        />
                    </View>
                    <Text className="mt-2 text-sm font-semibold">{item.title}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}



export default NavOptions