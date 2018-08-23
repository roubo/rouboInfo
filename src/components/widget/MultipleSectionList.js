import React, {Component} from 'react'
import {
    SectionList,
    FlatList, View, Text, StyleSheet,
} from 'react-native'
import ImageButton from "./ImageButton";
import pxToDp from "../../tools/pxToDp"
import tool from '../../tools/tool'

/**
 * [inputData]:
 *  [
 *    {
 *       title:'SectionList的Section01',
 *       data:[
 *             {key:'Section01里的item01', image:''},
 *             {key:'Section01里的item02', image:''}],
 *       key: 'xxx'
 *   },
 *   {
 *       title:'SectionList的Section02',
 *       data:[
 *             {key:'Section02里的item01', image:''},
 *             {key:'Section02里的item02', image:''}]
 *       key: 'yyy'
 *   }
 *  ]
 *
 */
export default class MultipleSectionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    static defaultProps = {
        numColumns : 2,
        inputData: [],
        navigation: null
    }


    /**
     * 点击ImageButton事件
     * @param image
     * @param title
     * @private
     */
    _onButtonPress = (image, title) => {
        this.props.navigation.navigate('AddPage', {
            image: image,
            isCustom: false,
            title: title
        })
    }

    /**
     * 列表Item Render, Item为ImageButton
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _renderFlatListItems = ({item, index}) => {
        return (
            <View style={styles.itemContainer}>
                <ImageButton
                    styleContainer = {{
                        alignSelf: 'center',
                        width: pxToDp(360),
                        height: pxToDp(200),
                        backgroundColor: 'white',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOpacity: 0.5,
                        shadowOffset: {width: 0, height: 5},
                        elevation: 1
                    }}
                    styleImage = {{
                        width: 50,
                        height: 50
                    }}
                    styleText = {{
                        marginTop: 5
                    }}
                    text = {item.key}
                    image = {tool.getImage(item.image)}
                    onButtonPress = {() => {
                        this._onButtonPress(item.image, item.key)
                    }}
                />
            </View>
        )
    }

    /**
     * Flatlist item 的 key
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _keyItemsExtractor = (item, index) => {
        return item.key
    }


    /**
     * 组件最外层的sectionlist item render, item为flatlist
     * @param item
     * @param index
     * @param section
     * @returns {*}
     * @private
     */
    _readerSectionItems = ({item, index, section}) => {
        if(index != section.data.length-1){
            return null
        }
        return (
            <View style={styles.listContainer}>
                <FlatList
                    data = {section.data}
                    numColumns = {this.props.numColumns}
                    renderItem = {this._renderFlatListItems}
                    extraData = {this.state}
                    keyExtractor = {this._keyItemsExtractor}
                    columnWrapperStyle = {styles.columnWrapperStyle}
                    horizontal={false}
                />
            </View>
        )
    }


    /**
     * sectionlist 的 Header Render
     * @param section
     * @returns {*}
     * @private
     */
    _renderSectionHeader = ({section}) => {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.titleDiv}></View>
                <Text style={styles.titleText}>{section.title}</Text>
            </View>
        )
    }

    /**
     * sectionlist item key
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _keyExtractor = (item, index) => {
        return item.key
    }

    render() {
        return (
            <SectionList style = {styles.sectionContainer}
                sections = {this.props.inputData}
                renderItem = {this._readerSectionItems}
                renderSectionHeader={this._renderSectionHeader}
                stickySectionHeadersEnabled = {false}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}


const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#F5F5F5'
    },
    /**
     *  标题部分
     */
    /**
     * 水平主轴，主轴起始处开始排列，单行
     * 元素从交叉轴中间开始排列（垂直居中）
     */
    titleContainer: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleDiv: {
        width: 4,
        height: 15,
        backgroundColor: 'orange'
    },
    titleText: {
        marginLeft: 10,
        fontSize: 15
    },
    /**
     *  具体内容部分
     */
    /**
     * 水平主轴，主轴起始处开始排列，单行
     * 元素从交叉轴中间开始排列（垂直居中）
     */
    itemContainer: {
        flex: 1,
        width: 50
    },
    listContainer: {
        flex: 1,
    },
    /**
     *  每行 行的样式
     */
    columnWrapperStyle: {
        paddingBottom: 10,
        // flexWrap: 'nowrap',
        // flexDirection: 'row',
        // alignItems: 'stretch'
    }
})
