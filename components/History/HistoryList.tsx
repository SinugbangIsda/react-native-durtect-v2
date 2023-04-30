import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, Image } from "react-native";
import { Styles } from "../../constants";
import { GlobalContext } from "../../context/Global";
import { HistoryComponentsProps } from "../../interfaces";
import { StackNavigationType } from "../../types";
import { getDateFromNow } from "../../utils/getDateFromNow";
import { sortResultsData } from "../../utils/sortResultsData";
import tw from "../../utils/tw";
import Card from "../Card";
import Text from "../Text";
import HistoryListItem from "./HistoryListItem";

const HistoryList = ({ data }: HistoryComponentsProps) => {
    const navigation = useNavigation<StackNavigationType>();
    const { theme } = useContext(GlobalContext);

    const noData = () => {
        return (
            <Text twStyles = {`text-center mt-4 ${theme === "dark" ? "darkText" : "lightText"}`}>
                No data found.
            </Text>
        )
    }

    const removeDuplicates = (arr: string[]): string[] => {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }

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
