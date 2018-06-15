import React, { Component } from 'react'
import Reactotron from 'reactotron-react-native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries } from '../actions'
import { getDecks, testSubmit, testGetAllKeys, testParser } from '../utils/api'
import { AppLoading } from 'expo'

class DeckListView extends Component {
	state = {
		ready: false
	}


	componentDidMount() {
		const { dispatch } = this.props

		getDecks()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(() => this.setState(() => ({ ready: true })))

	}

	render() {
		const { entries } = this.props
		if (this.state.ready === false) {
			return <AppLoading />
		}
		return (
			<View style={styles.container}>
				{Object.keys(entries).map((entry) => {
					return <TouchableOpacity
						style={styles.button}
						onPress={() => this.props.navigation.navigate(
							'DeckView',
							{
								title: entries[entry].title,
								deckId: entry
							}
						)}
						key={entry}
					>
						<Text> {entries[entry].title} </Text>
						<Text style={styles.txtCards}> {entries[entry].questions.length} cards </Text>
					</TouchableOpacity>
				})}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 10,
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

function mapStateToProps(entries) {
	return {
		entries
	}
}

export default connect(mapStateToProps)(DeckListView)