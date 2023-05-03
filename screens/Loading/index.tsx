import { BarIndicator } from "react-native-indicators";
import React from 'react';
import Layout from '../../components/Layout';

const Loading = () => {

  return (
    <Layout twStyles = "flex-1 justify-center items-center darkBG">
      <BarIndicator 
        color = { "white" } 
        count = { 5 } 
      />
    </Layout>
  )
}

export default Loading;