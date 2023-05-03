import React from 'react';
import ResultsData from '../../components/Results/ResultsData';
import { ScrollView } from 'react-native';
import tw from '../../utils/tw';
import ResultsImage from '../../components/Results/ResultsImage';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import ResultsHeader from '../../components/Results/ResultsHeader';
import Text from '../../components/Text';

const Results = ({ route }: any) => {
  const { data, id } = route.params;

  return (
    <Layout twStyles = "flex-1 darkBG">
      <ResultsHeader 
        data = { data }
        id = { id }
      />
      <ScrollView
        style = {[ tw `flex-1`]}
        showsVerticalScrollIndicator = { false }
        contentContainerStyle = {{ flexGrow: 1 }}
      >
        <Card twStyles = "my-2">
          <>
            { data[0].status !== "null"? 
              <>
                <ResultsImage
                  data = { data }
                  id = { id }
                />
                <ResultsData 
                  data = { data }
                  id = { id }
                />
              </>
            :
              <Text twStyles = "darkText text-center">
                No detections.
              </Text>
            }
          </>
        </Card>
      </ScrollView>
    </Layout>
  )
}
export default Results;