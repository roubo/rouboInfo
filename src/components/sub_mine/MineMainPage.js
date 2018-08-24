import React from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity,
    View
} from 'react-native'
import {
    ListItem,
    Overlay
} from 'react-native-elements'
import tool from '../../tools/tool'

export default class MineMainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    name: '初衷',
                    image: 'idea',
                },
                {
                    name: '参考',
                    image: 'ref'
                },
                {
                    name: '版本',
                    image: 'version'
                },
                {
                    name: '联系方式',
                    image: 'contact'
                }
            ],
            showOverlayName: null
        }
    }

    _onPress = (name) => {
        switch (name) {
            case 'version':
                this.setState({
                    showOverlayName: 'version'
                })
                break
            default:
                break
        }
    }
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {this._onPress(item.image)}}>
                <ListItem
                    title={item.name}
                    leftAvatar={{ source: tool.getImage(item.image)}}
                />
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => {
        return item.name + index
    }

    _OverlayView = (name) => {
        switch (name) {
            case 'version':
                return (
                    <Overlay isVisible={true} height={100}>
                        <Text>热更版本：第2次</Text>
                    </Overlay>
                )
            default:
                return null
        }
    }

    render(){
        return (
            <View>
                <FlatList
                    keyExtractor = {this._keyExtractor}
                    data = {this.state.data}
                    renderItem = {this._renderItem}
                />
                {this._OverlayView(this.state.showOverlayName)}
            </View>
        )
    }
}