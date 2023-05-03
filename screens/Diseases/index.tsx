import { ScrollView } from 'react-native';
import React from 'react';
import Layout from "../../components/Layout";
import tw from '../../utils/tw';
import Card from '../../components/Card';
import Text from "../../components/Text";
import DiseaseHeader from '../../components/Diseases/DiseasesHeader';
import DiseaseImage from '../../components/Diseases/DiseaseImage';
import TreatmentImage from '../../components/Diseases/TreatmentImage';

const Diseases = ({ route }: any) => {
  const { disease, info, symptoms, treatment, image_uri } = route.params.selectedDisease;

  return (
    <Layout twStyles = "flex-1 darkBG">
      <DiseaseHeader 
        data = { disease }
        />
      <ScrollView 
        style = {[ tw `flex-1`]}
        showsVerticalScrollIndicator = { false }
      >
        <DiseaseImage  data = { image_uri } />
        <Card twStyles = "my-2">
          <Text twStyles = "text-xl font-bold my-2 darkText">
            About
          </Text>
          <Card twStyles = "mt-2 rounded-2xl p-4 darkSecondaryBG">
            <Text twStyles = "text-justify darkText">
              { info }
            </Text>
          </Card>
        </Card>
        <Card twStyles = "my-2">
          <Text twStyles = "text-xl font-bold darkText">
            Symptoms
          </Text>
          <Card twStyles = "mt-2 rounded-2xl p-4 darkSecondaryBG">
            { symptoms.map((value: any, index: any) => (
              <Card 
                key = { index }
              >
                <Text twStyles = "text-lg font-bold my-2 darkText">
                  { index + 1}. { value.name }
                </Text>
                <Text twStyles = "darkText">
                  - { value.description }
                </Text>
              </Card>
            ))} 
          </Card>
        </Card>
        <Card twStyles = "my-2">
          <Text twStyles = "text-xl font-bold darkText">
            Possible Treatment
          </Text>
          <Card twStyles = "my-2">
            <TreatmentImage 
              data = { treatment[0].image_uri }
            />
          </Card>
          <Card twStyles = "mt-2 rounded-2xl p-4 darkSecondaryBG">
            { treatment.map((value: any, index: any) => (
              <Card 
                key = { index }
              >
                <Text twStyles = "text-lg font-bold darkText">
                  { value.name }
                </Text>
                <Text twStyles = "text-justify darkText">
                  { value.description }
                </Text>
              </Card>
            ))} 
          </Card>
        </Card>
      </ScrollView>
    </Layout>
  )
}

export default Diseases;