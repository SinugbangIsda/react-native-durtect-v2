import React from 'react';
import { PillProps } from '../../interfaces';
import tw from '../../utils/tw';
import Card from '../Card';

const Pill = ({ children, twBackgroundColor }: PillProps) => { 
  return (
    <Card twStyles = {`p-2 rounded-xl flex justify-center items-center bg-${twBackgroundColor}`}>
      { children }
    </Card>
  )
}

export default Pill;