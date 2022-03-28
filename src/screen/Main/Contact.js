import {
    View, Text, TouchableOpacity, TextInput, FlatList,
    StyleSheet, Modal, Pressable, ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import TopNav from '../../navigation/TopNav'
import { Icon, Spinner } from '@ui-kitten/components';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { InfoIcon } from './Message';
import UseDebounce from '../../helper/UseDebounce';

const Contact = ({ navigation }) => {
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allfriends, setAllFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = UseDebounce(searchTerm, 100);

    const searchHandler = (text) => {
        if (text) {
            const result = allfriends.filter((userData) => userData.name.toLowerCase().includes(text.toLowerCase()));
            setFriends(result);
        } else {
            setFriends(allfriends);
        }
    }

    const userList = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                let getUserString = await AsyncStorage.getItem('users');
                if (getUserString) {
                    let getUser = JSON.parse(getUserString);
                    const result = getUser.filter((userData) => userData.email != token);
                    setFriends(result);
                    setAllFriends(result);
                }

                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        userList();
    }, []);

    //Search Debouncing 

    useEffect(() => {
        console.log("serachTerm", searchTerm)
        if (debouncedSearchTerm) {
            searchHandler(searchTerm)
        } else {
            setFriends(allfriends);
        }
    }, [debouncedSearchTerm]);
    const RightIcon = (props) => (

        <Icon {...props} name='plus-outline' fill='red' />

    );
    const BackIcon = (props) => (
        <Text style={{ fontSize: 15, color: 'red' }} >Edit</Text>
    );
    const navigateBack = () => {
        // alert('hello Edit')
        navigation.navigate('SortList');
    };
    const navigateRight = () => {
        // alert('hello Edit')
        navigation.navigate('BottomSheet');
    };
    return (
        <>
            {isLoading ?
                <Loader /> :
                <>
                    <TopNav
                        title='Contacts'
                        leftIcon={BackIcon}
                        leftAction={navigateBack}
                        rigtIcon={RightIcon}
                        rightAction={navigateRight}
                        navigation={navigation}
                    />
                    <SearchBox handler={setSearchTerm} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <Online friends={friends.slice(0, 4)} setFriends={setFriends} navigation={navigation} />
                        <Others friends={friends.slice(4, 10)} setFriends={setFriends} navigation={navigation} />
                    </ScrollView>
                </>
            }

        </>
    )
}


const SearchBox = (props) => {
    const { handler } = props;
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E6E6E6',
        }}>
            <View style={{
                flexDirection: 'row',
                minWidth: 380,
                height: 38,
                backgroundColor: 'white',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15
            }}>
                <Icon style={styles.searchIcon}
                    name='search-outline'
                    fill='#8F9BB3' />
                <TextInput
                    placeholder='Search friends'
                    placeholderTextColor='#E1E1E1'
                    borderRadius={5}
                    onChangeText={(text) => handler(text)}
                    style={{
                        backgroundColor: 'white',
                        minWidth: 200,
                        flex: 1,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#E1E1E1'
                    }}
                />
            </View>

        </View>
    );
}

const Online = (props) => {
    const { friends, setFriends, navigation } = props;
    return (
        <View style={{ backgroundColor: 'white', marginLeft: 7 }}>
            <View style={styles.heddingView}>
                <Text style={styles.hedingText}>Online (</Text>
                <Text style={{ color: 'red', fontSize: 17 }}>{friends.length}</Text>
                <Text style={{ fontSize: 17 }}>)</Text>
            </View>
            {friends.map((item) => {
                return (
                    <ContactDetails
                        title={item.name}
                        image={item.image}
                        message={item.phone}
                        time={moment(item.time).startOf('day').fromNow()}
                        email={item.email}
                        navigation={navigation}
                        isOnline={true}
                        key={item.email}
                    />
                );
            })}
            {/* <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.email}
                data={friends.splice(0, 2)}
                renderItem={({ item }) => {
                    return (
                        <ContactDetails
                            title={item.name}
                            image={item.image}
                            message={item.phone}
                            time={moment(item.time).startOf('day').fromNow()}
                            email={item.email}
                            navigation={navigation}
                            isOnline={true}
                        />
                    );
                }}
            /> */}
        </View>
    );
}

const Others = (props) => {
    const { friends, setFriends, navigation } = props;
    return (
        <View style={{
            backgroundColor: 'white',
            marginLeft: 7,
        }}>
            <View style={styles.heddingView}>
                <Text style={styles.hedingText}>Others</Text>
            </View>
            {friends.map((item) => {
                return (
                    <ContactDetails
                        title={item.name}
                        image={item.image}
                        message={item.phone}
                        time={moment(item.time).startOf('day').fromNow()}
                        email={item.email}
                        navigation={navigation}
                        isOnline={false}
                        key={item.email}
                    />
                );
            })}
            {/*
            <FlatList

                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.email}
                data={friends}
                renderItem={({ item }) => {
                    return (
                        <ContactDetails
                            title={item.name}
                            image={item.image}
                            message={item.phone}
                            time={moment(item.time).startOf('day').fromNow()}
                            email={item.email}
                            navigation={navigation}
                            isOnline={false}
                        />
                    );
                }}
            /> */}
        </View>
    );
}


const ContactDetails = (props) => {
    const { title, image, message, navigation, time, email, isOnline } = props;
    const i = 1;
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            height: 52,
            marginLeft: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#E6E6E6'
        }}>
            <View style={{
                width: 31,
                height: 31,
                borderRadius: 15,
                backgroundColor: '#d70546',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{title[0].toUpperCase()}</Text>
            </View>
            {isOnline && <View style={{
                backgroundColor: 'green', height: 8, width: 8,
                borderRadius: 4, justifyContent: 'flex-end',
                alignItems: 'flex-end'
                , marginTop: 25, marginLeft: -10
            }}>

            </View>}


            <View style={{
                flex: 1,
                marginLeft: isOnline ? 17 : 15
            }}>
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>{title} </Text>

            </View>

            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginRight: 5
            }}>
                <InfoIcon title={title} email={email} color='#8F9BB3' />
                <MessageIcon title={title} email={email} navigation={navigation} />
            </View>

        </View>
    )
}
export default Contact;



const MessageIcon = (props) => {

    const { title, navigation, email } = props;
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Message', { title: title, email: email })}>
                <Icon style={styles.icon} name='message-square-outline' fill='#8F9BB3' />
            </TouchableOpacity>

        </>

    )
};

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginRight: 5
    },
    searchIcon: {
        width: 15,
        height: 18,
        marginLeft: 120
    },
    heddingView: {
        flexDirection: 'row',
        padding: 2,
        paddingBottom: 5,
        borderBottomWidth: 2,
        backgroundColor: '#F8F8F8',
        borderBottomColor: '#E6E6E6'
    },
    hedingText: {
        color: '#8F9BB3',
        fontSize: 17,
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 15,
        marginLeft: 5
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

});