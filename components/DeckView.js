import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: title
        }
    }

    calculateNumberOfCards = () => {
        const { deckId, entry, entries } = this.props
        return entries[deckId].questions.length
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.txtCards}>{this.calculateNumberOfCards()} cards</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate(
                        'NewQuestionView',
                        {
                            deckId: this.props.deckId,
                            title: 'Add Card'
                        }
                    )}
                >
                    <Text >Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        {
                            deckId: this.props.deckId,
                            title: this.props.title
                        }
                    )}
                >
                    <Text >Start Quiz</Text>
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
	txtCards: {
		color: 'grey'
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

export default connect(mapStateToProps)(DeckView)
