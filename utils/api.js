import { AsyncStorage } from 'react-native'
import { data } from './_DATA.js'

export const DATA_STORAGE_KEY = 'Mobile_Flashcards:data'

export function getDecks () {
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then(formatResults)
}

//Not necessary! I get everything from Redux.
export function getDeck (id) {
    return AsyncStorage.getItem(DATA_STORAGE_KEY).
        then(/*Do something*/)
}

export function saveDeckTitle (title) {
    let delta = {
        [title]: {
            'title': title,
            'questions': []
        }
    }
    return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify(delta), () => {
        AsyncStorage.getItem(DATA_STORAGE_KEY, (err, result) => {
            console.log(result)
        })
    }) 
}

export function addCardToDeck ({ title, card }) {
    return AsyncStorage.getItem(DATA_STORAGE_KEY, (err, result) => {
        //extract array of questions and concat a new question/card
        let array = JSON.parse(result)[title].questions.concat(card)
        //to merge an array you have to convert it to an object with the correct tree structure
        let delta = {
            [title]: {
                'questions': array
            }
        }
        AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify(delta))
    })
}


export function formatResults (results) {
    return results === null
    ? initData()
    : JSON.parse(results)
}

export function initData() {
    return AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
}