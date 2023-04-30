import { FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../Card';
import Text from "../Text";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationType } from "../../types";
import { deviceWidth } from '../../constants';
import { GlobalContext } from '../../context/Global';
import { sortResultsData } from '../../utils/sortResultsData';
import RecentHistoryItem from './RecentHistoryItem';

const RecentHistory = ({ recentLogs, recentLogsIDs, recentLogsRefetch, allLogs, allLogsIDs, allLogsRefetch }: any) => {
  const navigation = useNavigation<StackNavigationType>();
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    if (recentLogs && allLogs)  {
      recentLogsRefetch();
      allLogsRefetch();
    }
  }, [ recentLogs, allLogs, recentLogsRefetch, allLogsRefetch ]);

  const Skeleton = () => {
    return (
      <Card>
        <Card twStyles = {`flex-1 flex-row justify-center items-center`}>
          <Card>
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] w-[${deviceWidth / 3}px] h-[${deviceWidth / 3}px] mr-4`}
            />
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] h-2 mr-4 mt-2`}
            />
          </Card>
          <Card>
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] w-[${deviceWidth / 3}px] h-[${deviceWidth / 3}px] mr-4`}
            />
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] h-2 mr-4 mt-2`}
            />
          </Card>
          <Card>
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] w-[${deviceWidth / 3}px] h-[${deviceWidth / 3}px] mr-4`}
            />
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] h-2 mr-4 mt-2`}
            />
          </Card>
          <Card>
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] w-[${deviceWidth / 3}px] h-[${deviceWidth / 3}px] mr-4`}
            />
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] h-2 mr-4 mt-2`}
            />
          </Card>
          <Card>
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] w-[${deviceWidth / 3}px] h-[${deviceWidth / 3}px] mr-4`}
            />
            <Card 
              twStyles = {`flex-1 rounded-lg bg-[#969696] h-2 mr-4 mt-2`}
            />
          </Card>
        </Card>
      </Card>
    )
  };

  const NoDataText = () => {
    return (
      <>
        <Text twStyles = {`font-bold text-xl text-center ${theme === "dark" ? "darkText" : "lightText"} mt-2`}>
          No detections yet
        </Text>
        <Text twStyles = {`text-sm text-center ${theme === "dark" ? "darkText" : "lightText"}`}>
          Upload or Capture an image to get started
        </Text>
      </>
    )
  }

  return (
    <Card twStyles = "mt-2">
      <Card twStyles = "flex-row justify-between items-center">
        <Text twStyles = {`font-bold text-xl ${theme === "dark" ? "darkText" : "lightText"}`}>
          Recent History
        </Text>
        <Text 
          twStyles = {`font-bold  ${recentLogs ? `${theme === "dark" ? "darkText" : "lightText"}` : 'text-gray-500'}`}
          onPress = {() => { 
            if (!recentLogs) return;
            navigation.navigate("History", { 
              data: allLogs,
              id: allLogsIDs
            });
          }}
        >
          See all
        </Text>
      </Card>
      <Card twStyles = "flex-row justify-between items-center mt-2">
        <Card twStyles = "flex-1 w-full">
          <FlatList 
            data = { recentLogs }
            scrollEnabled = { recentLogs ? true : false }
            horizontal
            showsHorizontalScrollIndicator = { false }
            renderItem = {({ item, index  }: any) => { 
              const data = sortResultsData([recentLogs[index]]);
              return (
                <RecentHistoryItem
                  key = { index }
                  index = { index }
                  uri = { recentLogs[index].image_uri }
                  data = { recentLogs[index] }
                  onPress = {() => {
                    navigation.navigate("Results", { 
                      data: data,
                      id:  recentLogsIDs[index]
                    });
                  }}
                />
              )
            }}
            ListEmptyComponent = { <Skeleton /> }
          />
          <>
            { !recentLogs ? 
                <NoDataText />
              : null
            }
          </>
        </Card>
      </Card>
    </Card>
  )
}

export default RecentHistory;