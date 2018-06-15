import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { addCard } from '../actions'
import { addCardToDeck, testAddCardToDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'


class NewQuestionView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: title
        }
    }

    state = {
        question: '',
        answer: ''
    }

    submit = () => {
       
        const title = this.props.deckId
        const card = this.state

        this.props.dispatch(addCard({title, card}))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        this.toHome()

        addCardToDeck({ title, card })

    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: null//TODO check if this works, or if deckID is necessary!!!
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                    placeholder='Enter your question'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={this.state.answer}
                    placeholder='Enter your answer'
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
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        padding: 10,
        margin: 20
    },
    submitBtn: {
        backgroundColor: 'black',
        height: 60,
        width: '40%',
        borderRadius: 2,
        margin: 20,
        justifyContent: 'center',
		alignItems: 'center'
    },
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    }
})

function mapStateToProps(entries, { navigation }) {
    const { deckId } = navigation.state.params

    return {
        deckId,
        entries
    }
}

export default connect(mapStateToProps)(NewQuestionView)