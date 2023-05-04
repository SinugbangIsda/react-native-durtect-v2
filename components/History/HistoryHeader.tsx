import Header from "../Header";
import Card from "../Card";
import Text from "../Text";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationType } from "../../types";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { HistoryComponentsProps } from "../../interfaces";
import { Alert } from "react-native";
import tw from "../../utils/tw";
import { useDeleteAllDetectionsMutation } from "../../redux/services/detectService";
import { getUserID } from "../../utils/getUserID";

const HistoryHeader = ({ data }: HistoryComponentsProps) => {
    const fetchUserID = async () => {
        return getUserID();
    };
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
                    const userID = await fetchUserID();
                    await deleteAllEntries({ user_id: userID }).unwrap();
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
                        style = {[ tw `text-2xl darkText`]} 
                    />
                </Card>
            }
            center = {
                <Text twStyles = "text-xl font-bold darkText">
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
                        style = {[ tw `text-2xl ${data[0]["status"] === "OK" ? "darkText" : "text-gray-500"}`]} 
                    />
                </Card>
            }
        />
    )
}

export default HistoryHeader;