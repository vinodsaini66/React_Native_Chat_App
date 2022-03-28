import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TopNav from '../../navigation/TopNav';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg from 'react-native-svg';
import SearchBar from '../../components/SearchBar';

import Loader from '../../components/Loader';
const Users = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allfriends, setAllFriends] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

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
      console.log(e)
    }
  }

  useEffect(() => {
    userList();

  }, []);

  useEffect(() => {
    userList();

  }, [searchVisible])
  /* const fridends = [{
     img: require('../../../assets/my_coach_static.png'),
     name: 'My Coach',
     message: 'this prop will get passed to the screen components',
     time: '7:21 PM',
 
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Steps',
     time: '7:21 PM',
     message: 'Define this callback without ever invoking'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Tasks',
     time: '7:21 PM',
     message: 'Pass down extra options to child screens and navigation options'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Mood',
     time: '7:21 PM',
     message: 'Pass down extra options to child screens and navigation options'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Test',
     time: '7:21 PM',
     message: 'Pass down extra options to child screens and navigation options'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Test 2',
     time: '7:21 PM',
     message: 'Pass down extra options to child screens and navigation options'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Test 3',
     time: '7:21 PM',
     message: 'Pass down extra options to child screens and navigation options'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Test 4',
     time: '7:21 PM',
     message: '#afc54f'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Test 5',
     time: '7:21 PM',
     message: '#afc54f'
   }, {
     img: require('../../../assets/my_coach_static.png'),
     name: 'Test 6',
     time: '7:21 PM',
     message: '#afc54f'
   }] */

  const RightIcon = (props) => {

    return (
      <><TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
        <Icon {...props} name='search-outline' fill='red' />
      </TouchableOpacity>

      </>

    )
  }

  const BackIcon = (props) => (
    <Text style={{ fontSize: 15, color: 'red' }} >Edit</Text>
  );
  const navigateBack = () => {
    console.log('go to Scratch');
    navigation.navigate('ScratchCardTest');
  };

  const navigateRight = () => {
    setSearchVisible(!searchVisible);
  };
  return (
    <>
      {isLoading ? <Loader /> :

        <View style={{ backgroundColor: 'white', flex: 1 }}>

          {searchVisible ?
            <SearchBar handler={searchHandler} toggle={navigateRight} /> :
            <TopNav
              title='Messages'
              leftIcon={BackIcon}
              leftAction={navigateBack}
              rigtIcon={RightIcon}
              navigation={navigation}

            />
          }

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.email}
            data={friends}
            renderItem={({ item }) => {
              return (
                <UserBox
                  title={item.name}
                  image={item.image}
                  message={item.phone}
                  time={moment(item.time).startOf('day').fromNow()}
                  email={item.email}
                  navigation={navigation}
                />
              );
            }}
          />

        </View>}

    </>
  )
}


const UserBox = (props) => {
  const { title, image, message, navigation, time, email } = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Message', { title: title, email: email })}>
      <View style={{
        flexDirection: 'row', backgroundColor: 'white',
        padding: 5, alignItems: 'center',
        height: 90,
        marginLeft: 5
      }}>

        <View style={{
          width: 50,
          height: 51,
          borderRadius: 25,
          backgroundColor: '#d70546',
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title[0].toUpperCase()}</Text>
        </View>



        {message === '9874569807' ? <View style={{
          backgroundColor: 'green', height: 10, width: 10,
          borderRadius: 5, justifyContent: 'flex-end', alignItems: 'flex-end'
          , marginTop: 32, marginLeft: -12
        }}>

        </View> : <></>}


        <View style={{
          flex: 1,
          marginLeft: message === '9874569807' ? 18 : 15
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title} </Text>
          <Text numberOfLines={1} style={{ marginRight: 10, color: '#CCCCCC' }}>{message} </Text>
        </View>

        <Text style={{ marginRight: 7, color: '#CCCCCC' }}>{time}</Text>

      </View>
    </TouchableOpacity>
  );
}

export default Users;