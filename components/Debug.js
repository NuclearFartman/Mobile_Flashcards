import React, { Component } from 'react'
import Reactotron from 'reactotron-react-native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, testSubmit, testGetAllKeys, testParser, initData, getDeck} from '../utils/api'
import { AsyncStorage } from 'react-native'
import { clearLocalNotification } from '../utils/notification'

//this class is only for debugging. You can include it in the tab navigator to use it.
class Debug extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => 
                        AsyncStorage.clear().
                            then(
                                initData()
                            )
                    }
                >
                    <Text> Debug </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log(getDeck('React'))}
                >
                    <Text> Log getDeck('React') </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => clearLocalNotification()}
                >
                    <Text> clearLocalNotification</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(Debug)