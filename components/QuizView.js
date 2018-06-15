import React, { Component } from 'react'
import Reactotron from 'reactotron-react-native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, testSubmit, testGetAllKeys, testParser, initData } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'

class QuizView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: title
        }
    }

    state = {
        questionIndex: 0,
        showAnswer: false,
        correctAnswers: 0,
        quizFinished: false
    }

    getQuestion = () => {
        const { entries, deckId } = this.props
        const { questionIndex, showAnswer } = this.state
        if (entries[deckId].questions.length < 1) {
            return 'There are no questions in this deck'
        }
        if (questionIndex >= entries[deckId].questions.length) {
            return 'There are no more questions in this deck'
        }
        return (
            showAnswer ?
                entries[deckId].questions[questionIndex].answer
                : entries[deckId].questions[questionIndex].question
        )
    }

    handleOnPressBtn = (correct) => {
        const { entries, deckId } = this.props
        const { questionIndex, showAnswer } = this.state

        if (correct) {
            this.setState((prev) => ({ correctAnswers: prev.correctAnswers + 1 }))
        }

        if (questionIndex >= entries[deckId].questions.length - 1) {
            this.setState(() => ({ quizFinished: true }))
        }
        this.setState((previous) => ({
            questionIndex: previous.questionIndex + 1,
            showAnswer: false
        }))
    }

    restartQuiz = () => {
        const { entries, deckId } = this.props
        const { showAnswer, correctAnswers, quizFinished, questionIndex } = this.state

        this.setState(() => ({
            questionIndex: 0,
            showAnswer: false,
            correctAnswers: 0,
            quizFinished: false
        }))
    }

    backToDeck = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: null//TODO check if this works, or if deckID is necessary!!!
        }))
    }

    render() {
        const { entries, deckId } = this.props
        const { showAnswer, correctAnswers, quizFinished, questionIndex } = this.state
        if (quizFinished) {
            clearLocalNotification()
                .then(setLocalNotification)
            return (
                <View>
                    <Text style={styles.quizFinishedText}> {`You have
                     ${(correctAnswers / entries[deckId].questions.length * 100).toFixed(2)} Percent
                      correct!!!` } </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.restartQuiz}
                    >
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.backToDeck}
                    >
                        <Text>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.container}>

                <Text style={styles.numberOfCards}>{`${questionIndex + 1}/${entries[deckId].questions.length}`}</Text>

                <Text style={styles.title}>{this.getQuestion()}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setState((previous) => ({
                        showAnswer: !(previous.showAnswer)
                    })
                    )}
                >
                    <Text >{showAnswer ? 'Question' : 'Answer'}</Text>
                </TouchableOpacity>

                {showAnswer ?
                    <View>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: 'green' }]}
                            onPress={() => this.handleOnPressBtn(true)}
                        >
                            <Text >Correct</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: 'red' }]}
                            onPress={() => this.handleOnPressBtn(false)}
                        >
                            <Text >Incorrect</Text>
                        </TouchableOpacity>
                    </View>

                    : null}

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
    title: {
        alignItems: 'center',
        fontSize: 35,
        padding: 10,
        margin: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10
    },
    quizFinishedText: {
        alignItems: 'center',
        fontSize: 35,
        padding: 10,
        margin: 10
    },
    numberOfCards: {
        fontSize: 20
    }
})

function mapStateToProps(entries, { navigation }) {
    const { deckId, title } = navigation.state.params

    return {
        deckId,
        title,
        entries
    }
}

export default connect(mapStateToProps)(QuizView)