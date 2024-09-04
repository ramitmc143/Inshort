import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import Iconssssss from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




const Full_screen_ad = ({OnHandleCancel_ad = () => {}}) => {


const handleCancel_ad = () => {
  OnHandleCancel_ad()
}

  return (
    <View>
      <TouchableOpacity style={{position:'absolute',marginTop:'2%', marginLeft:'3%',zIndex:5}} onPress={handleCancel_ad}>
         <Iconssssss name="cross" size={30} color={'white'} />
      </TouchableOpacity>
       <Image source={require('../Assets/mobile_ad.jpg')} style={{width:width*1,height:height*1}} />
    </View>
  )
}

export default Full_screen_ad