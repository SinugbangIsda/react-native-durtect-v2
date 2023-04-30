import { View } from 'react-native';
import React, { useContext } from 'react';
import { PillProps } from '../../interfaces';
import tw from '../../utils/tw';
import { GlobalContext } from '../../context/Global';

const Pill = ({ children, twBackgroundColor, twDarkBackgroundColor }: PillProps) => { 
  const { theme } = useContext(GlobalContext);
  return (
    <View style = {[ tw `p-2 rounded-xl flex justify-center items-center ${theme === "dark" ? `bg-${twDarkBackgroundColor}` : `bg-${twBackgroundColor}`}`]}>
      { children }
    </View>
  )
}

export default Pill;