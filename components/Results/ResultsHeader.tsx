import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/Global';
import Card from '../Card';
import Header from '../Header';
import Text from "../Text";
import { StackNavigationType } from "../../types";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import tw from '../../utils/tw';
import { ResultsComponentsProps } from '../../interfaces';
import { Alert } from 'react-native';
import { useDeleteDetectionByIdMutation } from '../../redux/services/detectService';

const ResultsHeader = ({ data, id }: ResultsComponentsProps) => {
    const navigation = useNavigation<StackNavigationType>();
    const { theme, user_id } = useContext(GlobalContext);
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
                  await deleteAllEntries({ user_id: user_id, entry_id: id }).unwrap();
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
              style = {[ tw `text-2xl ${data[0].status !== "null"? `${theme === "dark" ? "darkText" : "lightText"}` : 'text-gray-500'}`]} 
            />
          </Card>
        }
    />
  )
}

export default ResultsHeader;