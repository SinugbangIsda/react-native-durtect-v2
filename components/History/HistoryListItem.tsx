import React, { useState } from 'react';
import { Image } from 'react-native';
import { deviceWidth, Styles } from '../../constants';
import tw from '../../utils/tw';
import Card from '../Card';
import Text from '../Text';

const HistoryListItem = ({ uri, onPress, data, timestamp }: any) => {
  const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false);

  return (
    <Card twStyles = "mt-2">
      <Card 
        pressable
        onPress = { onPress }
        twStyles = "flex-row items-center my-2"
      >
        { !isImageLoaded && (
          <Card twStyles = { `rounded-xl bg-[#969696] w-[${deviceWidth / 5}px] h-[${deviceWidth / 5}px] absolute` }/>
        )}
        <Card>
          <Image
            style = {[ tw `rounded-xl`, Styles.historyLogImages ]}
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
        </Card>
        { data.map((val: string, idx: number) => (
          <Card key = { idx }>
            <Text twStyles = "ml-4 darkText">
              <Text twStyles = "font-bold"> {val === "NoDisease" ? "NoDisease" : (idx === data.length - 1 ? val.slice(2) : `${val.slice(2)}, `)}</Text> was detected. { timestamp }
            </Text>
          </Card>
        ))}
      </Card>
    </Card>
  )
}

export default HistoryListItem;