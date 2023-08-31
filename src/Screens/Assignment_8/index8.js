//import liraries
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {Text, Button} from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';


// create a component
const Youtube = () => {

    const playerRef = useRef();

    const [playing, setPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [volume, setVolume] = useState();                                                                                                 

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const volumefunc = () => {
        playerRef.current.getVolume().then(
            currentVolume => setVolume(currentVolume)
        )
    }

    const increaseVolume = () => {
        if (volume < 100) {
            setVolume(prev => prev + 10);
        }
    } 

    const decreaseVolume = () => {
        if (volume > 0) {
            setVolume(prev => prev - 10);
        }
    }

    return (
        <View style={styles.container}>
            <YoutubePlayer
                ref={playerRef}
                height={300}
                volume={volume}
                mute={mute}
                play={playing}
                onReady={volumefunc}
                videoId={"r5NQecwZs1A"}
                playList={["iMVgvkVJuDI", "jcgM1W6CtqA"]}
                onChangeState={onStateChange}
            />
            <Button mode='contained' style={{marginHorizontal: 10}} onPress={togglePlaying}>{playing ? "pause" : "play"}</Button>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center'}}>
                <Button mode='contained' labelStyle={{fontSize: 20}} style={{marginRight: 10}} onPress={increaseVolume} >+</Button>
                <Text style={{color: 'white', fontSize: 15}}>{volume}</Text>
                <Button mode='contained' labelStyle={{fontSize: 20}} style={{marginLeft: 10}} onPress={decreaseVolume}>-</Button>
            </View>
            <Button mode={mute ? 'outlined' : 'contained'} style={{marginTop: 20, marginHorizontal: 10}} onPress={() => setMute(prev => !prev)}>{mute ? "Unmute" : "Mute"}</Button>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Youtube;
