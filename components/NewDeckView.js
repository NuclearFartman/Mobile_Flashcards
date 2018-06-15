import React, { Component } from 'react'
import Reactotron from 'reactotron-react-native'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, testSubmit, testGetAllKeys, testParser, initData, saveDeckTitle } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class NewDeckView extends Component {

    state = {
        deckTitle: ''
    }

    submit = () => {
       
        const { deckTitle } = this.state

        this.props.dispatch(addDeck(deckTitle))

        this.setState(() => ({
            deckTitle: ''
        }))

        saveDeckTitle(deckTitle)

        this.props.navigation.navigate(
            'DeckView',
            {
                deckId: deckTitle,
                title: deckTitle
            }
        )

    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.mainText}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Deck Title'
                    onChangeText={(deckTitle) => this.setState({ deckTitle })}
                    value={this.state.deckTitle}
                />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.submit}>
                    <Text style={styles.submitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
    },
    textInput: {
        height: 60,
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
    mainText: {
        alignItems: 'center',
        fontSize: 35,
		padding: 10,
		margin: 10
    },
    submitBtn: {
        backgroundColor: 'black',
        height: 60,
        width: '40%',
        margin: 20,
		justifyContent: 'center',
		alignItems: 'center'
    },
    submitBtnText: {
        color: 'white',
        fontSize: 20,
    }
})

function mapStateToProps(entries) {
	return {
		entries
	}
}

export default connect(mapStateToProps)(NewDeckView)