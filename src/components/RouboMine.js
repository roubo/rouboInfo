import {
    View,
    Text
} from 'react-native'
import React, {Component} from 'react'
import MineMainPage from './sub_mine/MineMainPage'
import {createStackNavigator} from 'react-navigation'

export default RouboMineStack = createStackNavigator({
    MainPage: {
        screen: MineMainPage,
        navigationOptions: {
            title: '个人中心',
            headerBackTitle: null,
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },
            headerStyle: {
                backgroundColor: '#1195db',

            },
            headerTintColor: '#ffffff',
        }
    }
}
)

RouboMineStack.navigationOptions = ({navigation}) => {
    console.log(navigation.state.index)
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible
    }
}