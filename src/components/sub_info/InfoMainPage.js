import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import codePush from 'react-native-code-push'
import TimeLineList from '../widget/TimeLineList'

export default class InfoMainPage extends React.Component {


    /**
     * 应用中首次加载的组件，故在此次检测热更新
     */
    componentDidMount(){
        codePush.sync()
    }

    constructor(props){
        super(props)
    }

    render(){
        return (
            <TimeLineList
                onRefresh={()=> {
                }}
                inputData = {
                    [
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "【测试】",
                                subtitle: "测试",
                                payload: "GitHub brings together the world's largest community of developers to discover, share, and build better software. From open source projects to private team,GitHub brings together the world's largest community of developers to discover, share, and build better software. From open source projects to private team"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        },
                        {
                            time: "2018-08-24 12:00",
                            type: 1,
                            data: {
                                title: "测试",
                                subtitle: "测试",
                                payload: "xxxxxxx"
                            }
                        }
                    ]
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    timeLineContainer: {
        marginTop: -10
    }
})