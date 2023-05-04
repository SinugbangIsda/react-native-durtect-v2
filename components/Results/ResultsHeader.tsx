import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Card from '../Card';
import Header from '../Header';
import Text from "../Text";
import { StackNavigationType } from "../../types";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import tw from '../../utils/tw';
import { ResultsComponentsProps } from '../../interfaces';
import { Alert } from 'react-native';
import { useDeleteDetectionByIdMutation } from '../../redux/services/detectService';
import { getUserID } from '../../utils/getUserID';

const ResultsHeader = ({ data, id }: ResultsComponentsProps) => {
    const fetchUserID = async () => {
      return getUserID();
    };

    const navigation = useNavigation<StackNavigationType>();
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
    const [ deleteAllEntries ] = useDeleteDetectionByIdMutation();

    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove this entry?",
          [
            {
              text: "Yes",
              onPress: async () => {
                setShowConfirm(!showConfirm);
                try {
                  const userID = await fetchUserID();
                  await deleteAllEntries({ user_id: userID, entry_id: id }).unwrap();
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
            Results
          </Text>
        }
        right = {
          <Card
            pressable
            onPress = {() => {
              if (data[0].status !== "null") {
                showConfirmDialog();
              }
            }}
          >
            <MaterialCommunityIcons 
              name = "delete" 
              style = {[ tw `text-2xl ${data[0].status !== "null"? "darkText" : "text-gray-500"}`]} 
            />
          </Card>
        }
    />
  )
}

export default ResultsHeader;