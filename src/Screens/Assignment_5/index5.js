//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {Text, Button} from "react-native-paper";

const hardyBoys = { uri: 'https://firebasestorage.googleapis.com/v0/b/aaimaa-528ff.appspot.com/o/001_the_tower_treasure.pdf?alt=media&token=847cae46-b65b-42ef-9877-a097d80de219', cache: true };
const python = { uri: 'https://firebasestorage.googleapis.com/v0/b/aaimaa-528ff.appspot.com/o/Al%20Sweigart%20-%20Automate%20the%20Boring%20Stuff%20with%20Python.pdf?alt=media&token=65d0e41e-6d38-4600-8b1f-632e984c3896', cache: true };
const local = { uri: "bundle-assets://Prajesh_Gawhale_Resume.pdf", cache: true };

const PDFReader = ({navigation}) => {


    return (
        <View style={styles.container}>
            <Text>In this assignment I have used firebasae to host the PDF's and use those link to open the pdf into the react native</Text>
            <Button mode="contained" style={{marginTop: 20}} onPress={() => navigation.navigate('pdf', {source: hardyBoys})}>
                Open Hardy Boys PDF
            </Button>
            <Button mode="contained" style={{marginTop: 30}} onPress={() => navigation.navigate('pdf', {source: python})}>
                Open Boaring stuff with python pdf
            </Button>
            {/* <Button mode="contained" style={{marginTop: 30}} onPress={() => navigation.navigate('pdf', {source: local})}>
                Open Local pdf
            </Button> */}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
    },
});

//make this component available to the app
export default PDFReader;
