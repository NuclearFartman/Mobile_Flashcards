This project was bootstraped with create-react-native-app.
It requires only yarn install and yarn start to launch it.
It requires the android simulator and it has only been 
tested with android.

The app itself has two tabs, with the DECKS Tab showing at startup.
There you can find all of your decks listed with the title and the number 
of cards in the deck.

You can click each button to go to the individual deck view.
On the upper left side you can navigate back to the DECKS Tab.
In the individual deck the title and the number of cards is 
displayed again. Additionally there are two buttons.

The first button brings you to a new screen where you can add a new 
card to the deck. You have one Textinput for the question and one for 
the answer. Below is a submit button, to save the card in the deck.
After you hit the submit button you are navigated back to the 
individual deck view.

The second button starts the quiz. You are navigated to a new screen 
with the first question displayed. You have a button to show the answer.
Once clicked the answer is displayed along with a button to mark your 
answer as correct or incorrect. You can also navigate back to the question.
Above the question/answer you can see the number of the question in the deck 
and the remaining cards.

Once you have answered all questions ( and marked it as correct/incorrect ) you 
can see what percentage of correct answers you gave. You can navigate back to 
the individual deck view from there.


The second Tab lets you declare the title of a new deck. You have a textinput 
along with a submit button to save the new deck.

Bugs: There are some depreciation warnings at app startup!!!
You can safely ignore (and dismiss) these warnings.