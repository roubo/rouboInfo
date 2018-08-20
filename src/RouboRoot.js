import {
    createBottomTabNavigator,
} from 'react-navigation'
import {
   TouchableOpacity
} from 'react-native'
import RouboInfoStack from './components/RouboInfo'
import RouboMineStack from './components/RouboMine'
import RouboPlanStack from './components/RouboPlan'
import TabBarItem from './components/TabBarItem'
import React, {Component} from 'react'
import ImageButton from './components/widget/ImageButton'
import pxToDp from "./tools/pxToDp";

let lastPress = 0
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
            ),
            tabBarButtonComponent: TouchableOpacity
        }
    },
    /**
     *  我的日常
     */
    Plan: {
        screen: RouboPlanStack,
        navigationOptions : ({navigation}) => ({
            tabBarLabel: '日常',
            tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        selectedImage = {require('./images/icon_plan.png')}
                        normalImage = {require('./images/icon_plan_normal.png')}
                    />
            ),
            tabBarButtonComponent: TouchableOpacity,
            tabBarOnPress: () => {
                if(navigation.state.index === 0) {
                    const navigationInRoute = navigation.getChildNavigation(navigation.state.routes[0].key)
                    navigation.navigate(navigation.state.key)
                    let delta = new Date().getTime() - lastPress
                    // 双击逻辑, 滚动和重新获取数据
                    if(delta < 200) {
                        if (!!navigationInRoute && navigationInRoute.isFocused() && !!navigationInRoute.state.params && !!navigationInRoute.state.params.scrollToTop) {
                            navigationInRoute.state.params.scrollToTop()
                        }
                    }
                    lastPress = new Date().getTime()
                }
            }
        })
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
            ),
            tabBarButtonComponent: TouchableOpacity
        }
    }
}, {
    // NavigatorConfigs
    initialRouteName: 'Info',
    tabBarOptions : {
        inactiveTintColor: 'gray',
        activeTintColor: '#36ab60',
        style: {
            height: 60
        }
    }
})

