export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

export function receiveEntries (entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}

export function addCard ({ title, card }) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}