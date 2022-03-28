import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import {
  Divider, Icon, Layout, TopNavigation,
  TopNavigationAction, Button, MenuItem, OverflowMenu
} from '@ui-kitten/components';
import TopNav from '../../navigation/TopNav';


const Group = ({ navigation }) => {

  const groupData = [{
    name: 'Gotham City Police Deparment',
    members: 4,
    lastActive: 5,
    user: [{
      name: 'vikas',
      image: require('../../../assets/my_coach_static.png')
    },
    {
      name: 'kuku',
      image: require('../../../assets/my_coach_static.png')
    }, {
      name: 'k k royal',
      image: require('../../../assets/my_coach_static.png')
    }]
  },
  {
    name: 'Gotham City Police Deparment',
    members: 4,
    lastActive: 4,
    user: [{
      name: 'vikas',
      image: require('../../../assets/my_coach_static.png')
    },
    {
      name: 'kuku',
      image: require('../../../assets/my_coach_static.png')
    }, {
      name: 'k k royal',
      image: require('../../../assets/my_coach_static.png')
    }]
  },
  {
    name: 'Gotham City Police Deparment',
    members: 4,
    lastActive: 6,
    user: [{
      name: 'vikas',
      image: require('../../../assets/my_coach_static.png')
    },
    {
      name: 'kuku',
      image: require('../../../assets/my_coach_static.png')
    }, {
      name: 'k k royal',
      image: require('../../../assets/my_coach_static.png')
    }]
  },
  {
    name: 'Gotham City Police Deparment',
    members: 4,
    lastActive: 15,
    user: [{
      name: 'vikas',
      image: require('../../../assets/my_coach_static.png')
    },
    {
      name: 'kuku',
      image: require('../../../assets/my_coach_static.png')
    }, {
      name: 'k k royal',
      image: require('../../../assets/my_coach_static.png')
    }]
  }, {
    name: 'Gotham City Police Deparment',
    members: 4,
    lastActive: 14,
    user: [{
      name: 'vikas',
      image: require('../../../assets/my_coach_static.png')
    },
    {
      name: 'kuku',
      image: require('../../../assets/my_coach_static.png')
    }, {
      name: 'k k royal',
      image: require('../../../assets/my_coach_static.png')
    }]
  }
  ];

  const RightIcon = (props) => (
    // <TouchableOpacity >
      <Icon {...props} name='plus-outline' fill='red' />
    // </TouchableOpacity>
  );

  const BackIcon = (props) => (
    <Text style={{ fontSize: 15, color: 'red' }} >Edit</Text>
  );
  const navigateBack = () => {
    navigation.navigate('Assessment');
  };

  const navigateRight = () => {
    navigation.navigate('ReactAnimation');
  };

  return (
    <>
      <TopNav
        title='Groups'
        leftIcon={BackIcon}
        leftAction={navigateBack}
        rigtIcon={RightIcon}
        rightAction={navigateRight}
        navigation={navigation}
      />
      <View style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={groupData}
          keyExtractor={(item) => item.lastActive}
          renderItem={({ item }) => <GroupInfo groupInfo={item} />}
          ListFooterComponent={() => <View style={{ height: 25 }}/>}
        />
      </View>
    </>
  )
}

const GroupInfo = (props) => {
  const { groupInfo } = props
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };
  const Menu = () => (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <Icon name='more-vertical-outline'
        style={styles.icon}
        fill='#8F9BB3'
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container} >
      <View style={{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 5,
      }}>
        <OverflowMenu
          appearance='noDivider'
          anchor={Menu}
          visible={visible}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={() => setVisible(false)}          
        >
          <MenuItem title='Users' style={{backgroundColor:'#E6E6E6'}} />
          <MenuItem title='Messages' style={{backgroundColor:'#E6E6E6'}}/>
        </OverflowMenu>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: 'black'
        }}>{groupInfo.name} </Text>
      </View>

      <Text style={styles.timeText}>{groupInfo.lastActive} minutes ago
        <Text
          style={{
            color: '#8F9BB3',
            fontSize: 6,
           
          }}>   {'\u2B24'}
        </Text>{' '} {groupInfo.members} members
      </Text>

      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 15
      }}>
        <Image
          source={require('../../../assets/my_coach_static.png')}
          style={styles.userImage}
          resizeMode='cover'
        />
        <Image
          source={require('../../../assets/my_coach_static.png')}
          style={styles.userImage}
          resizeMode='cover'
        />
        <Image
          source={require('../../../assets/my_coach_static.png')}
          style={styles.userImage}
          resizeMode='cover'
        />
        <Image
          source={require('../../../assets/my_coach_static.png')}
          style={styles.userImage}
          resizeMode='cover'
        />
        <Image
          source={require('../../../assets/my_coach_static.png')}
          resizeMode='cover'
          style={styles.userImage}
        />
      </View>


    </View>
  );
}
export default Group;

const styles = StyleSheet.create({
  container: {
    // marginLeft: 20,
    // marginRight: 20,
    marginHorizontal:20,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 10,
    backgroundColor: 'white',
   // minWidth: 370,
    minHeight: 150,
    borderRadius: 7,
  },
  icon: {
    width: 32,
    height: 25,
  },
  timeText: {
    color: '#8F9BB3',
    fontSize: 16,
    textAlign: 'center'
  },
  userImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginLeft: 5
  }
});