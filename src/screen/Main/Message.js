import { StyleSheet, View, Image, TextInput, TouchableOpacity,Keyboard, ScrollView, Pressable, FlatList, Modal, Button } from 'react-native'
import React, { useRef, useContext, useState, useEffect  } from 'react'
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
    const { chat, setChat, getdata, setUserChatData, userChatData } = useContext(ChatContext);
    const { username } = useContext(LoginContext);
    const Scrollref = useRef();
    const [message, setMessage] = useState('');

    const messageText = useRef();

    /* const getdata = () => {
         const result = chat.filter((message) => {
             return message.senderId == username && message.recvId == email || message.senderId == email && message.recvId == username
         })
         setChatData(result);
     }*/
     
    useEffect(() => {

        getdata(username, email);
        

    }, [chat]);



    const navigateRight = () => {
        alert('hello Info');
    };

    function searchOnEnter() {
        alert('Hello!');
      }
    const sendMessage = () => {
        if (message) {
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
        }


    }

    return (
        <>

            <TopNav
                title={title}
                rigtIcon={(<InfoIcon title={title} email={email} />)}
                leftAction={() => { setUserChatData([]); navigation.goBack(); }}
                navigation={navigation}
            />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={userChatData}
                    keyExtractor={item => item.messageId}
                    ref={Scrollref}
                    onContentSizeChange={() => Scrollref.current.scrollToEnd({ animated: false })}
                    ListFooterComponent={() => <View style={{ height: 12 }}/>}
                    renderItem={({ item }) => {
                        if (item) {
                            if (item.senderId == username) {
                                return (
                                    <Sender
                                        key={item.messageId}
                                        message={item.message}
                                        time={item.timestamp}
                                        title={username}
                                    />
                                );
                            } else {
                                return (
                                    <Receiver
                                        key={item.messageId}
                                        message={item.message}
                                        time={moment(item.timestamp).format('LT')}
                                        title={email}
                                    />
                                )
                            }
                        }
                    }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#E6E6E6' }}>
                        <TextInput                    
                            placeholder='Your Message'
                            style={{
                                color: 'black',
                                marginLeft: 15
                            }}
                           ref={messageText}
                            value={message}
                            onSubmitEditing={(event)=>sendMessage()}
                            onChangeText={(text) => { setMessage(text); /*messageText.current.focus()*/}}
                            onFocus={() => (null)} //scrollViewRef.current.scrollToEnd({ animated: true })}
                        />
                    </View>
                    <View>
                        <LinearGradient
                            colors={['#DA0845', '#EA3F2D']}
                            style={{ flex: 1 }}
                        >
                            <TouchableOpacity style={{
                                flex: 1,
                                paddingHorizontal: 15,
                                paddingVertical:10,
                            }}
                                onPress={() => sendMessage()}>
                                <MaterialCommunityIcons
                                    name="send"
                                    color='white' size={25} />

                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>

        </>


    )
}

export const InfoIcon = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { title, email, color } = props;
    return (
        <>
            <View style={styles.container}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Name : {title}</Text>
                            <Text style={styles.modalText}>Email : {email}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}> Close </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }}>
                <Icon style={styles.icon}
                    name='info-outline'
                    fill={color ? color : 'red'}
                />
            </TouchableOpacity>

        </>

    )
};
const Sender = (props) => {
    const { message, time, title } = props;
    return (
        <View style={{
            alignItems: 'flex-end',
            marginTop: 15
        }}>
            <View style={{
                backgroundColor: '#F8F8F8',
                marginRight:15,
                marginBottom:2,
                maxWidth: 250,
                minWidth: 30,
                minHeight: 10,
                paddingHorizontal:10,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                borderTopRightRadius: 12,
                borderWidth:1,
                borderColor:'#E6E6E6'
            }}>
                <Text style={{
                    padding: 10,
                    color: 'black'
                }}>
                    {message}
                </Text>
            </View>
            <View style={{
                width: 25,
                height: 25,
                borderRadius: 13,
                backgroundColor: '#d70546',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title[0].toUpperCase()}</Text>
            </View>
        </View>
    );
}

const Receiver = (props) => {
    const { message, time, title } = props;
    return (
        <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            maxWidth: 250,
            minWidth: 30,
            minHeight: 10,
            marginTop: 15,

        }}>

            <View style={{
                width: 25,
                height: 25,
                borderRadius: 13,
                marginTop: 15,
                backgroundColor: '#d70546',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title[0].toUpperCase()}</Text>
            </View>
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
        paddingHorizontal:10,
        maxWidth: 250,
        minWidth: 30,
        minHeight: 10,
        marginLeft: 5,
        marginRight: 5,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    time: {

        fontSize: 15,
        fontWeight: '500',
        color: '#CCCCCC'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "red",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginRight: 5
    }


})