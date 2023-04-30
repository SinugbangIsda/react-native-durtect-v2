import { Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Card from '../Card';
import { deviceWidth, Styles } from '../../constants';
import tw from '../../utils/tw';
import Text from '../Text';
import { getDateFromNow } from '../../utils/getDateFromNow';
import { GlobalContext } from '../../context/Global';
import Pill from '../Pill';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationType } from '../../types';

const DiscoverItem = ({ uri, data, index }: any) => {
    const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false);
    const { theme } = useContext(GlobalContext);
    const navigation = useNavigation<StackNavigationType>();

  return (
    <>
        { !isImageLoaded && (
            <Card 
                twStyles = {`rounded-lg bg-[#969696] w-[${deviceWidth / 5}px] h-[${deviceWidth / 5}px] absolute`}
            />
        )}
        <Card
            pressable
            twStyles = "flex-row justify-between items-center"
            onPress = {() => {
                navigation.navigate("Diseases", {
                    selectedDisease: data
                });
            }}
        >
            <Card twStyles = "flex-row justify-center items-center">
                <Image 
                    style = {[ tw `rounded-lg`, Styles.flatListImagesDiscover ]}
                    resizeMode = "stretch"
                    source = {{
                      uri: data.image_uri,
                      cache: "force-cache"
                    }}
                />
                <Card twStyles = 'flex-col justify-center items-start mx-2'>
                    <Text twStyles = {`font-bold mb-1 ${theme === "dark" ? "darkText" : "lightText"}`}>
                      { data.disease }
                    </Text>
                    <Pill
                      twBackgroundColor = "gray-600"
                      twDarkBackgroundColor = "gray-700"
                    >
                      <Text twStyles = "text-sm font-bold text-white">
                        Fungus
                      </Text>
                    </Pill>
                </Card>
            </Card>
        </Card>
    </>
  )
}

export default DiscoverItem;