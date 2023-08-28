import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addData, deleteItem } from '../../features/items';
import { TextInput, Button, Avatar, Card, IconButton } from 'react-native-paper';

const ReduxOperations = () => {
    const data = useSelector(state => state.ItemCard.value)
    const dispatch = useDispatch();
    const [text, setText] = React.useState("");

    const AddItem = () => {
        const val = {"title": text};
        dispatch(addData(val));
        setText("");
    }

    const DeleteItem = (idx) => {
        dispatch(deleteItem(idx));
    }

    return (
        <View style={styles.container}>
            <View style={{marginTop: 10}}>
                <TextInput
                    label="Enter taks here."
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Button style={{ marginTop: 20, marginBottom: 50 }} mode="contained" onPress={AddItem}>
                    Add Task
                </Button>
            </View>

            <ScrollView>
                {data.length === 0 && <Text style={{textAlign: 'center'}}>I have created similar to todo list using redux toolkit. You can add the tasks and delete them</Text>} 
                {data.map((item, index) => (
                    <Card.Title
                        style={{backgroundColor: 'grey', borderRadius: 10, marginVertical: 5}}
                        key={index} 
                        titleStyle={{ color: 'white' }}
                        title={item.title}
                        left={(props) => <Avatar.Icon {...props} icon="chevron-right" />}
                        right={(props) => <IconButton iconColor='red' {...props} icon="delete" onPress={() => DeleteItem(index)} />}
                    />
                ))}
            </ScrollView>

            {/* <Text onPress={() => console.log(list)}>ReduxOperations</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2c3e50',
    },
});

export default ReduxOperations;
