import {
    View,
} from 'react-native'
import React from 'react'
import { createStackNavigator } from 'react-navigation'
import PlanAddPage from './sub_plan/PlanAddPage'
import PlanMainPage from './sub_plan/PlanMainPage'
import PlanRepoPage from './sub_plan/PlanRepoPage'
import ImageButton from "./widget/ImageButton"


/**
 *  我的日常页面
 *  通过StackNav导航分发各层级页面
 */
export default RouboPlanStack = createStackNavigator({

    /**
     *  日常首页
     */
    MainPage: {
        screen: PlanMainPage,
        navigationOptions: ({navigation}) => ({

            title: '我的日常',
            headerStyle: {
                backgroundColor: '#1195db'
            },
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },
            headerTintColor: '#ffffff',
            headerLeft: <View/>,
            headerRight: (
                <ImageButton
                    styleContainer = {{
                        backgroundColor : 'rgba(0x11, 0x95, 0xdb, 0x00)',
                        flex: 1,
                        justifyContent: 'center',
                        marginRight: 10
                    }}
                    styleImage = {{
                        width: 30,
                        height: 30
                    }}
                    styleText = {{
                    }}
                    image = {require('../images/newplan.png')}
                    onButtonPress = {
                        () => {
                            navigation.navigate('RepoPage')
                        }
                    }
                />
            )
        })
    },
    /**
     *  新增日常页
     */
    AddPage: {
        screen: PlanAddPage,
        navigationOptions: ({navigation}) => ({
            title: '新增一个日常',
            headerRight: (
                <ImageButton
                    styleContainer = {{
                        backgroundColor : 'rgba(0x11, 0x95, 0xdb, 0x00)',
                        flex: 1,
                        justifyContent: 'center',
                        marginRight: 10
                    }}
                    styleImage = {{
                        width: 30,
                        height: 30
                    }}
                    styleText = {{
                    }}
                    image = {require('../images/add.png')}
                    // 调用子组件的方法
                    onButtonPress = {navigation.state.params?navigation.state.params.rightHeaderPress:null}
                />
            )
        })
    },
    /**
     *  日常仓库页
     */
    RepoPage: {
        screen: PlanRepoPage,
        navigationOptions: ({navigation}) => ({
            tabBarVisible: false,
            title: '日常仓库',
            headerStyle: {
                backgroundColor: '#1195db'
            },
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },
            headerRight:<View/>,
            headerTintColor: '#ffffff',
        })
    }
},{
    // 默认首页
    initialRouteName: 'MainPage',
})

// 在该stack的二级页面不显示底部导航栏
/**
 * 通过控制tabBarVisible变量，控制底部导航栏显示
 * @param navigation 来自父路由，也就是底部导航
 * @returns {{tabBarVisible: boolean}}
 */
RouboPlanStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible
    }
}
