import React from 'react';
import Header from '../Header';
import Button from '../Button';
import { MaterialIcons } from '@expo/vector-icons'; 
import tw from '../../utils/tw';
import Greetings from './Greetings';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationType } from "../../types";

const HomeHeader = () => {
    const navigation = useNavigation<StackNavigationType>()

  return (
    <Header
        left = {
            <Greetings />
        }
        right = { 
            <Button
                twStyles = 'aspect-square rounded-xl'
                onPress = {() => {
                    navigation.navigate("WhatsNew");
                }}
            >
                <MaterialIcons 
                    name = "notifications-none" 
                    size = { 28 } 
                    style = {[ tw `darkText`]} 
                />
            </Button>
        }
    />
  )
}

export default HomeHeader