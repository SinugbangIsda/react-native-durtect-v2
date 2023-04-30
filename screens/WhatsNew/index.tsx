import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import Layout from "../../components/Layout";
import Text from '../../components/Text';
import tw from '../../utils/tw';
import WhatsNewHeader from '../../components/WhatsNew/WhatsNewHeader';
import Card from '../../components/Card';
import { Entypo } from '@expo/vector-icons'; 
import { GlobalContext } from '../../context/Global';

const WhatsNew = () => {
  const { theme } = useContext(GlobalContext);
  return (
    <Layout twStyles = {`flex-1 ${theme === "dark" ? "darkBG" : "lightBG"}`}>
      <WhatsNewHeader />
      <ScrollView 
        style = {[ tw `flex-1`]}
        contentContainerStyle = {{ flexGrow: 1 }}
      >
        <Card twStyles = "flex-1 justify-center items-center">
          <Entypo 
            name = "emoji-sad" 
            size = { 60 } 
            style = {[ tw `my-2 ${theme === "dark" ? "darkText" : "lightText"}`]} 
          />
          <Text twStyles = {`text-2xl font-bold text-center my-2 ${theme === "dark" ? "darkText" : "lightText"}`}>
            We don't have any updates for you yet!
          </Text>
          <Text twStyles = {`text-lg text-center my-2 ${theme === "dark" ? "text-gray-500" : "text-gray-700"}`}>
            When there's news, we'll post it here.
          </Text>
        </Card>
      </ScrollView>
    </Layout>
  )
}

export default WhatsNew;