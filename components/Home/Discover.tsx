import React, { useContext, useState } from 'react';
import { FlatList } from "react-native";
import Text from '../Text';
import Card from '../Card';
import diseases from "../../assets/data/diseases.json";
import { GlobalContext } from '../../context/Global';
import DiscoverItem from './DiscoverItem';

const Discover = () => {
  const { theme } = useContext(GlobalContext);

  const noData = () => {
      return (
        <Text twStyles = {`${theme === "dark" ? "text-white" : "text-black"}`}>
          No data avaiable.
        </Text>
      )
  }

  return (
    <Card twStyles = "mt-2">
      <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
        Discover
      </Text>
      <Card twStyles = {`mt-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG" : "lightSecondaryBG"}`}>
        <FlatList 
          data = { diseases }
          showsHorizontalScrollIndicator = { false }
          horizontal
          renderItem = {({ item, index  }: any) => {
          return (
            <DiscoverItem
              key = { index }
              index = { index }
              uri = { item.image_uri }
              data = { item }
            />
          )}}
          ListEmptyComponent = { noData }
        />
      </Card>
    </Card>
  )
}

export default Discover;