import React, { useCallback, useContext, useState } from "react";
import  { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationType } from "../types";
import { GlobalContext } from "../context/Global";
import moment from "moment";
import { BASE_URL } from "../constants";
import { sortResultsData } from "../utils/sortResultsData";
import { useDetectImageMutation } from "../redux/services/detectService";

const useDiseaseDetection = () => {
    const navigation = useNavigation<StackNavigationType>();
    const { dispatch, user_id } = useContext(GlobalContext);
    const [ detectImage ] = useDetectImageMutation();
    const imageOptions = {
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
        base64: true
    }

    const uploadImage = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted")
            return Alert.alert("Permission denied!");
        
        const photo =  await ImagePicker.launchImageLibraryAsync(imageOptions);
        handleSubmit(photo);
    }, []);

    const captureImage = useCallback(async() => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted")
            return Alert.alert("Permission denied!");
        
        const photo =  await ImagePicker.launchCameraAsync(imageOptions);
        handleSubmit(photo);
    }, [])

    const handleSubmit = async (value:ImagePicker.ImagePickerResult ) => {
        if (!value.canceled) {
            const formData = new FormData();
            const fileUri = value.assets[0].uri;
            const fileName = value.assets[0].uri.substring(value.assets[0].uri.lastIndexOf('/') + 1, value.assets[0].uri.length);
            const fileType = value.assets[0].type + "/" + fileName.substring(fileName.lastIndexOf('.') + 1);
            
            formData.append("image", JSON.parse(JSON.stringify({
              uri: fileUri,
              type: fileType,
              name: fileName
            })));

            formData.append("timestamp", moment().unix().toString());
            formData.append("user_id", user_id);
            navigation.navigate("Loading");
            try {
                const data = await detectImage({ user_id: user_id, formData: formData}).unwrap();
                const id = Object.keys(data);
                const results = sortResultsData(Object.values(data));
                navigation.replace("Results", { 
                    data: results,
                    id: id[0]
                });
            } catch (err) {
                Alert.alert("Error", "Something went wrong!");
                navigation.goBack();
            }

        }
    };

    return { uploadImage, captureImage }
}

export default useDiseaseDetection;
