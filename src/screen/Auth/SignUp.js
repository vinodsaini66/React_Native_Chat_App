import {
    View, Text, StyleSheet, StatusBar, TextInput,
    TouchableWithoutFeedback, Button, Keyboard, KeyboardAvoidingView,
    ScrollView, TouchableOpacity
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../components/Logo';
import Botton from '../../components/Botton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext from '../../context/LoginContext';
import moment from 'moment';
import Loader from '../../components/Loader';


const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { setLogin, setUsername, setUName } = useContext(LoginContext);
    

    const saveUser = async (user) => {
        try {
            let getUserString = await AsyncStorage.getItem('users');
            let getUser = JSON.parse(getUserString);
            let check = 0;
            if (Array.isArray(getUser)) {
                const result = getUser.find((userData) => userData.email === email);
                if (result) {

                } else {
                    getUser.push(user);
                    check = 1;
                }

            } else {
                getUser = [user];
                check = 1;
            }
            if (check === 1) {
                let userstring = JSON.stringify(getUser);
                await AsyncStorage.setItem('users', userstring);
                if (userstring) {
                    setUsername(email);
                    setLogin(true);
                    await AsyncStorage.setItem('token', email);
                    await AsyncStorage.setItem('username', name);
                    await AsyncStorage.setItem('name', name);
                    setUName(name);

                    resetAndNavigate(navigation, 'Tab')
                    console.log('User account signed in!')
                    navigation.navigate('Tab')
                }
            } else {
                alert('User Already Exists');
                setSubmitted(false);
                setIsLoading(false);
            }

        } catch (e) {
            console.log(e)
        }
    }
    const resetAndNavigate = (navigation, name, params) => {
        navigation.reset({
            index: 0,
            routes: [{ name, params }],
        });
    
    }

    const submit = () => {

        if (name == '') {
            setError({ name: 'Name is Required' })
            return false;
        }

        if (email == '') {
            setError({ email: 'Email is Required' })
            return false;
        }
        if (phone == '') {
            setError({ Phone: 'Phone is Required' })
            return false;
        }
        if (password == '') {
            setError({ password: 'Password is Required' })
            return false;
        }
        setSubmitted(true);
        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            time: moment().format(),
            image: require('../../../assets/my_coach_static.png')
        };
        saveUser(user);
        // alert("Name: " + name + " Username: " + username + " Email : " + email + " Password : " + password);
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
                            flex: 1,
                            marginTop: 50,
                            minWidth: 350,
                            minHeight: 600,
                            maxHeight: 500,

                        }}>
                            <Logo />
                            <View style={{
                                marginTop: 45,
                                flex: 1
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
                                                placeholder="Full Name"
                                                placeholderTextColor="white"
                                                autoCapitalize="none"
                                                borderRadius={70}
                                                returnKeyType='next'
                                                onChangeText={(text) => {
                                                    setName(text);
                                                    setError({})
                                                }}

                                            />
                                            {error.name ? (<Text style={styles.error}>{error.name}</Text>) : <Text></Text>}
                                            <TextInput style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="Email"
                                                placeholderTextColor="white"
                                                autoCapitalize="none"
                                                borderRadius={70}
                                                returnKeyType='next'
                                                onChangeText={(text) => {
                                                    setEmail(text);
                                                    setError({})
                                                }}

                                            />
                                            {error.email ? (<Text style={styles.error}>{error.email}</Text>) : <Text></Text>}
                                            <TextInput style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="Phone"
                                                placeholderTextColor="white"
                                                autoCapitalize="none"
                                                borderRadius={70}
                                                returnKeyType='next'
                                                onChangeText={(text) => {
                                                    setPhone(text);
                                                    setError({})
                                                }}

                                            />
                                            {error.phone ? (<Text style={styles.error}>{error.phone}</Text>) : <Text></Text>}
                                            <TextInput style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="Password"
                                                placeholderTextColor="white"
                                                autoCapitalize="none"
                                                borderRadius={70}
                                                secureTextEntry={true}
                                                returnKeyType='next'
                                                onChangeText={(text) => {
                                                    setPassword(text);
                                                    setError({})
                                                }}
                                            />
                                            {error.password ? (<Text style={styles.error}>{error.password}</Text>) : <Text></Text>}
                                            <Botton
                                                name='Sign Up'
                                                handler={submit}
                                                disabled={submitted} />
                                            <View style={{
                                                flexDirection: 'row',
                                                padding: 10, justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>

                                                <Text style={styles.textSignIn}>
                                                    Already have an account?
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Login')} >
                                                    <Text style={styles.textSignIn}> Sign In</Text>
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
export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        marginBottom: 1,
        marginTop: 1,
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