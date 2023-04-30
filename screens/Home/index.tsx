import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import HomeHeader from '../../components/Home/HomeHeader';
import NavMenu from '../../components/Home/NavMenu';
import RecentHistory from '../../components/Home/RecentHistory';
import Discover from '../../components/Home/Discover';
import { RefreshControl, ScrollView } from 'react-native';
import { GlobalContext } from '../../context/Global';
import useDetections from '../../hooks/useDetections';

const Home = () => {
  const { theme } = useContext(GlobalContext);
  const { recentLogs, recentLogsIDs, allLogs, allLogsIDs, recentLogsRefetch, allLogsRefetch } = useDetections();
  const [ refreshing, setRefreshing ] = useState<boolean>(false);
  
  const refreshControlColors = {
    color: theme === "dark" ? "white" : "black",
    tintColor: theme === "dark" ? "white" : "black",
  };

  useEffect(() => {
    if (recentLogs && allLogs)  {
      recentLogsRefetch();
      allLogsRefetch();
    }
  }, [ recentLogs, allLogs, recentLogsRefetch, allLogsRefetch ]);
  return (
    <Layout twStyles = {`flex-1 ${theme === "dark" ? "darkBG" : "lightBG"}`}>
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
              setTimeout(() => {
                allLogsRefetch();
                recentLogsRefetch();
                setRefreshing(false);
              }, 1000);
            }}
            { ...refreshControlColors }
          />
        }  
      >
        <NavMenu />
        <RecentHistory 
          recentLogs = { recentLogs }
          recentLogsIDs = { recentLogsIDs }
          recentLogsRefetch = { recentLogsRefetch }
          allLogs = { allLogs }
          allLogsIDs = { allLogsIDs }
          allLogsRefetch = { allLogsRefetch }

        />
        <Discover />
      </ScrollView>
    </Layout>
  );
}

export default Home;


