/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
import React, { createRef, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screen/Auth/Login';
import SignUp from './src/screen/Auth/SignUp';
import Home from './src/screen/Main/Home';
import Users from './src/screen/Main/Users';
import LoginContext from './src/context/LoginContext';
import BottomTabNav from './src/navigation/BottomTabNav';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Message from './src/screen/Main/Message';
import { SafeAreaView, StatusBar } from 'react-native';

import { ChatProvider } from './src/context/ChatContext';
import GetApi from './src/testScreen/GetApi';
import PostApi from './src/testScreen/PostApi';
import Fullscreen from './src/screen/Main/Fullscreen';
import AnimationTest from './src/screen/Main/AnimationTest';
import Assessment from './src/screen/Main/Assessment';
import Result from './src/screen/Main/Result';
import SortList from './src/screen/Main/SortList';
import ReactAnimation from './src/screen/Main/ReactAnimation';
import ScratchCard from './src/screen/Main/ScratchCard';
import ScratchCardTest from './src/screen/Main/ScratchCard';
import AddPhone from './src/screen/Auth/AddPhone';
import Otp from './src/screen/Auth/Otp';
import ModelUI from './src/testScreen/ModelUI';
import BottomSheetExmple from './src/screen/Main/BottomSheet';

const Stack = createNativeStackNavigator();
const App = () => {
  const navigation = createRef();
  const [isLogin, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [UName, setUName] = useState('');



  return (
    <>
      <StatusBar animated={true} backgroundColor="#DA0845" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer ref={navigation}>
            <LoginContext.Provider value={{ isLogin, setLogin, username, setUsername, UName, setUName }}>
              <ChatProvider>
                <Stack.Navigator
                  initialRouteName='Login'
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#f4511e',
                    },
                    headerShown: false,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    animationTypeForReplace:'push',
                    animation:'slide_from_left'
                  }}>
                  <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='SignUp'
                    component={SignUp}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='Tab'
                    component={BottomTabNav}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='Message'
                    component={Message}
                    options={{
                      headerShown: false
                    }}
                  />
                  {/* Use for expamle to test  */}


                  <Stack.Screen
                    name='GetApi'
                    component={GetApi}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='PostApi'
                    component={PostApi}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='Fullscrren'
                    component={Fullscreen}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='Animated'
                    component={AnimationTest}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='Assessment'
                    component={Assessment}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='Result'
                    component={Result}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='SortList'
                    component={SortList}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='ReactAnimation'
                    component={ReactAnimation}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='ScratchCardTest'
                    component={ScratchCardTest}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='Phone'
                    component={AddPhone}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='Otp'
                    component={Otp}
                    options={{
                      headerShown: false
                    }}
                  />

                  <Stack.Screen
                    name='ModelUI'
                    component={ModelUI}
                  />

                  <Stack.Screen
                    name='BottomSheet'
                    component={BottomSheetExmple}
                  />
                </Stack.Navigator>


              </ChatProvider>
            </LoginContext.Provider>
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaView></>

  );
};



export default App;
