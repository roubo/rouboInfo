import {
    View,
    Text
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import InfoMainPage from './sub_info/InfoMainPage'

import React, {Component} from 'react'


export default RouboInfoStack =  createStackNavigator({
    MainPage: {
        screen: InfoMainPage,
        navigationOptions: {
            title: '我的消息',
            headerStyle: {
                backgroundColor: '#1195db'
            },
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },
            headerTintColor: '#ffffff',
        }
    }
},{

})


RouboInfoStack.navigationOptions = ({navigation}) => {
    console.log(navigation.state.index)
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible
    }
}

