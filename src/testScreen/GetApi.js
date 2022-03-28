import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const ITEM_HEIGHT =170;
const GetApi = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get('https://gorest.co.in/public/v2/users').then((response) => {
            console.log(response.data);
            setUsers(response.data);
            console.log(users);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    const renderItem = useCallback(({ item }) => (

        <View style={{
           // height: 150,
            justifyContent: 'center',
            marginHorizontal: 15,
            marginBottom: 5,
            marginVertical: 15,
            backgroundColor: 'white',
            elevation: 10,
            padding: 15,
            borderRadius: 15,
        }}>

            <Text style={styles.text}>EID :  <Text style={styles.insideText}>{item.id} </Text></Text>
            <Text style={styles.text}>Name : <Text style={styles.insideText}>{item.name} </Text></Text>
            <Text style={styles.text}>Email : <Text style={styles.insideText}>{item.email} </Text></Text>
            <Text style={styles.text}>Gender : <Text style={styles.insideText}>{item.gender} </Text></Text>
            <Text style={styles.text}>Status : <Text style={styles.insideText}>{item.status} </Text></Text>

        </View>

    ));

    const getItemLayout =useCallback((data,index) => ({
        length:ITEM_HEIGHT,
        offset:ITEM_HEIGHT * index,
        index,
    }),[]);
    return (
        <View style={{backgroundColor:'white'}}>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                showsVerticalScrollIndicator={false}
                windowSize={5}
                maxToRenderPerBatch={3}
            />

        </View>
    )
}

export default GetApi

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 15,
        
        marginBottom: 2
    },
    insideText: {
        color: 'gray',
        fontSize: 13
    }
})