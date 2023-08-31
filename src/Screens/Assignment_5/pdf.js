//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native';
import Pdf from 'react-native-pdf';

// const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/aaimaa-528ff.appspot.com/o/001_the_tower_treasure.pdf?alt=media&token=847cae46-b65b-42ef-9877-a097d80de219', cache: true };
// const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };


const PDF = ({ navigation , route}) => {

    const {source} = route.params;

    return (
        <View style={styles.container}> 
            {/* <View style={{backgroundColor: 'grey', height: 50}}>

            </View> */}
            <Pdf
                source={source}
                trustAllCerts={false}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                renderActivityIndicator={(progress) => <ActivityIndicator size={24} color='white'/>}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error.message);
                    navigation.pop();
                    ToastAndroid.show('Unable to load the pdf!', ToastAndroid.SHORT);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: 'grey'
    }
});

//make this component available to the app
export default PDF;
