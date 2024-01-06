import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { NativeWindStyleSheet } from "nativewind";
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
NativeWindStyleSheet.setOutput({
    default: "native",
});




const Map = (isdestinationSelected) => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    getMapFit = () =>{
        //Zoom and fit to marker
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50}
        })
    }

    if(isdestinationSelected){
        setTimeout(() => { getMapFit()}, 1000)
    }

    useEffect(()=>{
        if (!origin || !destination) return;
        
        getMapFit()
    }, [origin, destination, isdestinationSelected]) 
  
  useEffect(() => {
    if (!origin || !destination) return;
    
    const getTravelTime = async() => {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial&origins=${origin.description}
        &destinations=${destination.description}
        &key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
            dispatch(setTravelTimeInformation(data?.rows[0]?.elements[0]))
        })
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY])

  return (
    <MapView
        ref={mapRef}
        className='flex-1'
        mapType='mutedStandard'
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >
        {origin && destination && (
            <MapViewDirections 
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColors='black'
            />
        )}

        {origin?.location && (
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng
                }}
                title='Origin'
                description={origin.description}
                identifier='origin'
            >
                <Image source={require('../assets/images/Pickup.png')} style={{height: 35, width:35 }} />
            </Marker>
        )}

        {destination?.location && (
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng
                }}
                title='Destination'
                description={destination.description}
                identifier='destination'
            />
        )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})