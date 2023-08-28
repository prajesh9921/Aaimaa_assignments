import React, { useEffect } from 'react'
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const log = console.log;

const Home = ({navigation}) => {

    const data = [
        { title: "Assignment 1", route: 'Assignment_1', status: true },
        { title: "Assignment 4", route: 'Assignment_4', status: true },
        { title: "Assignment 7", route: 'Assignment_7', status: true },
    ]

    const handleNavigate = (status, route) => {
        if (status) {
            navigation.navigate(route);
        } else {
           console.warn("Status is false. Not Ready"); 
        }
    }

    return (
        <FlatList
            style={{padding: 10}}
            data={data}
            keyExtractor={item => item.title}
            numColumns={2}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={{flex: 1}} onPress={() => handleNavigate(item.status, item.route)}>
                        <View style={{flex: 1, borderColor: '#c5c6d0', borderWidth: 1, marginRight: 5, marginBottom: 5, paddingHorizontal: 10, paddingVertical: 20, justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    text: { color: 'black', fontSize: 16, fontWeight: 'bold' },
});

export default Home;