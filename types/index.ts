import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    "Home": undefined;
    "About": undefined;
    "Results": undefined | any;
    "Loading": undefined;
    "History": undefined | Object;
    "Diseases": undefined | Object;
    "WhatsNew": undefined;
};

export type StackNavigationType = NativeStackNavigationProp<RootStackParamList>;