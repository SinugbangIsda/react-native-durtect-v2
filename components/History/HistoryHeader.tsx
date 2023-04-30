import Header from "../Header";
import Card from "../Card";
import Text from "../Text";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/Global";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationType } from "../../types";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { HistoryComponentsProps } from "../../interfaces";
import { Alert } from "react-native";
import tw from "../../utils/tw";
import { useDeleteAllDetectionsMutation } from "../../redux/services/detectService";

const HistoryHeader = ({ data }: HistoryComponentsProps) => {
    const { dispatch, theme, user_id } = useContext(GlobalContext);
    const navigation = useNavigation<StackNavigationType>();
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
    const [ deleteAllEntries ] = useDeleteAllDetectionsMutation();

    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove all of the entries?",
          [
            {
              text: "Yes",
              onPress: async () => {
                setShowConfirm(!showConfirm);
                try {
                    await deleteAllEntries({ user_id: user_id }).unwrap();
                    navigation.goBack();
                } catch (err) {
                    console.log(err);
                }
              },
            },
            {
              text: "No",
            },
          ]
        );
    };

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
                        style = {[ tw `text-2xl ${theme === "dark" ? "darkText" : "lightText"}`]} 
                    />
                </Card>
            }
            center = {
                <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                    History
                </Text>
            }
            right = {
                <Card
                    pressable
                    onPress = {() => {
                        showConfirmDialog();
                    }}
                >
                    <MaterialCommunityIcons 
                        name = "delete" 
                        style = {[ tw `text-2xl ${data[0]["status"] === "OK" ? `${theme === "dark" ? "darkText" : "lightText"}` : 'text-gray-500'}`]} 
                    />
                </Card>
            }
        />
    )
}

export default HistoryHeader;