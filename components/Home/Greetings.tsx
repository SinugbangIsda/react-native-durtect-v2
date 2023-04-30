import React, { useContext } from 'react';
import Text from "../Text";
import getDayPeriod from '../../utils/getDayPeriod';
import moment from 'moment';
import { GlobalContext } from '../../context/Global';

const Greetings = () => {
  const greeting = getDayPeriod(moment().hour());
  const { theme } = useContext(GlobalContext);

  return (
    <Text twStyles = {`text-2xl font-bold  ${theme === "dark" ? "darkText" : "lightText"}`}>
      { greeting }
    </Text>
  )
}

export default Greetings;