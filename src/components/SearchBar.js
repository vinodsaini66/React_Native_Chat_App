import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

const SearchBar = (props) => {

  const { handler, toggle } = props;
  const search = (text) => {
      handler(text);
  }
  return (
    <View style={{
      marginVertical: 10,
      flexDirection: 'row',
      marginRight:5,
      justifyContent:'space-around',
      alignItems:'center'
    }}>
      <TextInput
        placeholder='Search '
        onChangeText={(text) => search(text)}
        style={{
          borderWidth: 2,
          borderRadius: 30,
          color: 'black',
          textAlign: 'center',
          fontSize: 15,
          width:330,
          marginLeft:15,
          height:37,
        
        }}
      />
      <TouchableOpacity style={{
        justifyContent: 'center',
        alignItems: 'center',
       
      }}
        onPress={() => toggle()}>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          
          color:'red'
        }}>X</Text>
      </TouchableOpacity>
    </View>
  );
}
export default SearchBar;