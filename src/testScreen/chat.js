import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useRef, useContext, useState, useEffect } from 'react'
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TopNav from '../../navigation/TopNav';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';

import ChatContext from '../../context/ChatContext';
import LoginContext from '../../context/LoginContext';

import moment from 'moment';
export default function Message({ navigation, route }) {

    const { title, email } = route.params;
    const { chat, setChat } = useContext(ChatContext);
    const { username } = useContext(LoginContext);
    const scrollViewRef = useRef();
    const [message, setMessage] = useState('');
    console.log(chat);
    const RightIcon = (props) => (
        <Icon name='info-outline' fill='red' {...props} />
    );

    const navigateRight = () => {
        alert('hello Info');
    };
    useEffect(() => {

    }, [chat]);
    const sendMessage = () => {
        let messageSenderObj = {
            senderId: username,
            recvId: email,
            chatId: Math.floor((Math.random() * 10000) + 1),
            messageId: Math.floor((Math.random() * 10000) + 1),
            message: message,
            timestamp: moment().format()
        }
        let messageRecvObj =
        {
            senderId: email,
            recvId: username,
            chatId: Math.floor((Math.random() * 10000) + 1),
            messageId: Math.floor((Math.random() * 10000) + 1),
            message: message,
            timestamp: moment().format()
        }
        setMessage('')
        setChat((prevState) => ([...prevState, messageSenderObj, messageRecvObj]));
        console.log(messageSenderObj);
    }

    return (
        <>

            <TopNav
                title={title}
                rigtIcon={RightIcon}
                rightAction={navigateRight}
                navigation={navigation}
            />
            <View style={{ flex: 1,backgroundColor:'white' }}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    showsVerticalScrollIndicator={false}

                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={{ backgroundColor: 'white', flex: 1 }}>
                            {chat.map((item) => {
                                console.log(item);
                                if (item) {
                                    if (item.senderId == username && item.recvId==email) {
                                        return (
                                            <>
                                                <Sender
                                                    key={item.messageId}
                                                    message={item.message}
                                                    time={item.timestamp}
                                                />

                                            </>
                                        );
                                    } else if(item.senderId == email && item.recvId==username) {
                                        return (
                                            <Receiver
                                                key={item.messageId}
                                                message={item.message}
                                                time={moment(item.timestamp).format('LT')}
                                            />
                                        )
                                    }
                                }

                            })}

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 10,backgroundColor:'#E6E6E6' }}>
                        <TextInput
                            placeholder='Your Message'
                            style={{
                                color: 'black',
                                marginLeft: 15
                            }}
                            value={message}
                            onChangeText={(text) => { setMessage(text); }}
                            onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                        />
                    </View>
                    <View>
                        <LinearGradient
                            colors={['#DA0845', '#EA3F2D']}
                            style={{ flex: 1 }}
                        >
                            <TouchableOpacity style={{
                                flex: 1,
                                padding: 15
                            }}
                                onPress={() => sendMessage()}>
                                <MaterialCommunityIcons
                                    name="send"
                                    color='white' size={47} />

                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>

        </>


    )
}

const Sender = (props) => {
    const { message, time } = props;
    return (
        <View style={{
            alignItems: 'flex-end',
            marginTop: 15

        }}>
            <View style={{
                backgroundColor: '#F8F8F8',
                maxWidth: 250,
                minWidth: 30,
                minHeight: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderTopRightRadius: 15
            }}>
                <Text style={{
                    padding: 10,
                    color: 'black'
                }}>
                    {message}
                </Text>
            </View>
            <Image
                style={{
                    width: 25, height: 25,
                    borderRadius: 15
                }}
                source={require('../../../assets/my_coach_static.png')}
            />
        </View>
    );
}

const Receiver = (props) => {
    const { message, time } = props;
    return (
        <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            maxWidth: 250,
            minWidth: 30,
            minHeight: 10,
            marginTop: 15,

        }}>
            <Image
                style={{
                    width: 25,
                    height: 25,
                    borderRadius: 13,
                    marginTop: 15
                }}
                source={require('../../../assets/my_coach_static.png')}
            />
            <LinearGradient
                colors={['#DA0845', '#EA3F2D']}
                style={styles.linearGradient}
            >
                <Text style={{ padding: 10, color: 'white' }}>{message}</Text>

            </LinearGradient>

            <Text styles={styles.time}>
                {time}
            </Text>


        </View>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        maxWidth: 250,
        minWidth: 30,
        minHeight: 10,
        marginLeft: 5,
        marginRight: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15
    },
    time: {

        fontSize: 15,
        fontWeight: '500',
        color: '#CCCCCC'
    }
})