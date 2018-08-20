import React from 'react'
import {
   Text,
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import storage from '../../storage/SubAsyncStorage'
import Swipeout from 'react-native-swipeout'
import tool from '../../tools/tool'

export default class PlanMainPage extends React.Component {

    _listRef: FlatList<*>
    constructor(props) {
        super(props)
        this.state = {
            planInfo: null,
            colorList : ["#FFE4B5", "#D3D3D3", "#B22222", "#FF6347", "#228B22", "#6A5ACD", "#708090", "#F0F8FF", "#87CEFA", "#48D1CC", "#FFD700"]
        }
    }

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
            case 'custom':
                return require('../../images/repo/custom.png')
            case 'beforesleep':
                return require('../../images/beforesleep.png')
            case 'wakeup':
                return require('../../images/wakeup.png')
            case 'onway':
                return require('../../images/onway.png')
            case 'noon':
                return require('../../images/noon.png')
            case 'workout':
                return require('../../images/workout.png')
            case 'anytime':
                return require('../../images/anytime.png')
            case 'complete':
                return require('../../images/complete.png')
            default:
                return require('../../images/repo/plancast.png')
        }
    }

    /**
     * 列表数据排序函数，用于区分今日是否已经打完卡排序
     * @param prop
     * @private
     */
    _sortCompare = (prop) => {
       return function (a, b) {
           var va = a[prop]
           var vb = b[prop]
           if(va && vb) {
               return 0
           }
           if(va && !vb) {
               return 1
           }
           if(!va && vb) {
               return -1
           }
       }
    }


    /**
     * 判断当天是否需要打卡
     * @param info
     * @returns {*}
     * @private
     */
    _updateToday = (info) => {
        let mydate=new Date()
        let dayOfWeek = mydate.getDay()
        for (let index in info) {
            info[index].todayIsNeed = info[index].repeat[dayOfWeek]
        }
        return info
    }

    /**
     * 获取最新的日常数据
     * @private
     */
    _getPlanInfo = () => {
        storage.loadAllWithId(
            "MyPlanInfo",
            {
                success: (res) => {
                    res = this._updateToday(res)
                    res.sort(this._sortCompare('today'))
                    this.setState({
                        planInfo: res
                    })
                },
                fail: (err) => {
                    console.warn("get info error: " + JSON.stringify(err))
                }
            }
        )
    }

    /**
     * 每次更新props时调用
     */
    componentWillMount() {
        this._getPlanInfo()
    }

    /**
     * 每次更新props时调用
     */
    componentWillReceiveProps(nextProps) {
        this._getPlanInfo()
    }

    /**
     * 向父组件注册方法
     */
    componentDidMount() {
        this.props.navigation.setParams({
            scrollToTop: () => {
                this._getPlanInfo()
                this._listRef.scrollToIndex({viewPosition:0, index:0})
            }
        })
    }

    _renderItemCover = (todayIsDone, todayIsNeed) => {
        if(!todayIsDone || !todayIsNeed){
            return null
        }
        if(todayIsDone) {
            return (
                <View>
                    <View style={styles.itemCoverStyle}/>
                    <View>
                        <Image
                            source={this._getImage('complete')}
                            style={{
                                marginTop: -50,
                                width: 35,
                                height: 35,
                                alignSelf: 'center'
                            }}
                        />
                    </View>
                </View>
            )
        }

    }

    /**
     * 点击打卡, 更新数据
     * @param name
     * @private
     */
    _onPressItem = (name) => {
        let fixed = false
        let fixedItem = null
        let tmpInfo = null
        if(this.state.planInfo) {
            tmpInfo = this.state.planInfo
            for (let index in tmpInfo) {
                if(tmpInfo[index].name == name){
                    tmpInfo[index].today = true
                    tmpInfo[index].last = tmpInfo[index].last + 1
                    fixed = true
                    fixedItem = tmpInfo[index]
                    tool.playLocalSound('done.wav')
                }
            }
        }
        if (fixed) {
            tmpInfo.sort(this._sortCompare('today'))
            this.setState({
                planInfo: tmpInfo
            })
            storage.saveWithId(
                "MyPlanInfo",
                name,
                fixedItem
            )
        }
    }

    /**
     * 侧滑删除
     * @private
     */
    _onPressRemoveItem = (name) => {
        let fixed = false
        let tmpInfo = null
        if(this.state.planInfo) {
            tmpInfo = this.state.planInfo
            for (let index in tmpInfo) {
                if(tmpInfo[index].name == name){
                    tmpInfo.splice(index, 1)
                    fixed = true
                }
            }
        }
        if (fixed) {
            tmpInfo.sort(this._sortCompare('today'))
            this.setState({
                planInfo: tmpInfo
            })
            storage.removeWithId(
                "MyPlanInfo",
                name
            )
        }
    }

    /**
     * 侧滑编辑
     * @param item
     * @private
     */
    _onPressEditItem = (item) => {
        if (item.isCustom) {
            this.props.navigation.navigate('AddPage', {
                image: item.image,
                isCustom: true
            })
        }else{
            this.props.navigation.navigate('AddPage', {
                image: item.image,
                isCustom: false,
                title: item.title
            })
        }
    }

    _renderFlatListItems = ({item, index}) => {
        var swipButton = [
            {
                text: '跳过',
                backgroundColor: 'gray',
            },
            {
                text: '编辑',
                backgroundColor: 'orange',
                onPress: () => {
                    this._onPressEditItem(item)
                }
            },
            {
                text: '删除',
                backgroundColor: 'red',
                onPress: () => {
                    this._onPressRemoveItem(item.name)
                }
            }

        ]
        return (
            <View>
                <Swipeout
                    sensitivity = {10}
                    style={styles.itemContainer}
                    backgroundColor = {index > this.state.colorList.length ? this.state.colorList[index-this.state.colorList.length] : this.state.colorList[index]}
                    right={swipButton}>
                    <TouchableOpacity style={styles.itemInterContainer} onPress={() => {this._onPressItem(item.name)}}>
                        <View style={styles.itemInterLeftContainer}>
                            <Image
                                style={styles.itemImageStyle}
                                source={this._getImage(item.image)}
                            />
                            <Text style={styles.itemTextStyle}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={styles.itemInterRightContainer}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                                { item.last + "天"}
                            </Text>
                            <Text style={{fontSize:10, fontWeight: '100', marginTop:2}}>
                                {"共计坚持"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {this._renderItemCover(item.today, item.todayIsNeed)}
                </Swipeout>
            </View>
        )
    }

    _keyItemsExtractor = (item, index) => {
       return item.name + index
    }

    _captureRef = (ref) => {
        this._listRef = ref
    }

    render(){
        return (
            <View style={{height:'100%'}}>
                <FlatList
                    data = {this.state.planInfo}
                    renderItem = {this._renderFlatListItems}
                    extraData = {this.state}
                    keyExtractor = {this._keyItemsExtractor}
                    ref = {this._captureRef}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        height: 65,
        // flexDirection: 'row',
        // justifyContent: 'center',
    },
    itemInterContainer: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemInterLeftContainer: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemImageStyle: {
        marginLeft: 5,
        width: 35,
        height: 35
    },
    itemTextStyle: {
        fontSize: 12,
        marginLeft: 5
    },
    itemInterRightContainer: {
        marginRight: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemCoverStyle: {
        backgroundColor: 'gray',
        opacity: 0.7,
        marginTop: -65,
        height: 65
    }
})