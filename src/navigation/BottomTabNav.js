import { View, Text, Image, TouchableOpacity, Keyboard,StatusBar } from 'react-native'
import React, { createRef, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Users from '../screen/Main/Users';
import Group from '../screen/Main/Group';
import New from '../screen/Main/New';
import Home from '../screen/Main/Home';
import Profile from '../screen/Main/Profile';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Button, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Contact from '../screen/Main/Contact';


const Tab = createBottomTabNavigator();

const BottomTabNav = (props) => {
    const { navigation } = props;

    const [isKeyboard, setIsKeyboard] = useState(false);

    useEffect(() => {
        if (isKeyboard) {
            const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
                setIsKeyboard(false);
            });
            return () => {
                hideKeyboard.remove();
            }
        } else {
            const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
                setIsKeyboard(true);
            });
            return () => {
                showKeyboard.remove();
            }
        }
    },[isKeyboard]);
    return (
        <>
         <StatusBar animated={true} backgroundColor="#DA0845" />
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>

                <Tab.Navigator
                    initialRouteName="User"
                    labeled={false}
                    screenOptions={({ route }) => ({
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        style: {
                            borderRadius: 15,
                            height: 90,
                        }
                    })}
                    barStyle={{ backgroundColor: 'white' }}

                >
                    <Tab.Screen
                        name="Users"
                        component={Users}
                        options={{
                            tabBarLabel: '',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="message-text-outline" color={color} size={27} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Group"
                        component={Group}
                        options={{
                            tabBarLabel: 'Group',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="account-group-outline"
                                    color={color} size={30} />
                            ),
                        }}
                    />
                    {!isKeyboard && <Tab.Screen
                        name="New"
                        component={New}
                        options={{
                            tabBarLabel: 'New',
                           // unmountOnBlur:true,
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <LinearGradient
                                        colors={['#DA0845', '#EA3F2D']} style={{
                                            width: 71,
                                            height: 70,
                                            borderRadius: 35,
                                            bottom: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            shadowOpacity: 0.1,
                                            shadowColor: '#00000090',
                                            shadowOffset: { height: 3 }

                                        }}>
                                        <MaterialCommunityIcons name="plus"
                                            color='white' size={27} />

                                    </LinearGradient>
                                )
                            }
                        }}
                    />}
                    
                    <Tab.Screen
                        name="Contact"
                        component={Contact}
                        options={{
                            tabBarLabel: 'Contact',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="format-list-bulleted"
                                    color={color} size={30} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="account-outline"
                                    color={color} size={30} />
                            ),
                        }}
                        listeners={({ navigation }) => ({
                            tabPress: async (e) => {
                               // e.preventDefault();
                               // await AsyncStorage.removeItem('token')
                               /// navigation.navigate('Login');
                            }
                        })}
                    />

                </Tab.Navigator>

            </ApplicationProvider>
            {

                /* <TouchableOpacity
                     onPress={() => navigation.navigate('New')}
                 >
 
                     <View style={{
                         justifyContent: 'center',
                         alignItems: 'center',
                         flex: 1
                     }}>
                         <LinearGradient
                             colors={['#DA0845', '#EA3F2D']} style={{
                                 width: 70,
                                 height: 70,
                                 borderRadius: 35,
                                 backgroundColor: 'white',
                                 backgroundColor: 'green',
                                 position: 'absolute',
                                 bottom: 15,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 flex: 1,
                             }}>
                             <MaterialCommunityIcons name="plus" color='white' size={27} />
 
                         </LinearGradient>
                     </View>
                 </TouchableOpacity>
                 */

            }
        </>

    );
}

export default BottomTabNav;