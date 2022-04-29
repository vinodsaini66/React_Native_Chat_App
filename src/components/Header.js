import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import Add from '../../assets/svg/Add';
import Menu from '../../assets/svg/Menu';
import Search from '../../assets/svg/Search';

const Header = (props) => {
  const { headerHeight } = props;
  return (
    <>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 2,
          },
        ]}>
        <TouchableOpacity style={{ flex: 1, height: 40 }}>
          <View style={{
            flexDirection: 'row',
            flex: 1,
          }} >
            <Icon style={styles.icon}
              name='navigation-2'
              fill={'red'}
            />
            <Text style={{
              color: '#DA0845',
              fontSize: 18,
              fontWeight: 'bold'
            }}>Vaishali Nagar</Text>
          </View>
          <Text numberOfLines={1} style={{

            marginLeft: 5,
            fontSize: 12
          }} >Conversations Require cycles are allowed, but can result in uninitialized values</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 100, alignItems: 'flex-end' }}>
          <Icon style={{
            width: 25,
            height: 25,
            marginRight: 10
          }}
            name='person'
            fill={'red'}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 2,
          },
        ]}>
        <View style={styles.searchBox}>

          <TextInput
            placeholder='Search for water'
            onChangeText={() => null}
            style={styles.searchText}
          />
          <Search />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: { color: 'red', fontSize: 16, fontWeight: 'bold' },
  searchText: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#C8C6C6',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 17,
    height: 20,
    marginTop: 2,
    marginLeft: 1,
    marginRight: 5,
  }
});
export default Header;
