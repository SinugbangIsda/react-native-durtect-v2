import Header from "../Header";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationType } from "../../types";
import Card from "../Card";
import { Ionicons } from '@expo/vector-icons'; 
import Text from "../Text";
import tw from "../../utils/tw";
import { DiseaseComponentsProps } from "../../interfaces";

 
const DiseaseHeader = ({ data }: DiseaseComponentsProps ) => {
  const navigation = useNavigation<StackNavigationType>();

  return (
    <Header
      left = {
        <Card
          pressable
          onPress = {() => {
            navigation.goBack();
          }}
        >
          <Ionicons 
            name = "arrow-back-sharp" 
            style = {[ tw `text-2xl darkText`]} 
          />
        </Card>
    }
    center = {
      <Text twStyles = "text-xl font-bold darkText">
        { data }
      </Text>
    }
  />
)
}

export default DiseaseHeader;