import Header from "../Header";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/Global";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationType } from "../../types";
import Card from "../Card";
import { Ionicons } from '@expo/vector-icons'; 
import Text from "../Text";
import tw from "../../utils/tw";
import { DiseaseComponentsProps } from "../../interfaces";

 
const DiseaseHeader = ({ data }: DiseaseComponentsProps ) => {
    const { dispatch, theme } = useContext(GlobalContext);
    const navigation = useNavigation<StackNavigationType>();

    const handleContext = () => {
        dispatch({
            type: "RESET",
        });
    };
    return (
        <Header
          left = {
            <Card
                pressable
                onPress = {() => {
                  handleContext();
                  navigation.goBack();
                }}
            >
                <Ionicons 
                  name = "arrow-back-sharp" 
                  style = {[ tw `text-2xl ${theme === "dark" ? "darkText" : "lightText"}`]} 
                />
            </Card>
        }
        center = {
          <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
            { data }
          </Text>
        }
      />
    )
}

export default DiseaseHeader;