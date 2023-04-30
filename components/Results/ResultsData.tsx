import { ResultsComponentsProps } from '../../interfaces';
import Card from '../Card';
import Text from '../Text';
import diseases from "../../assets/data/diseases.json";
import { useContext } from 'react';
import { GlobalContext } from '../../context/Global';
import { ProgressBar } from "react-native-paper";
import tw from '../../utils/tw';
import TreatmentImage from '../Diseases/TreatmentImage';

const ResultsData = ({ data }: ResultsComponentsProps) => {
    const { symptoms, treatment } = diseases[0];
    const { theme } = useContext(GlobalContext);
    
    const getDetectedSymptoms = () => {
        const names: string[] = [];
        data.map((value: any, index: any) => {
            if (data[index].name) {
                if (names.indexOf(data[index].name) === -1)
                    names.push(data[index].name)
            }
        })
        return names;
    }

    let detectedSymptoms = getDetectedSymptoms();

    const getDetectedSymptomsDescriptions = () => {
        const descriptions: string[] = [];
        for (let i = 0; i < detectedSymptoms.length; i++) {
            if ( detectedSymptoms[i] === "PCBlackbark") {
                const symptom = symptoms.find(s => s.name === "Discoloration");
                if (symptom) {
                    descriptions.push(symptom.description);
                }
            }
        }
        return descriptions;
    }
    let detectedSymptomsDescriptions = getDetectedSymptomsDescriptions();
    
    const getAverageConfidence = () => {
        const averageConfidence: any[] = [];
        for (let i = 0; i < detectedSymptoms.length; i++) {
            let sum = 0;
            let count = 0;
            for (let j = 0; j < data.length; j++) {
                if (data[j].name === detectedSymptoms[i]) {
                    sum += data[j].confidence;
                    count++;
                }
            }
            averageConfidence.push(sum / count);
        }
        return averageConfidence;
    }
    
    let averageConfidence = getAverageConfidence();

  return (
    <Card twStyles = "my-2">
        <Card twStyles = "my-2">
            <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                Detections
            </Text>
            <Card twStyles = {`mt-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
                { data.map((value: any, index: any) => (
                    <Card 
                        twStyles = "my-2"
                        key = { index }
                    >
                        <Card twStyles = "flex flex-row justify-between items-center">
                            <Text twStyles = {`text-lg ${theme === "dark" ? "darkText" : "lightText"}`}>
                                { value.name !== "NoDisease" ? value.name.slice(2) : "NoDisease"}
                            </Text>
                            <Text twStyles = {`text-lg ${theme === "dark" ? "darkText" : "lightText"}`}>
                                { Math.min(value.confidence * 100).toFixed(2) }%
                            </Text>
                        </Card>
                        <ProgressBar
                            progress = { parseInt(Math.min(value.confidence * 100).toFixed(2)) / 100 || 0} 
                            style={{ height: 15, borderRadius: 7 }}
                        />
                    </Card>
                ))}
            </Card>
        </Card>
        <Card twStyles = "my-2">
            <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                Average Confidence
            </Text>
            <Card twStyles = {`mt-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
                { averageConfidence.map((value: any, index: any ) => (
                    <Card
                        twStyles = "my-2" 
                        key = { index }
                    >
                            <Card twStyles = "flex flex-row justify-between items-center">
                                <Text 
                                    twStyles = {`text-lg ${theme === "dark" ? "darkText" : "lightText"}`}
                                >
                                    { detectedSymptoms[index] !== "NoDisease" ? detectedSymptoms[index].slice(2) : "NoDisease"}
                                </Text>
                                <Text twStyles = {`text-lg ${theme === "dark" ? "darkText" : "lightText"}`}>
                                    { Math.min(value * 100).toFixed(2) }%
                                </Text>
                            </Card>
                            <ProgressBar
                                progress = { parseInt(Math.min(value * 100).toFixed(2)) / 100 || 0 } 
                                style={[ tw `text-green-500`, { height: 15, borderRadius: 7 }]}
                                
                            />
                    </Card>
                ))}
            </Card>
        </Card>
        <Card twStyles = "my-2">
            <>
               { detectedSymptoms[0] !== "NoDisease" ?
                    <Card>
                        <Card twStyles = "my-2">
                            <Text twStyles={`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                                Related Info
                            </Text> 
                            <Card twStyles = {`my-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
                                { detectedSymptoms.map((value: any, index: any ) => (
                                    <Card key = { index }>
                                        { detectedSymptoms[index] !== "NoDisease" ?
                                            <Card>
                                                <Text twStyles = {`text-lg font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                                                    { index + 1}. { detectedSymptoms[index].slice(2) === "Blackbark" ? "Black bark (Discoloration)" : detectedSymptoms[index] }
                                                </Text>
                                                <Text twStyles = {`text-justify ${theme === "dark" ? "darkText" : "lightText"}`}>
                                                    - { detectedSymptomsDescriptions[index] }
                                                </Text>
                                            </Card>
                                        :
                                            null
                                        }
                                    </Card>
                                ))}
                            </Card>
                        </Card>
                        <Card twStyles = "my-2">
                            <Text twStyles = {`text-xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                                Possible Treatment
                            </Text>
                            <TreatmentImage 
                                data = { treatment[0].image_uri }
                            />
                            <Card twStyles = {`my-2 rounded-2xl p-4 ${theme === "dark" ? "darkSecondaryBG": "lightSecondaryBG"}`}>
                                { treatment.map((value:any, index:any) => (
                                    <Card key = { index }>
                                        <Card>
                                            <Text twStyles = {`text-lg font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                                                { treatment[index].name }
                                            </Text>
                                            <Text twStyles = {`text-justify ${theme === "dark" ? "darkText" : "lightText"}`}>
                                                { treatment[index].description }
                                            </Text>
                                        </Card>
                                    </Card>
                                ))}
                            </Card>
                        </Card>
                    </Card>
                    
                : 
                    <Card twStyles = "my-2">
                        <Text twStyles = {`text-center text-3xl font-bold ${theme === "dark" ? "darkText" : "lightText"}`}>
                            No disease detected :D
                        </Text>
                    </Card>
                }

            </>
        </Card>
    </Card>
  )
}

export default ResultsData;