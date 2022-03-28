import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';


const PostApi = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('Active');

    const Submit = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'Bearer 300afaaa01893e86d3372271fdc0242a8d65a25d1a49a79bcb8b4bb7aaf11d75'
            }
        }
        const data = {
            email: email,
            name: name,
            gender: gender,
            status: status
        }
        axios.post('https://gorest.co.in/public/v2/users', data, options)
            .then((response) => {
                console.log(response);
            }).catch((err) =>
                console.log(err));
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='black'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Name'
                placeholderTextColor='black'
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Gender'
                placeholderTextColor='black'
                onChangeText={(text) => setGender(text)}
            />

            <TouchableOpacity
                onPress={() => Submit()}
                style={{
                    backgroundColor: 'gray',
                    padding: 15,
                    marginVertical: 20,
                    borderRadius: 20
                }}>
                <Text>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default PostApi

const styles = StyleSheet.create({
    input: {
        borderRadius: 1,
        borderWidth: 1,
        color: 'black',
        height: 40,
        width: '50%',

    }
})