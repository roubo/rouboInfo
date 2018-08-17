import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class ImageButton extends Component{
    constructor(props: {}) {
        super(props)
    }
    render() {
        if (this.props.text) {
            return (
                <TouchableOpacity
                    onPress = {this.props.onButtonPress}
                    activeOpacity = {this.props.activeButtonOpacity || 0.2}
                    focusedOpacity = {this.props.focusedButtonOpacity || 0.5}>
                    <View style= {this.props.styleContainer}>
                        <Image style = {this.props.styleImage} source={this.props.image}>
                        </Image>
                        <Text style={this.props.styleText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity
                    onPress = {this.props.onButtonPress}
                    activeOpacity = {this.props.activeButtonOpacity || 0.2}
                    focusedOpacity = {this.props.focusedButtonOpacity || 0.5}>
                    <View style= {this.props.styleContainer}>
                        <Image style = {this.props.styleImage} source={this.props.image}>
                        </Image>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}