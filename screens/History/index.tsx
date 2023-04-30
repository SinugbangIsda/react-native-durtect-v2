import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import HistoryHeader from '../../components/History/HistoryHeader';
import HistoryList from '../../components/History/HistoryList';
import { GlobalContext } from '../../context/Global';

const History = ({ route }: any) => {
  const { id, data } = route.params;
  const { theme } = useContext(GlobalContext);
  
  return (
    <Layout twStyles = {`flex-1 ${theme === "dark" ? "darkBG" : "lightBG"}`}>
      <HistoryHeader data = { data } />
      <HistoryList data = { data } id = { id }/>
    </Layout>
  )
}

export default History;