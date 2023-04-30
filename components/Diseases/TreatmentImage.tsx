import { Image, Modal } from 'react-native';
import React, { useState } from 'react';
import tw from '../../utils/tw';
import { deviceHeight, deviceWidth, Styles } from '../../constants';
import { DiseaseComponentsProps } from '../../interfaces';
import Card from '../Card';
import ImageViewer from 'react-native-image-zoom-viewer';


const TreatmentImage = ({ data }: DiseaseComponentsProps) => {
  const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false);
  const [ visible, setVisible ] = useState<boolean>(false);

  const image = [
    {
      url: data
    }
  ];

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
          uri: data,
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

export default TreatmentImage;