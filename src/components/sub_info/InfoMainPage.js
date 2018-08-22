import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import codePush from 'react-native-code-push'

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
            <Text>暂无消息</Text>
        )
    }
}

const styles = StyleSheet.create({
    timeLineContainer: {
        marginTop: -10
    }
})