//import liraries
import React, { useState } from 'react';
import { View, ToastAndroid } from "react-native";
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const MMKVstorage = () => {

    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [res, setRes] = useState("");
    const [show, setShow] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    const SaveItem = () => {
        if (!key || !value) {
            return ToastAndroid.show('Key or value must be empty!', ToastAndroid.SHORT);
        } 
        try {
            storage.set(key, value)
            console.log("saved");
            setSnackMessage('Key/Value saved successfully');
            setShow(true);
        } catch (error) {
            setSnackMessage("Unable to save");
            setShow(true);
        }
    };

    const GetItem = () => {
        if (!searchKey) {
            return ToastAndroid.show('Enter key to search!', ToastAndroid.SHORT);
        }
        try {
            const result = storage.getString(searchKey);
            console.log("res is:", result);
            if (!result) {
                setSnackMessage("Unable to get key. Please enter a valid key");
                setShow(true);
            } else {
                setRes(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteItem = () => {
        if (!key) {
            return ToastAndroid.show('Enter key to delete!', ToastAndroid.SHORT);
        }    
        const hasKey = storage.contains(key)
        if (hasKey) {
            storage.delete(key);
            console.log("item deleted");
            setSnackMessage("Key named " + key + " deleted successfully.");
            setShow(true);
        } else {
            setSnackMessage("Enter valid key to delete.");
            setShow(true);
        }
        const keys = storage.getAllKeys()
        console.log("ALL:", keys);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text variant='titleLarge'>Save a key/value</Text>
            <TextInput label="Key" value={key} onChangeText={text => setKey(text)} mode='outlined' style={{ width: '100%', marginTop: 10 }} />
            <TextInput label="Value" value={value} onChangeText={text => setValue(text)} mode='outlined' style={{ width: '100%' }} />
            <Button mode="contained" onPress={SaveItem} style={{ width: '100%', marginTop: 15 }}>
                Save
            </Button>
            
            <Text variant="bodySmall" style={{alignSelf: 'flex-start', marginTop: 10, marginBottom: 5}}>Enter valid key in the textInput named "Key" to remove the key/value.</Text>
            <Button mode="outlined" onPress={DeleteItem} style={{ width: '100%' }}>
                Remove
            </Button>

            <Text variant='titleLarge' style={{ marginTop: 50 }}>Enter your key</Text>
            <TextInput label="Enter Key" value={searchKey} onChangeText={text => setSearchKey(text)} mode='outlined' style={{ width: '100%', marginTop: 10 }} />
            <Button mode="contained" onPress={GetItem} style={{ width: '100%', marginTop: 15 }}>
                Get Key
            </Button>

            <Text variant='titleLarge' style={{ marginTop: 30, marginBottom: 20 }}>Result shown below</Text>
            <Text variant='titleSmall' style={{ marginTop: 30, marginBottom: 20 }}>{res}</Text>

            <Snackbar
                visible={show}
                onDismiss={() => setShow(false)}
                action={{
                    label: 'close',
                    onPress: () => {
                        setShow(false);
                    },
                }}>
                {snackMessage ?? "Smoething went wrong!"}
            </Snackbar>
        </View>
    );
};

export default MMKVstorage;
