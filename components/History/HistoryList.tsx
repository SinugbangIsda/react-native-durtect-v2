import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import { HistoryComponentsProps } from "../../interfaces";
import { StackNavigationType } from "../../types";
import { getDateFromNow } from "../../utils/getDateFromNow";
import { sortResultsData } from "../../utils/sortResultsData";
import tw from "../../utils/tw";
import Text from "../Text";
import HistoryListItem from "./HistoryListItem";

const HistoryList = ({ data }: HistoryComponentsProps) => {
    const navigation = useNavigation<StackNavigationType>();

    const noData = () => {
        return (
            <Text twStyles = "text-center mt-4 darkText">
                No data found.
            </Text>
        )
    };

    const removeDuplicates = (arr: string[]): string[] => {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    };

    return (
        <FlatList
            style = {[ tw `flex-1`]}
            data = { data }
            showsVerticalScrollIndicator = { false }
            renderItem = {({ item, index  }: any) => {
                const timestamp = getDateFromNow(data[index]["timestamp"]);
                const diseases = removeDuplicates(data[index].name);
            return (
                <HistoryListItem 
                    uri = { data[index].image_uri }
                    onPress = {() => {
                        const val = sortResultsData([data[index]]);
        
                        navigation.navigate("Results", { 
                            data: val,
                            id: data[index]
                        });
                    }}
                    data = { diseases }
                    timestamp = { timestamp }
                />
            )}}
            ListEmptyComponent = { noData }
        />
    )
}

export default HistoryList;
