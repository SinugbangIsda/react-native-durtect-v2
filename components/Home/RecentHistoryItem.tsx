import { Image } from 'react-native'
import React, { useState } from 'react'
import Card from '../Card';
import { deviceWidth, Styles } from '../../constants';
import tw from '../../utils/tw';
import Text from '../Text';
import { getDateFromNow } from '../../utils/getDateFromNow';

const RecentHistoryItem = ({ uri, onPress, data, index }: any) => {
    const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false);
    const timestamp = getDateFromNow(data.timestamp);
    
    return (
        <>
            { !isImageLoaded && (
                <Card 
                    twStyles = {`rounded-lg bg-[#969696] w-[${deviceWidth / 3}px] h-[${deviceWidth / 3}px] absolute`}
                />
            )}
            <Card 
                twStyles = {`flex-1 flex justify-center items-center ${index === data.length - 1 ? '' : 'mr-4'}`}
                pressable
                onPress = { onPress }
            >
                <Image 
                    style = {[ tw `rounded-lg`, Styles.flatListImagesHistory ]}
                    resizeMode = "stretch"
                    source = {{
                        uri: uri,
                        cache: "force-cache"
                    }}
                    onLoadStart = {() => {
                        setIsImageLoaded(false);
                    }}
                    onLoadEnd = {() => { 
                        setIsImageLoaded(true);
                    }}
                />
                <Text twStyles = "text-center mt-2 darkText">
                    { timestamp }
                </Text>
            </Card>
        </>
    )
}

export default RecentHistoryItem;