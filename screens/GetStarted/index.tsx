import React from 'react'
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Text from '../../components/Text';
import useUserID from '../../hooks/useUserID';

const GetStarted = () => {
  const { getUserID } = useUserID();
  
  return (
    <Layout twStyles = "flex-1 justify-center items-center darkBG">
      <Button
        twStyles = "rounded-full p-4 flex justify-center items-center w-full my-1 bg-white"
        onPress = {() => {
          getUserID();
        }}
      >
        <Text twStyles = "text-sm font-bold text-black">
          Get Started
        </Text>
      </Button>
    </Layout>
  )
}

export default GetStarted;