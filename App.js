import React, { Component } from 'react'
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from './src/components/Dashboard/Dashboard';
import auth from '@react-native-firebase/auth';
import Login from './src/components/Login/Login';
const Stack = createStackNavigator();


export default class App extends Component {

  constructor(props) {
  super(props);
  
  this.state={
    user:null,
    isLoggedIn:false
  
  }
    
    
  
  }
  componentDidMount() {

  }
  render() {
    return (
      
      <NavigationContainer>
         <Stack.Navigator>  
             <Stack.Screen name="Login" component={Login} />
             <Stack.Screen name="Dashboard" component={Dashboard} />
         </Stack.Navigator>
      </NavigationContainer>
    
    )
  }
}