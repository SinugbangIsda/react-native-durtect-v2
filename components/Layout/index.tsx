import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { Styles } from '../../constants';
import { LayoutProps } from '../../interfaces';
import tw from '../../utils/tw';
import Card from '../Card';

const Layout = ({ children, twStyles, noSpacing }: LayoutProps ) => {

  return (
    <>
      <StatusBar style = "light" />
      <SafeAreaView style = {[ Styles.AndroidSafeArea, tw `${twStyles}`]}>
        { noSpacing ?
          <Card twStyles = "flex-1">
            { children }
          </Card>
        :
          <Card twStyles =  "mx-4 flex-1">
            { children }
          </Card>
        }
      </SafeAreaView>
    </>
  )
}

export default Layout;