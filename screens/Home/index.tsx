import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import HomeHeader from '../../components/Home/HomeHeader';
import NavMenu from '../../components/Home/NavMenu';
import RecentHistory from '../../components/Home/RecentHistory';
import Discover from '../../components/Home/Discover';
import { RefreshControl, ScrollView } from 'react-native';
import useDetections from '../../hooks/useDetections';
import { selectCurrentUserID } from '../../redux/slices/authSlice';
import { useAppSelector } from '../../redux/hooks';

const Home = () => {
  const userID = useAppSelector(selectCurrentUserID);
  const { 
    recentLogs, 
    recentLogsIDs, 
    allLogs, 
    allLogsIDs, 
    recentLogsRefetch, 
    allLogsRefetch,
    allLogsIsLoading,
    recentLogsIsLoading
  } = useDetections({ id: userID });
  const [ refreshing, setRefreshing ] = useState<boolean>(false);
  const refreshControlColors = {
    color: "white",
    tintColor: "white",
  };

  return (
    <Layout twStyles = {`flex-1 darkBG`}>
      <HomeHeader />
      <ScrollView
        style = {[ { flex: 1 }]}
        nestedScrollEnabled
        showsVerticalScrollIndicator = { false }
        refreshControl = {
          <RefreshControl
            refreshing = { refreshing }
            onRefresh = { () => { 
              setRefreshing(true);
              if (allLogsIsLoading || recentLogsIsLoading) {
                setRefreshing(false);
              } else {
                allLogsRefetch();
                recentLogsRefetch();
                setRefreshing(false);
              }
            }}
            { ...refreshControlColors }
          />
        }  
      >
        <NavMenu />
        <RecentHistory 
          recentLogs = { recentLogs }
          recentLogsIDs = { recentLogsIDs }
          allLogs = { allLogs }
          allLogsIDs = { allLogsIDs }
        />
        <Discover />
      </ScrollView>
    </Layout>
  );
}

export default Home;


