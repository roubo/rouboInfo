import {
    createBottomTabNavigator,
} from 'react-navigation'

import RouboInfoStack from './components/RouboInfo'
import RouboMineStack from './components/RouboMine'
import RouboPlanStack from './components/RouboPlan'
import TabBarItem from './components/TabBarItem'
import React, {Component} from 'react'

/**
 *  应用根路由节点，通过底部导航栏分发页面
 */
export default BottomTabNav = createBottomTabNavigator({
    // RouteConfigs
    /**
     *  我的消息
     */
    Info: {
        screen: RouboInfoStack,
        navigationOptions: {
            tabBarLabel: '消息',
            tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        selectedImage = {require('./images/icon_info.png')}
                        normalImage = {require('./images/icon_info_normal.png')}
                    />
            )
        }
    },
    /**
     *  我的日常
     */
    Plan: {
        screen: RouboPlanStack,
        navigationOptions : {
            tabBarLabel: '日常',
            tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        selectedImage = {require('./images/icon_plan.png')}
                        normalImage = {require('./images/icon_plan_normal.png')}
                    />
            ),
        }
    },
    /**
     *  我的
     */
    Mine: {
        screen: RouboMineStack,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor = {tintColor}
                    focused = {focused}
                    selectedImage = {require('./images/icon_mine.png')}
                    normalImage = {require('./images/icon_mine_normal.png')}
                />
            )
        }
    }
}, {
    // NavigatorConfigs
    initialRouteName: 'Info',
    tabBarOptions : {
        inactiveTintColor: 'gray',
        style: {
            height: 60
        }
    }
})

