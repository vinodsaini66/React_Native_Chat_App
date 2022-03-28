import {
  View, Text, TouchableOpacity, Switch,
  Image, StyleSheet, ScrollView,  Alert, Linking
} from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Icon, IconRegistry } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext from '../../context/LoginContext';

const supportedURL = "https://play.google.com/store/apps/details?id=com.example.android";

const unsupportedURL = "slack://open?team=123456";

const Profile = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { username, UName } = useContext(LoginContext);


  // Custom Back Press Handler 
 /** 
  * useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  */ 

  // End Custom Back Handler

 
  // Deep Linking

 
  const OpenURLButton = ({ url, children }) => {
    
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginLeft: 15
        }}
        onPress={handlePress}
      >
        <Text style={{ fontSize: 15, color: 'white' }}>{children}</Text>
      </TouchableOpacity>
    );
    
  };

  ///

  // const Edit = () => {
  //   return (
  //     <OpenURLButton url={supportedURL}>Edit</OpenURLButton>
  //   );
  // }

  const Edit = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginLeft: 15
        }}
        onPress={() => navigation.navigate('Phone')}
      >
        <Text style={{ fontSize: 15, color: 'white' }}>Edit</Text>
      </TouchableOpacity>
    );
  } 

  const Logout = () => {
    return (
      <TouchableOpacity style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 15
      }}
        onPress={async () => {

          await AsyncStorage.removeItem('token')
          navigation.navigate('Login');
        }}>
        <Icon style={{ width: 22, height: 22 }}
          name='power-outline' fill='white' />
      </TouchableOpacity>
    );
  }

  const List = (props) => {
    const { title, value } = props;
    const [textColor, setTextColor] = useState(false);
    return (
      <TouchableOpacity style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 53,
        borderWidth: 0.1,
        borderBottomColor: '#CCCCCC'
      }}
        onPress={() => setTextColor(!textColor)}
      >
        <Text style={{
          color: textColor ? 'red' : 'black',
          fontSize: 16,
          fontWeight: '400'
        }}>{title ? title : ''}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: '#CCCCCC',
            fontSize: 14,
            fontWeight: '600', marginRight: 5
          }}>
            {value ? value : ''}
          </Text>
          <Icon style={{ width: 22, height: 22 }}
            name='arrow-ios-forward-outline'
            fill='#CCCCCC'
          /></View>


      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#DA0845', '#E93E2C']}
        style={{ flex: 1.5 }}
      >
        <View style={{
          flexDirection: 'row',
          marginVertical: 15
        }}>
          <Edit />
          <Logout />
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image
            source={require('../../../assets/my_coach_static.png')}
            style={styles.userImage}
            resizeMode='cover'
          />
          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 5
          }}>{UName}</Text>
          <Text style={{
            color: '#F6B3B0',
            fontSize: 12,
            textAlign: 'center',
            fontWeight: '600',
            marginLeft: 15,
            marginRight: 15

          }}>Note that some props are only available with multiline=. to only one side of the element</Text>
        </View>



      </LinearGradient>
      <View style={{ flex: 2, backgroundColor: 'white' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <List title='Email address' value='vinod@gmail.com' />
          <List title='Telephone' value='8233 639160' />

          <View style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 55,
            borderWidth: 0.1,
            borderBottomColor: '#CCCCCC'
          }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Animated')}> 
            <Text style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '400',
              marginLeft: -5
            }}> Notification</Text>
            </TouchableOpacity>

            <Switch
              trackColor={{ false: "#767577", true: "#E93E2C" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <List title='Settings' />
          <List title='Feedback' />
          <List title='Get help' />
          <List title='Delete account' />

        </ScrollView>
      </View>
    </View>
  )
}

export default Profile;
const styles = StyleSheet.create({

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 45,
    marginBottom: 15
  }
});