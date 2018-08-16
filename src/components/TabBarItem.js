import {
    Image
} from 'react-native'
import React, {Component} from 'react'

export default class TabBarItem extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        tintColor: '#ffffff',
        focused: false,
        normalImage: NaN,
        selectedImage: NaN
    }
    render() {
       return (
           <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
           style={ {width:35,height:35 } }></Image>
       )
    }
}