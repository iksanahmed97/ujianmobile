import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Platform,
  ToastAndroid
} from 'react-native';

import styles from './style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';


class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Checkin", image:"https://static.thenounproject.com/png/95145-200.png"},
        {id:2, title: "CheckOut", image:"https://cdn2.iconfinder.com/data/icons/accommodation-and-leisure-vol-1-1/24/_check_out-512.png"} ,
        {id:3, title: "Ijin", image:"https://149355115.v2.pressablecdn.com/wp-content/uploads/2020/09/kratom-association-in-us.png"} ,
        {id:4, title: "History Absen", image:"https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/history-1-512.png"} ,
        {id:4, title: "Logout", image:"https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/logout-1-512.png"} ,
        
      ],
      counter : 1,
      email:""
    };
  }
  
  componentDidMount(){
    this._isMounted = true;
    auth().onAuthStateChanged((user) => {
      if(user){
    
     
      if(this._isMounted){
      console.log(user.email);
      this.setState({email: user.email});
      }
      }else{
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      
      }
    })
  }
  
  componentWillUnmount(){
    this._isMounted = false;

  }
  pushPanicButton = () =>{
  
    if(this.state.counter<3){
     let dummyCounter = this.state.counter;
     this.setState({counter: dummyCounter+1})
    }else{
    
      Geolocation.getCurrentPosition(
        info => {
            const { coords } = info

            console.log( coords.latitude)
            console.log( coords.longitude)
            let uniqueId = Date.now()
            database()
                  .ref('/maps/'+uniqueId)
                  .set({
                    email: this.state.email,
                    latitude: coords.latitude,
                    longitude:coords.longitude
                    
                  })
                  .then(() => {
                  
                  
                  Alert.alert("Panic Button",`Dilaporkan kejadian di lokasi  ${coords.latitude} , ${coords.longitude}`)
                  this.setState({counter: 1})
                  });
            
            
            
           
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000
        }
    )
    }
  
  
  }
  
  clickEventListener =(item) =>{
    Alert.alert(item.title)
    switch(item.title){
    
    case "Map" :
    
       this.props.navigation.navigate("Maps")
    break;
    case "Signout":
    this.logout()
    break;
    
    
    }
  }
  
  
  logout = ()=>{
  console.log("SignOut")
    auth()
      .signOut()
      .then(() => {
      console.log('User signed out!')
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      }).catch((error) => {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      
      });
    
  }
    render() {
        return (
          <View style={styles.container}>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.card} onPress={()=>this.clickEventListener(item)}>
                  <View style={styles.cardFooter}></View>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                  <View style={styles.cardHeader}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}/>
              </View>
        );
    }
    
    hasLocationPermission = async () => {
     
  
      if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
      }
  
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (hasPermission) {
        return true;
      }
  
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
  
      if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
        );
      }
  
      return false;
    };
    
    
}

export default Dashboard;