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

    render(){
        return (
            <View style={styles.container}>
                <Button
                    title='自定义日常'
                    containerStyle = {{
                        width: '100%'
                    }}
                    buttonStyle = {{
                        backgroundColor: 'white'
                    }}
                    titleStyle = {{
                        fontSize: 15,
                        color: 'gray'
                    }}
                    icon={{
                        name: 'fiber-new',
                        size: 20,
                        color: 'green'
                    }}
                />
                <MultipleSectionList
                    inputData = {localData.repoData}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0
    },
})