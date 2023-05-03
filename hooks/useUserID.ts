import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';

const useUserID = () => {
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const getUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem('userID');
        if (storedUserID) {
          setUserID(storedUserID);
        } else {
          const newUserID = nanoid(7);
          await AsyncStorage.setItem('userID', newUserID);
          setUserID(newUserID);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getUserID();
  }, []);

  const getStoredUserID = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem('userID');
      return storedUserID;
    } catch (e) {
      console.error(e);
    }
  };

  return { userID, getStoredUserID };
};

export default useUserID;