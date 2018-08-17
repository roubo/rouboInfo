import React from 'react'
import {
   Text,
    FlatList,
    StyleSheet,
    View
} from 'react-native'
import storage from '../../storage/SubAsyncStorage'
import Swipeout from 'react-native-swipeout'

export default class PlanMainPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            planInfo: null
        }
    }

    componentWillReceiveProps(nextProps) {

        storage.loadAllWithId(
            "MyPlanInfo",
            {
                success: (res) => {
                    console.warn(JSON.stringify(res))
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

    _renderFlatListItems = ({item, index}) => {
        return (
            <View style={styles.itemContainer}>
                <Swipeout>
                    <View>
                        <Text>{"test"}</Text>
                    </View>
                </Swipeout>
            </View>
        )
    }

    _keyItemsExtractor = (item, index) => {
       return item.name
    }
    render(){
        return (
            <View>
                <FlatList
                    data = {this.state.planInfo}
                    renderItem = {this._renderFlatListItems}
                    extraData = {this.state}
                    keyExtractor = {this._keyItemsExtractor}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {

    }
})