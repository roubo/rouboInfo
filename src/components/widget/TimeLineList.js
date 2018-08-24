import React, {Component} from 'react'
import {
    FlatList,
    View,
    Text,
    StyleSheet
} from 'react-native'

/**
 *  inputData:
 *  [{time:xxxx, type: xxxx, data: {title: xxx, subtitle: xxxx, payload:xxxx}}]
 *  不同的type（模板），可以有不同的data结构
 */
export default class TimeLineList extends Component {

    constructor(props){
        super(props)
    }


    /**
     * 在此处添加各种模板类型
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _renderFlatListItems = ({item, index}) => {
        switch (item.type) {
            // 纯文字
            case 1:
                return (
                    <View style={styles.timeItemContainer}>
                        <View>
                            <Text style={styles.timeTextStyle}>{item.time}</Text>
                        </View>
                        <View style={styles.timeItemContentContainer}>
                            <View style={styles.timeAxisStyle}/>
                            <View style={styles.timeItemContentHeader}>
                                <Text style={styles.itemTitleText}>{item.data.title}</Text>
                                <Text style={styles.itemBodyText}>{item.data.payload}</Text>
                            </View>
                        </View >
                    </View>
                )
            default:
                return null
        }
    }

    _keyItemsExtractor = (item, index) => {
        return item.time + item.type + index
    }

    render(){
        if(!this.props.inputData) {
            return (
                <View style={{alignItems:'center', marginTop: 5}}>
                    <Text> {"暂无消息"} </Text>
                </View>
            )
        }
        return (
            <View style={{height: "100%"}}>
                <FlatList
                    data = {this.props.inputData}
                    renderItem = {this._renderFlatListItems}
                    extraData = {this.state}
                    keyExtractor = {this._keyItemsExtractor}
                    onRefresh={this.props.onRefresh}
                    refreshing={this.props.refreshing || false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timeItemContainer: {
        marginTop: 5,
        backgroundColor: '#e0e0e0',
        flexDirection: 'column'
    },
    timeAxisStyle : {
        marginLeft: 10,
        width: 1,
        backgroundColor: 'green',
    },
    timeTextStyle: {
        marginLeft: 5,
        fontSize: 10,
        color:'green'
    },
    timeItemContentContainer: {
        flexDirection: 'row'
    },
    timeItemContentHeader: {

    },
    timeItemContentBody: {

    },
    itemTitleText: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '400'
    },
    itemBodyText: {
        marginTop: 5,
        marginRight: 20,
        marginLeft: 15,
        fontWeight: "100",
        textAlign: "justify",
        fontSize: 12
    }
})