import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'

import {
    Divider,
    CheckBox
} from 'react-native-elements'
import ImageButton from '../widget/ImageButton'
import storage from '../../storage/SubAsyncStorage'


export default class PlanAddPage extends React.Component {

    // let setTimeList = ["任意时间","起床以后", "上班路上", "中午期间", "下班以后", "睡觉之前"]
    constructor(props) {
        super(props)
        this.state = {
            imageName: null,
            text: '自定义',
            repeatText: '一二三四五六日',
            timeText: '任意时段',
            setTimeIndex: 0,
            showRepeatSetting: false,
            showTimeSetting: false,
            repeatMon: true,
            repeatTues: true,
            repeatWed: true,
            repeatThur: true,
            repeatFri: true,
            repeatSat: true,
            repeatSun: true,
        }
    }

    /**
     * 暴露接口给父组件，右上角确认点击事件
     */
    componentDidMount() {
        this.props.navigation.setParams({
            rightHeaderPress: this._addNewPlan
        })
    }

    /**
     * 判断今天是否需要打开
     * @private
     */
    _todayIsNeedPunch = () => {
        let repeat = [
            this.state.repeatSun,
            this.state.repeatMon,
            this.state.repeatTues,
            this.state.repeatWed,
            this.state.repeatThur,
            this.state.repeatFri,
            this.state.repeatSat
        ]
        let mydate=new Date()
        let dayOfWeek = mydate.getDay()
        return repeat[dayOfWeek]
    }
    /**
     * 右上角确认点击事件
     * @private
     */
    _addNewPlan = () => {
        const {params} = this.props.navigation.state
        storage.saveWithId(
            "MyPlanInfo",
            params.isCustom ? this.state.text : params.title,
            {
                image: params.image,
                name: params.isCustom ? this.state.text : params.title,
                repeat: [
                    this.state.repeatSun,
                    this.state.repeatMon,
                    this.state.repeatTues,
                    this.state.repeatWed,
                    this.state.repeatThur,
                    this.state.repeatFri,
                    this.state.repeatSat
                ],
                time: this.state.setTimeIndex,
                last: 0,
                today: false,
                todayIsNeed: this._todayIsNeedPunch()
            }
        )
        this.props.navigation.navigate('MainPage', {update: true})
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
            default:
                return require('../../images/repo/plancast.png')
        }
    }

    /**
     * 更新"设置重复"内容，不能直接setState，因为setState是异步操作
     * @returns {string}
     * @private
     */
    _updateRepeatText = () => {
        let t1 = this.state.repeatMon ? "一" : ""
        let t2 = this.state.repeatTues ? "二" : ""
        let t3 = this.state.repeatWed ? "三" : ""
        let t4 = this.state.repeatThur ? "四" : ""
        let t5 = this.state.repeatFri ? "五" : ""
        let t6 = this.state.repeatSat ? "六" : ""
        let t7 = this.state.repeatSun ? "日" : ""
       // this.setState({
       //     repeatText: t1+t2+t3+t4+t5+t6+t7
       // })
        return t1+t2+t3+t4+t5+t6+t7
    }

    /**
     * 浮层的render
     * @returns {*}
     * @private
     */
    _updateFloatView = () => {
        if(!this.state.showRepeatSetting && !this.state.showTimeSetting){
            return (null)
        }

        if(this.state.showRepeatSetting) {
            return (
                <View style={styles.floatContainer}>
                    <ScrollView >
                        <CheckBox
                            title={"周一"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatMon: !this.state.repeatMon
                                    })
                                }
                            }
                            checked={this.state.repeatMon}/>
                        <CheckBox
                            title={"周二"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatTues: !this.state.repeatTues
                                    })
                                }
                            }
                            checked={this.state.repeatTues}/>
                        <CheckBox
                            title={"周三"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatWed: !this.state.repeatWed
                                    })
                                }
                            }
                            checked={this.state.repeatWed}/>
                        <CheckBox
                            title={"周四"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatThur: !this.state.repeatThur
                                    })
                                }
                            }
                            checked={this.state.repeatThur}/>
                        <CheckBox
                            title={"周五"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatFri: !this.state.repeatFri
                                    })
                                }
                            }
                            checked={this.state.repeatFri}/>
                        <CheckBox
                            title={"周六"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatSat: !this.state.repeatSat
                                    })
                                }
                            }
                            checked={this.state.repeatSat}/>
                        <CheckBox
                            title={"周日"}
                            onPress={
                                () => {
                                    this.setState({
                                        repeatSun: !this.state.repeatSun
                                    })
                                }
                            }
                            checked={this.state.repeatSun}/>
                    </ScrollView>
                </View>
            )
        }
        if(this.state.showTimeSetting){
            return (
                <View style={styles.floatContainer}>
                    <ScrollView>
                        <ImageButton
                            onButtonPress = {
                                () => {
                                    this.setState({
                                        timeText: "起床以后",
                                        setTimeIndex: 1
                                    })
                                }
                            }
                            styleContainer = {styles.timeSetImageButtonContainer}
                            styleText = {styles.timeSetText}
                            styleImage = {styles.timeSetImage}
                            text = {"起床以后"}
                            image = {this._getImage("wakeup")}
                        />
                        <ImageButton
                            onButtonPress = {
                                () => {
                                    this.setState({
                                        timeText: "上班路上",
                                        setTimeIndex: 2
                                    })
                                }
                            }
                            styleContainer = {styles.timeSetImageButtonContainer}
                            styleText = {styles.timeSetText}
                            styleImage = {styles.timeSetImage}
                            text = {"上班路上"}
                            image = {this._getImage("onway")}
                        />
                        <ImageButton
                            onButtonPress = {
                                () => {
                                    this.setState({
                                        timeText: "中午期间",
                                        setTimeIndex: 3
                                    })
                                }
                            }
                            styleContainer = {styles.timeSetImageButtonContainer}
                            styleText = {styles.timeSetText}
                            styleImage = {styles.timeSetImage}
                            text = {"中午期间"}
                            image = {this._getImage("noon")}
                        />
                        <ImageButton
                            onButtonPress = {
                                () => {
                                    this.setState({
                                        timeText: "下班以后",
                                        setTimeIndex: 4
                                    })
                                }
                            }
                            styleContainer = {styles.timeSetImageButtonContainer}
                            styleText = {styles.timeSetText}
                            styleImage = {styles.timeSetImage}
                            text = {"下班以后"}
                            image = {this._getImage("workout")}
                        />
                        <ImageButton
                            onButtonPress = {
                                () => {
                                    this.setState({
                                        timeText: "睡觉之前",
                                        setTimeIndex: 5
                                    })
                                }
                            }
                            styleContainer = {styles.timeSetImageButtonContainer}
                            styleText = {styles.timeSetText}
                            styleImage = {styles.timeSetImage}
                            text = {"睡觉之前"}
                            image = {this._getImage("beforesleep")}
                        />
                        <ImageButton
                            onButtonPress = {
                                () => {
                                    this.setState({
                                        timeText: "任意时间",
                                        setTimeIndex: 0
                                    })
                                }
                            }
                            styleContainer = {styles.timeSetImageButtonContainer}
                            styleText = {styles.timeSetText}
                            styleImage = {styles.timeSetImage}
                            text = {"任意时间"}
                            image = {this._getImage("anytime")}
                        />
                    </ScrollView>
                </View>
            )
        }
    }

    /**
     * 日常名的render
     * @param isCustom
     * @param showText
     * @returns {*}
     * @private
     */
    _onUpdateTextView = (isCustom, showText) => {
        if(isCustom){
            return (
                <TextInput
                    style={styles.inputStyle}
                    defaultValue={"自定义习惯"}
                    onChangeText={(text) => this.setState({text})}
                />
            )
        }else{
            return (
               <Text
                   style={styles.inputStyle}
               >{showText}</Text>
            )
        }
    }

    _onPressRepeat = () => {
        this.setState({
            showRepeatSetting: true,
            showTimeSetting: false,
        })
    }

    _onPressTime = () => {
        this.setState({
            showTimeSetting: true,
            showRepeatSetting: false
        })
    }

    render(){
        const {params} = this.props.navigation.state
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        showRepeatSetting: false,
                        showTimeSetting: false
                    })
                }}
            >
                <View style={styles.container}>
                    <Image
                        source={this._getImage(params.image)}
                        style={styles.imageStyle}
                    />
                    {this._onUpdateTextView(params.isCustom, params.title)}
                    <Divider style={styles.divStyle} />
                    <ScrollView style={styles.scrollViewStyle} >
                        <TouchableOpacity style={styles.touchOpacityStyle} onPress={this._onPressRepeat}>
                            <Text style={styles.textLeftStyle}>{"设置重复"}</Text>
                            <Text style={styles.textRightStyle}>{this._updateRepeatText()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchOpacityStyle} onPress={this._onPressTime}>
                            <Text style={styles.textLeftStyle}>{"设置时段"}</Text>
                            <Text style={styles.textRightStyle}>{this.state.timeText}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {this._updateFloatView()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'white'

    },
    imageStyle: {
        width: 50,
        height: 50,
        marginTop: 20,
        alignSelf: 'center'
    },
    inputStyle: {
        width: 200,
        alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center'
    },
    divStyle: {
       marginTop: 10,
        height: 1,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 2},
        elevation: 1
    },
    scrollViewStyle: {

    },
    touchOpacityStyle: {
        marginTop: 15,
        height: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textLeftStyle: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    textRightStyle: {
        marginRight: 10,
        fontWeight: '100'
    },
    floatContainer: {
        flex: 1,
        paddingBottom: 0,
        backgroundColor: 'white',
        height: 600
    },
    timeSetImageButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'white',
        height: 35
    },
    timeSetImage: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    timeSetText: {
        fontWeight: "100",
        marginLeft: 10,
        alignSelf: 'center'
    }
})