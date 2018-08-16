import React, {Component} from 'react'
import {
    SectionList,
    FlatList, View, Text, StyleSheet,
} from 'react-native'
import ImageButton from "./ImageButton";
import pxToDp from "../../tools/pxToDp"

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
        inputData: []
    }

    // -------------------------- flatlist start

    _getImage = (name) => {
        switch (name) {
            case 'plancast':
                return require('../../images/repo/plancast.png')
            case 'makecode':
                return require('../../images/repo/makecode.png')
            case 'email':
                return require('../../images/repo/email.png')
            case 'jira':
                return require('../../images/repo/jira.png')
            case 'todo':
                return require('../../images/repo/todo.png')
            case 'mubu':
                return require('../../images/repo/mubu.png')
            case 'phone-call':
                return require('../../images/repo/phone-call.png')
            case 'bath':
                return require('../../images/repo/bath.png')
            case 'water':
                return require('../../images/repo/water.png')
            case 'sleep30':
                return require('../../images/repo/sleep30.png')
            case 'trainO30':
                return require('../../images/repo/trainO30.png')
            case 'trainM60':
                return require('../../images/repo/trainM60.png')
            case 'ebook':
                return require('../../images/repo/ebook.png')
            case 'write':
                return require('../../images/repo/write.png')
            default:
                return require('../../images/repo/plancast.png')
        }
    }
    _renderFlatListItems = ({item, index}) => {
        let imageUrl = "../../images/repo/" + item.image + ".png"
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
                    // TODO image
                    image = {this._getImage(item.image)}
                />
            </View>
        )
    }

    _keyItemsExtractor = (item, index) => {
        return item.key
    }


    // -------------------------- flatlist end


    // -------------------------- sectionlist start
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


    _renderSectionHeader = ({section}) => {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.titleDiv}></View>
                <Text style={styles.titleText}>{section.title}</Text>
            </View>
        )
    }

    _keyExtractor = (item, index) => {
        return item.key
    }
    // -------------------------- sectionlist end

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
