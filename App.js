import './ReactotronConfig'
import Reactotron, { asyncStorage }  from 'reactotron-react-native'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StyleSheet, Text, View } from 'react-native'
import DeckListView, { TEST }  from './components/DeckListView'
import DeckView from './components/DeckView'
import Debug from './components/Debug'
import { AsyncStorage } from 'react-native'
import { initData, getDecks } from './utils/api'
import { TabNavigator, StackNavigator } from 'react-navigation'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'
import NewDeckView from './components/NewDeckView'
import { setLocalNotification } from './utils/notification'


const Tabs =  TabNavigator({
  DECKS: {
    screen: DeckListView
  },
  'NEW DECK': {
    screen: NewDeckView
  },
  // Debug: {
  //   screen: Debug
  // }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView
  },
  NewQuestionView: {
    screen: NewQuestionView
  },
  QuizView: {
    screen: QuizView
  }
})

function testJSONDecomposition(jsonObject){
  return Object.keys(jsonObject).length
}

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <Text> </Text>
          <Text> </Text>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


