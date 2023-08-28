import React, { useState, useEffect } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import notifee, { AndroidStyle, TimestampTrigger, TriggerType, EventType } from '@notifee/react-native';
import { Button } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const log = console.log;
const serverKey = "AAAALPLTcZA:APA91bHTE-haLSfLfnlejT7ellnp_puDJJixEIbFcg0ZNi4c1MPuVQM2YPPmiiNkcLQbQeocSbb6dYavtzlMCO3K8Q2yJUThgBrDJqnMdwQxXk5i8TLuMG-pP7dpjjBkQbHw68Uz6PoD</Text>"
const deviceToken = "dOV_qEHHTFKWcLNGH2xZva:APA91bG64NHRHFSL98kUJrnL__OhO25DmHGEU6-rCUzN_xCNr9JwanYR7YT68r6-iJyQf2oOBIAo41JMuOsOfuaSxG7Ukjm0dHujhkcHf6DIYR1CK4cXDFdpVv7Ovf28E1MU4D98BWRA"

const Notification = ({navigation}) => {
    const [showTimer, setShowTimer] = useState(false);
    const [Link, setLink] = useState();

    async function onDisplayNotification() {
        await notifee.requestPermission()

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: 'Beutiful Sunflower Notification',
            body: '20+ Sunflower Pictures | Download Free Images on Unsplash',
            android: {
                channelId,
                timestamp: Date.now(),
                showTimestamp: true,
                style: { type: AndroidStyle.BIGPICTURE, picture: 'https://images.unsplash.com/photo-1595126739121-68ab4225f9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80' },
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    async function onCreateTriggerNotification() {
        setShowTimer(true);
        const date = new Date(Date.now());
        const c_hour = date.getHours();
        const c_minute = date.getMinutes();
        // date.setHours(c_hour);
        // date.setMinutes(date.getMinutes() + 1);
        date.setSeconds(date.getSeconds() + 30);

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
            // repeatFrequency: RepeatFrequency.NONE
        };

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.createTriggerNotification(
            {
                title: 'Meeting with Prajesh',
                body: `Today at ${c_hour} : ${c_minute} ${c_hour > 12 ? 'pm' : 'am'}`,
                android: {
                    channelId,
                    timestamp: Date.now(),
                    showTimestamp: true,
                },
            },
            trigger,
        );
    }

    async function getDeviceToken() {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log(token);
    }

    async function fcmNotification(title, body) {
        await notifee.requestPermission()
        console.log(title, body);
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: title ?? 'Beutiful Sunflower Notification',
            body: body ?? '20+ Sunflower Pictures | Download Free Images on Unsplash',
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
                timestamp: Date.now(),
                showTimestamp: true,
                // style: { type: AndroidStyle.BIGPICTURE, picture: 'https://images.unsplash.com/photo-1595126739121-68ab4225f9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80' },
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    async function buildLink() {
        const link = await dynamicLinks().buildLink({
          link: 'https://invertase.io/demo',
          domainUriPrefix: 'https://aaimaa.page.link',
          // optional setup which updates Firebase analytics campaign
          // "banner". This also needs setting up before hand
          analytics: {
            campaign: 'banner',
          },
        });
      
        // return link;
        setLink(link);
        console.log(link);
    }

    const handleDynamicLink = link => {
        if (link.url === 'https://invertase.io/demo') {
            console.log(link);
            navigation.navigate('demo');
        }
    };
      
    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         const res = remoteMessage.notification;
    //         console.log(res);
    //         // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));'
            // fcmNotification(res?.title, res?.body);
    //     });

    //     return unsubscribe;
    // }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const res = remoteMessage.notification;
            console.log(res);
            fcmNotification(res?.title, res?.body);

            return notifee.onForegroundEvent(({ type, detail }) => {
                switch (type) {
                  case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                  case EventType.PRESS:
                    const link = res.android.clickAction
                    console.log('User pressed notification', link);

                    if (link) {
                        try {
                          Linking.openURL(link);
                        } catch (error) {
                          console.error('Error opening deep link:', error);
                    }}
                    break;
                }
              });
        });

        return unsubscribe;
    }, []);

    const copyToClipboard = (value) => {
        // Clipboard.setString(value);
        ToastAndroid.show('Text copied to clipboard!', ToastAndroid.SHORT);
    };

    return (
        <View style={{ padding: 10 }}>
            <Button mode="contained-tonal" buttonColor='#5C6798' textColor='white' onPress={() => onDisplayNotification()}>
                Send Notification - notifee
            </Button>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                {showTimer && <CountdownCircleTimer
                    isPlaying={showTimer}
                    size={100}
                    duration={30}
                    strokeWidth={2}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    onComplete={() => setShowTimer(false)}
                >
                    {({ remainingTime }) => <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Notification</Text>
                        <Text style={{ color: 'black' }}>in</Text>
                        <Text style={{ color: 'black', fontSize: 20 }}>{remainingTime}</Text>
                    </View>
                    }
                </CountdownCircleTimer>
                }
                <Button style={{ marginTop: 10, width: "100%" }} mode="contained-tonal" buttonColor='#5C6798' textColor='white' onPress={() => onCreateTriggerNotification()}>
                    Send Scheduled Notification - notifee
                </Button>
            </View>

            <View>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black', marginTop: 50}}>Generate Dynamic Link:</Text>
                <Button style={{ marginTop: 10, width: "100%", marginRight: 5 }} mode="contained-tonal" buttonColor='#5C6798' textColor='white' onPress={() => buildLink()}>
                    Generate deep link
                </Button>
                <Text style={{color: 'black', marginTop: 5}}>{Link}</Text>
                <Button style={{ marginTop: 10, width: '100%'}} mode="contained-tonal" buttonColor='#5C6798' textColor='white' onPress={() => onCreateTriggerNotification()}>
                    Copy link
                </Button>
            </View>

            <Text style={{color: 'black',  marginVertical: 10}}>Long press to copy the text </Text>
            <Text style={{color: 'black', marginVertical: 10}}>To test FCM used this website: https://testfcm.com/</Text>
            <Text onPress={() => copyToClipboard(serverKey)} style={{color: 'black',  marginVertical: 10}}>server Key: {serverKey}</Text>
            <Text onPress={() => copyToClipboard(deviceToken)} style={{color: 'black',  marginVertical: 10}}>Device Token: {deviceToken}</Text>
            {/* DEBUG */}
            {/* <Text
            {/* <Text
                style={{ color: 'black', fontSize: 16, marginTop: 20 }}
                onPress={() => getDeviceToken()}
            >
                press me
            </Text> */}
        </View>
    );
}

export default Notification;