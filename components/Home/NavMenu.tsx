import React, { useContext, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Button from '../Button';
import { GlobalContext } from '../../context/Global';
import useDiseaseDetection from '../../hooks/useDiseaseDetection';
import Card from '../Card';
import Text from '../Text';
import tw from '../../utils/tw';
import { Alert, Image } from 'react-native';
import { BASE_URL } from '../../constants';

const NavMenu = () => {
  const {  theme } = useContext(GlobalContext);
  const { uploadImage, captureImage  } = useDiseaseDetection();
  
  return (
    <Card twStyles = {`flex-col items-center rounded-2xl p-10 ${theme === "dark" ? "darkSecondaryBG" : "lightSecondaryBG"}`}>
      <Card twStyles = "flex justify-center items-center">
        <SimpleLineIcons 
          name = "frame" 
          size = { 62 } 
          style = {[ tw `text-[#DB2525]`]}
        />
        <Card twStyles = "absolute">
          <MaterialCommunityIcons 
            name = "virus" 
            size = { 32 }
            style = {[ tw `text-[#DB2525] my-2`]}
          /> 
        </Card>
      </Card>
      <Text twStyles = {`text-justify my-2 ${theme === "dark" ? "darkText" : "lightText"}`}>
        Clean your camera lens and focus on the infected area for better results.
      </Text>
      <Button
        twStyles = {`rounded-full p-4 flex justify-center items-center w-full my-1 ${theme === "dark" ? "bg-white" : "bg-black"}`}
        onPress = {() => {
          captureImage()
        }}
      >
        <Text twStyles = {`text-sm font-bold ${theme === "dark" ? "text-black" : "text-white"}`}>
          CAPTURE IMAGE
        </Text>
      </Button>
      <Button
        twStyles = "border-2 border-[#727272] rounded-full p-4 flex justify-center items-center w-full"
        onPress = {() => {
          uploadImage();
        }}
      >
        <Text twStyles = {`text-sm font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
          UPLOAD IMAGE
        </Text>
      </Button>
    </Card>
  )
}

export default NavMenu;