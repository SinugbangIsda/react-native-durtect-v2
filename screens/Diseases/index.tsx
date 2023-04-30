import { ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Layout from "../../components/Layout";
import tw from '../../utils/tw';
import Card from '../../components/Card';
import Text from "../../components/Text";
import DiseaseHeader from '../../components/Diseases/DiseasesHeader';
import DiseaseImage from '../../components/Diseases/DiseaseImage';
import { GlobalContext } from '../../context/Global';
import TreatmentImage from '../../components/Diseases/TreatmentImage';

const Diseases = ({ route }: any) => {
  const { disease, info, symptoms, treatment, image_uri } = route.params.selectedDisease;
  const { theme } = useContext(GlobalContext);
  return (
    <Layout twStyles = {`flex-1 ${theme === "dark" ? "darkBG" : "lightBG"}`}>
      <DiseaseHeader 
        data = { disease }
        />
      <ScrollView 
        style = {[ tw `flex-1`]}
        showsVerticalScrollIndicator = { false }
      >
        <DiseaseImage  data = { image_uri } />
        <Card twStyles = "my-2">
          <Text twStyles = {`text-xl font-bold my-2 ${theme === "dark" ? "darkText" : "lightText"}`}>
            About
          </Text>
          <Card twStyles = {`mt-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
            <Text twStyles = {`text-justify ${theme === "dark" ? "darkText" : "lightText"}`}>
              { info }
            </Text>
          </Card>
        </Card>
        <Card twStyles = "my-2">
          <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
            Symptoms
          </Text>
          <Card twStyles = {`mt-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
            { symptoms.map((value: any, index: any) => (
              <Card 
                key = { index }
              >
                <Text twStyles = {`text-lg font-bold my-2 ${theme === "dark" ? "darkText" : "lightText"}`}>
                  { index + 1}. { value.name }
                </Text>
                <Text twStyles = {`${theme === "dark" ? "darkText" : "lightText"}`}>
                  - { value.description }
                </Text>
              </Card>
            ))} 
          </Card>
        </Card>
        <Card twStyles = "my-2">
          <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
            Possible Treatment
          </Text>
          <Card twStyles = "my-2">
            <TreatmentImage 
              data = { treatment[0].image_uri }
            />
          </Card>
          <Card twStyles = {`mt-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
            { treatment.map((value: any, index: any) => (
              <Card 
                key = { index }
              >
                <Text twStyles = {`text-lg font-bold my-2 ${theme === "dark" ? "darkText" : "lightText"}`}>
                  { value.name }
                </Text>
                <Text twStyles = {`text-justify ${theme === "dark" ? "darkText" : "lightText"}`}>
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