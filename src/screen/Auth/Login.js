import {
    View, Text, StyleSheet, StatusBar,
    TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback,
    Button, Keyboard, KeyboardAvoidingView
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../components/Logo';
import Botton from '../../components/Botton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';


import axios from 'axios'

import LoginContext from '../../context/LoginContext';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const { isLogin, setLogin, username, setUsername, UName, setUName } = useContext(LoginContext);
    const [submitted, setSubmitted] = useState(false);

    const checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
              
                const Name = await AsyncStorage.getItem('name');
                console.log('token : ', token);
                setLogin(true);
                setUsername(token);
                setUName(Name);
                resetAndNavigate(navigation, 'Tab')
                console.log('User account signed in!')
                navigation.navigate('Tab')
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])

    const resetAndNavigate = (navigation, name, params) => {
        navigation.reset({
            index: 0,
            routes: [{ name, params }],
        });
    
    }

    const loginCheck = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        const data = {
            email: email,
            password: password,
        }
        console.log(data, options);
        axios.post(
            'https://devapi.thewellnesscorner.com/auth/login', data, options)
            .then(async (response) => {
                const { data } = response;
                setUsername(data.member.email);
                setLogin(true);
                const uname = data.member.firstName + ' ' + data.member.lastName
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('username', data.member.email);
                await AsyncStorage.setItem('name', uname);
                setUName(uname);
                setSubmitted(false);
                resetAndNavigate(navigation, 'Tab')
                console.log('User account signed in!')
                navigation.navigate('Tab')
            }).catch((err) =>
                console.log(err)
            );
    }


    const submit =() => {
        if (email == '') {
            setError({ email: 'Email is Required' })
            return false;
        }
        if (password == '') {
            setError({ password: 'Password is Required' })
            return false;
        }
        if (email != '' && password != '') {
             setSubmitted(true);
            // await AsyncStorage.setItem('token', 'yogesh.sharma@truworth.com');
            loginCheck();
        }
    }
    return (
        <>
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <LinearGradient
                    colors={['#DA0845', '#EA3F2D']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <View style={{
                            padding: 0,
                            marginTop: 90,
                            minWidth: 350,
                            minHeight: 500,
                            maxHeight: 500,
                        }}>
                            <Logo />
                            <View style={{
                                marginTop: 50,
                                flex: 1,
                            }}>
                                <KeyboardAvoidingView
                                    keyboardVerticalOffset={10}
                                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                                    style={{ flex: 1 }}
                                >
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <View>

                                            <TextInput style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="Email"
                                                placeholderTextColor="white"
                                                autoCapitalize="none"
                                                borderRadius={70}

                                                onChangeText={(text) => { setEmail(text); setError({}) }}
                                            />
                                            {error.email ? (<Text style={styles.error}>{error.email}</Text>) : <Text></Text>}

                                            <TextInput style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="Password"
                                                placeholderTextColor="white"
                                                autoCapitalize="none"
                                                borderRadius={70}
                                                secureTextEntry={true}
                                                onChangeText={(text) => { setPassword(text); setError({}) }}
                                            />
                                            {error.password ? (<Text style={styles.error}>{error.password}</Text>) : <Text></Text>}


                                            <Botton name='Sign In' handler={submit} disabled={submitted} />
                                            <View style={{
                                                flexDirection: 'row',
                                                padding: 10, justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>

                                                <Text style={styles.textSignIn}>
                                                    Not have an account?
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('SignUp')} >
                                                    <Text style={styles.textSignIn}> Sign Up</Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                </KeyboardAvoidingView>
                                {submitted && <Loader size={'giant'}  status={'primary'}/>}
                            </View>
                        </View>
                       
                    </ScrollView>
                </LinearGradient>
            </View>

        </>

    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        marginBottom: 8,
        marginTop: 2,
        paddingLeft: 15,
        borderColor: '#9E1A27',
        backgroundColor: '#9E1A27',
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    error: {
        color: 'white',
        marginLeft: 15
    },
    textSignIn: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400'
    }
})

/**
 * 
 * 
 *  const submit = async () => {
        if (email == '') {
            setError({ email: 'Email is Required' })
            return false;
        }
        if (password == '') {
            setError({ password: 'Password is Required' })
            return false;
        }
        if (email != '' && password != '') {
            setSubmitted(true);
     
            let getUserString = await AsyncStorage.getItem('users');
           
            let getUser = JSON.parse(getUserString);
          
            const result = getUser.find((userData) => userData.email === email);
            if (result) {
               
                if (email == result.email && password == result.password) {
                    try {
                        setUsername(result.email);
                        setLogin(true);   
                        await AsyncStorage.setItem('token', result.email);
                        await AsyncStorage.setItem('username', result.email);
                        await AsyncStorage.setItem('name', result.name);
                        setUName(result.name);
                        navigation.replace('Tab')
                    } catch (e) {
                        console.log(e);
                    }

                } else {
                    setSubmitted(false);
                 
                    alert('Wrong Details')
                }
            } else {
                setSubmitted(false);
                
                alert('User Not Registered');
            }
        }
    }
 */