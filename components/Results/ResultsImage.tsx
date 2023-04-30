import { Image, Modal } from 'react-native';
import React, { useState } from 'react';
import tw from '../../utils/tw';
import { deviceHeight, deviceWidth, Styles } from '../../constants';
import { ResultsComponentsProps } from '../../interfaces';
import Card from '../Card';
import ImageViewer from 'react-native-image-zoom-viewer';

const ResultsImage = ({ data }: ResultsComponentsProps) => {
  const { image_uri } = data[0];
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false);

  const image = [{
    url: image_uri,
  }];


  return (
    <>
      { !isImageLoaded && (
        <Card 
          twStyles = { `rounded-xl bg-[#969696] w-[${deviceWidth - 32}px] h-[${deviceHeight / 3}px] absolute` }
        />
      )}
      <Card 
        pressable
        onPress = {() => setVisible(!visible)}
      >
        <Image
          style = {[ tw `rounded-xl`, Styles.resultsImage ]}
          source = {{
            uri: image[0].url,
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
      
      <Modal
        presentationStyle = "overFullScreen"
        animationType = "slide"
        transparent
        visible = { visible }
      >
        <ImageViewer 
          imageUrls = { image } 
          onSwipeDown = {() => setVisible(!visible) }
          enableSwipeDown
        />
      </Modal>
    </>
  )
}

export default ResultsImage;