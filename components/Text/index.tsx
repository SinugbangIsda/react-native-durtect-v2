import * as Custom from 'react-native';
import React from 'react';
import { TextProps } from '../../interfaces';
import tw from '../../utils/tw';

const Text = ({ children, twStyles, onPress, key }: TextProps) => {
  return (
    <Custom.Text 
      style = {[ twStyles ? tw `${twStyles}` : null ]}
      key = { key }
      onPress = { onPress }
    >
      { children }
    </Custom.Text>
  )
}

export default Text;