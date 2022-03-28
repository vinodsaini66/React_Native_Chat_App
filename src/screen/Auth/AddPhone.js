import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TopNav from '../../navigation/TopNav'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const AddPhone = ({ navigation }) => {

    const [countryCode, setCountryCode] = useState("91");
    const [mobileNo, setMobileNo] = useState('');

    const addMobile = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log('token : ', token);
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'x-access-token':token
            }
        }
        const data = {
            mobileNo: mobileNo,
            countryCode: countryCode,
        }
        console.log(data, options);
        axios.post(
            'https://devapi.thewellnesscorner.com/user/mobile-number', data, options)
            .then( (response) => {
                const { data } = response;
                console.log(response.data);
                //alert(response.data.message)
                navigation.navigate('Otp');

            }).catch((error) => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            });
    }

    const submit = () => {
        if (countryCode == '') {
            alert('Select Country Code ');
            return false;
        }
        if (mobileNo == '') {
            alert('Enter Mobile Number ');
            return false;
        }
        if (countryCode != '' && mobileNo != '') {
            // setSubmitted(true);
            addMobile();
        }
    }
    return (
        <>
            <TopNav
                title={''}
                navigation={navigation}
            />

            <View style={{
                marginHorizontal: 15,
                marginVertical: 35,
            }}>
                <Text style={{
                    fontSize: 21,
                    color: 'black',
                    fontWeight: '600',
                    marginBottom: 10
                }}>Enter your mobile number </Text>
                <Text style={{
                    color: 'gray'
                }}>
                    Your mobile number will only be used in times when we need to reach you
                </Text>

                <View style={styles.rowContainer}>
                    <Picker
                        mode={'dropdown'}
                        selectedValue={countryCode}
                        style={{ height: 50, width: 120, borderBottomWidth: 1 }}
                        onValueChange={(itemValue, itemIndex) => setCountryCode(itemValue)}

                    >
                        <Picker.Item label="+91" value="91" />
                        <Picker.Item label="+1" value="1" />
                    </Picker>

                    <View style={{ flex: 1 }}>

                        <TextInput
                            placeholder='Number'
                            value={mobileNo}
                            onChangeText={nextValue => setMobileNo(nextValue)}
                            style={styles.text}
                        />
                    </View>
                </View>

                <TouchableOpacity style={{
                    marginVertical: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    borderRadius: 20,
                    height: 40,
                }}
                    onPress={() => submit()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

export default AddPhone

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        marginVertical: 15,

    },
    container: {
        minHeight: 128,
    },
    text: {

    },

})