import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { NativeWindStyleSheet } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from '../components/NavFavourites';
import NavOptions from '../components/NavOptions';

NativeWindStyleSheet.setOutput({
    default: "native",
});

const NavScreen = () => {
    const navigation = useNavigation();

    return (
        <View className='bg-white h-full pt-4'>
            <View className='flex-row justify-around items-center'>
                <View className='p-4 w-11/12 bg-gray-200 rounded-full'>
                    <TouchableOpacity className='flex-row' 
                        onPress={() => {navigation.navigate('PlanModel')}}
                    >
                        <Icon name='search' type='ionicon' color={'black'} size={24} />
                        <Text className='ml-4 text-xl font-semibold'>Where to?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <NavFavourites />
            <NavOptions />
        </View>
    )
}

export default NavScreen

const styles = StyleSheet.create({
    searchBtn:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
        width: 1,
        height: 1,
        },
    },
})