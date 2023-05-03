import { useNavigation } from "@react-navigation/native";
import { WhatsNewComponentsProps } from "../../interfaces";
import { StackNavigationType } from "../../types";
import { Ionicons } from '@expo/vector-icons'; 
import Card from "../Card";
import Header from "../Header";
import tw from "../../utils/tw";
import Text from "../Text";

const WhatsNewHeader = ({ data }: WhatsNewComponentsProps) => {
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
                    Whats New
                </Text>
            }
        />
    )
}

export default WhatsNewHeader;