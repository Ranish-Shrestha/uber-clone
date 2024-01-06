import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeWindStyleSheet } from 'nativewind';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber X',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn'
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8'
    },
    {
        id: 'Uber-LUX-789',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: 'https://links.papareact.com/7pf'
    }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView className='bg-white flex-grow'>
      <View className='-top-8'>
        <TouchableOpacity 
          onPress={() => navigation.navigate('NavigateCard')}
          className='absolute top-3 left-5 z-50 p-3 rounded-full'
        >
          <Icon name='chevron-left' type='fontawesome'/>
        </TouchableOpacity>
        <Text className='text-center py-5 text-xl'>Select a Ride - {travelTimeInformation?.distance?.text}</Text>

      </View>

        <FlatList
            className='-top-12 mt-0 -mb-10 mx-5'
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item : { id, title, image, multiplier }, item }) => (
                <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    className='flex-row items-center justify-between px-5'
                    style={
                        id === selected?.id ? {
                            opacity: 1,
                            backgroundColor:'rgb(229,231,235)',
                            borderColor: 'black',
                            borderWidth: 2,
                            borderRadius: 20,
                        } : {

                        }
                    }
                >
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: image }}
                    />
                    <View className='-ml-6'>
                        <Text className='text-xl font-semibold'>{title}</Text>
                        <Text>{travelTimeInformation?.duration?.text}</Text>
                    </View>
                    <Text className='text-xl'>
                        {new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(
                            (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                        )}
                    </Text>
                </TouchableOpacity>
            )}
        />

        <View className='mt-auto border-t border-gray-200'>
            <TouchableOpacity 
                disabled={!selected} className='bg-black py-2 m-3 mt-0'
                style={
                    !selected ? {
                        opacity: 1,
                        backgroundColor:'rgb(209,213,219)'
                    } : {
                        
                    }
                }
            >
                <Text className='text-center text-white text-xl'>Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})