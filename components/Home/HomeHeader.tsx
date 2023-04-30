import React, { useState } from 'react';
import Header from '../Header';
import Button from '../Button';
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import useDarkMode from '../../hooks/useDarkMode';
import tw from '../../utils/tw';
import Greetings from './Greetings';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationType } from "../../types";

const HomeHeader = () => {
    const { setTheme, theme } = useDarkMode();
    const navigation = useNavigation<StackNavigationType>()

  return (
    <Header
        left = {
            <Greetings />
        }
        right = { 
            <>
                <Button
                    twStyles = 'aspect-square rounded-xl'
                    onPress = {() => {
                        navigation.navigate("WhatsNew");
                    }}
                >
                    <MaterialIcons 
                        name = "notifications-none" 
                        size = { 28 } 
                        style = {[ tw `${theme === "dark" ? "darkText" : "lightText"}`]} 
                    />
                </Button>
                <Button 
                    onPress = {() => {
                        navigation.navigate("Loading");
                        setTimeout(() => {
                            setTheme(theme === "dark" ? "light": "dark");
                            navigation.goBack();
                        }, 2000);
                    }}
                    twStyles = 'aspect-square rounded-xl'
                >
                    { theme === "light" ?
                        <Feather 
                            name = "moon" 
                            size = { 28 } 
                            style = {[ tw `lightText`]}
                        />
                     :
                        <MaterialCommunityIcons 
                            name = "white-balance-sunny" 
                            size = { 28 } 
                            style = {[ tw `darkText`]} 
                        />
                    }
                </Button>
            </>
        }
    />
  )
}

export default HomeHeader