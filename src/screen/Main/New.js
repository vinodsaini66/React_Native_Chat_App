import {
  View, Text, StyleSheet, Button, FlatList,
  Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'
import React, { useRef, useState, createRef, useEffect, useCallback } from 'react'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');
const cellHeight = height * 0.6;
const cellWidth = width;
const threshold = 150;
const CARD_SIZE = 215;

const New = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isFocused = useIsFocused();

  //test_1.mp4 hrrrrr

  const videoList = [
    {
      id: 0,
      title: 'first',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    },
    {
      id: 1,
      title: 'Second',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    },
    {
      id: 2,
      title: 'third',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 3,
      title: 'fourth',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 4,
      title: 'fifth',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 5,
      title: 'sixth',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 6,
      title: 'seventh',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    },
    {
      id: 7,
      title: 'eigth',
      url: require('../../../assets/videos/test_1.mp4'),
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    },
  ];

  /* const videoList = [
    {
      id: 0,
      title: 'first',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    },
    {
      id: 1,
      title: 'Second',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    },
    {
      id: 2,
      title: 'third',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 3,
      title: 'fourth',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 4,
      title: 'fifth',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 5,
      title: 'sixth',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    },
    {
      id: 6,
      title: 'seventh',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    },
    {
      id: 7,
      title: 'eigth',
      url:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    },
  ];*/
  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  }

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    //let index = viewableItems[0].index;
    console.log(viewableItems);
    if (viewableItems.length > 0) {
      let index = viewableItems[0].index;
      setActiveIndex(index);
      //console.log(viewableItems[0].item.height, viewableItems[0].item.width);
    }
    // this.setState({ indexOfImages: index, heightOfImages: SCREEN_WIDTH * (viewableItems[0].item.height / viewableItems[0].item.width) });
  }, []);


  const renderItem = useCallback(({ item, index }) => (
    <VideoItem url={item.url}
      navigation={navigation}
      poster={item.poster}
      paused={activeIndex != index || !isFocused}
      size={index}
      title={item.title}
    />
  ));
  const keyExtractor = useCallback(item => item.id);
  return (
    <>

      <View style={{
        flex: 1, justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FlatList
          data={videoList}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
        //onScroll={handleScroll}
        // onLayout={(event) => onVideoLayout(event)}
        />
      </View>
      <View>
        <Button title="Go to test get Api" onPress={() => navigation.navigate('GetApi')} />
        <Button title="Go to test post Api" onPress={() => navigation.navigate('PostApi')} />
      </View>

    </>


  )
}

const VideoItem = (props) => {
  const player = useRef(0);
  const { url, navigation, poster, paused, size, title } = props;
  const [fullscreen, setFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);

  return (
    // <View style={{
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: (CARD_SIZE + size * 15) + 50,
    //   backgroundColor: 'red',
    //   marginVertical: 30
    // }}>
    <>
      <View style={{
        backgroundColor: 'gray',
        width: 350,
        height: CARD_SIZE,
        flexDirection:'row',
        marginBottom:5,
      }}
      //onPress={() => { player.current.paused }}
      >
        <Video
          source={url}
          style={styles.video}
          //  controls={true}
          ref={player}
          poster={poster}
          posterResizeMode={'cover'}
          repeat={true}
          paused={paused}
          resizeMode={'cover'}
          playInBackground={false}
          hideShutterView={true}
          fullscreen={fullscreen}
          onProgress={({ currentTime }) => setCurrentTime(currentTime)}
          onFullscreenPlayerWillPresent={() => alert('fullScreen')}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Fullscrren', { url, currentTime })
            /*setFullscreen(prev=>!prev) */
          }}
        >
          <MaterialIcon name={'fullscreen'} size={30} color="blue" />
        </TouchableWithoutFeedback>
      </View >

      <View style={{
        backgroundColor: 'gray',
        width: 350,
        marginVertical: 1
      }}>

        <Text style={{ color: 'black', fontSize: 18 }}>{title}</Text>

      </View>
    </>
    // </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '90%',
    height: '100%',
  }
});


export default New;














/*
<TouchableOpacity style={{
                backgroundColor: 'gray',
                width: 350,
                height: 200,
                marginLeft:15,
                marginVertical:30
              }} 
              onPress={()=>{setMuted(!muted);alert(muted)}}>
                <Video
                  source={{ uri: item.url }}
                  style={styles.video}
                  
                  poster={item.poster}
                  repeat={true}
                  paused={paused}
                  muted={muted}
                  resizeMode={'cover'}
                   //seek()
                  // onLoadStart={()=>player.current.seek(200)}
                  
                  
                />
              </TouchableOpacity > 
              
               // const onVideoLayout = event => {
  //   let start = -(event.nativeEvent.layout.y - height + threshold);
  //   let end = event.nativeEvent.layout.y + event.nativeEvent.layout.height - threshold;
  //   setPosition({ start: start, end: end });
  // }

  // const onScroll = event => {
  //   const scrollPosition = event.nativeEvent.contentOffset.y;
  //   const paused = paused;
  //   const { start, end } = position;
  //   console.log(start, end, scrollPosition);
  //   if (scrollPosition < start && scrollPosition > end && paused) {
  //     setPaused(false);
  //   } else if (scrollPosition > start && !paused) {
  //     setPaused(true);
  //   } else if (scrollPosition < end && !paused) {
  //     setPaused(true);
  //   }
  // }


    // const [paused, setPaused] = useState(true);
  // const [position, setPosition] = useState({ start: null, end: null })
  // const [muted, setMuted] = useState(true);
              
              */