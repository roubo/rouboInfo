import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import {
    Button,
} from 'react-native-elements'

import MultipleSectionList from '../widget/MultipleSectionList'
import localData from '../../data/localData'

export default class PlanRepoPage extends React.Component {

    /**
     * 跳转到自定义习惯页面
     * @private
     */
    _customerPlan = () => {
        // 通过堆栈导航的screen可以自动传递navigation
        this.props.navigation.navigate('AddPage', {
            image: 'custom',
            isCustom: true,
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Button
                    title='自定义日常'
                    containerStyle = {{
                        width: '100%',
                    }}
                    buttonStyle = {{
                        backgroundColor: 'white',
                        height:50
                    }}
                    titleStyle = {{
                        fontSize: 18,
                        color: 'gray'
                    }}
                    icon={{
                        name: 'fiber-new',
                        size: 30,
                        color: 'green'
                    }}
                    onPress={this._customerPlan}
                />
                <MultipleSectionList
                    inputData = {localData.repoData}
                    navigation = {this.props.navigation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
})