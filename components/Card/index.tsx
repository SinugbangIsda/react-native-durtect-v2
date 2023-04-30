import { Pressable, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { CardProps } from '../../interfaces';
import tw from '../../utils/tw';

const Card = ({ children, twStyles, onPress, touchableOpacity, activeOpacity, pressable }: CardProps ) => {
  if (pressable) {
    return (
      <Pressable 
        style = {[ twStyles ?  tw `${twStyles}` : null ]}
        onPress = { onPress }
      >
        { children }
      </Pressable>
    )
  } else if ( touchableOpacity ) {
    return (
      <TouchableOpacity
        activeOpacity = { activeOpacity }
        onPress = { onPress}
      >
        { children}
      </TouchableOpacity>
    )
  } else {
    return(
      <View
        style = {[ twStyles ?  tw `${twStyles}` : null ]}
      >
        { children }
      </View>
    )
  }
}

export default Card;
