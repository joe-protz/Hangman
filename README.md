# Hangman 
This app was developed with the intention that a teacher may play this game with their students over screenshare or in person. It is kid friendly, taking the concepts of Hangman without the actual picture or depiction of a man.

## User Stories
- As a user I would like to be able to enter how many guesses a should be allowed before game is over
- As a user I would like to be able to enter the word that students will attempt to figure out
- As a user I would like to be able to click on a letter to guess the letter

## Planning Story
I wanted to use React for this project for two main reasons. One, if it is used in a school with bad wifi, a Single Page Application would only need to load once, and then be usable indefinitely. Two, Hangman felt like a very state-like Application. I had the idea to have the game's state stored in App.js and to pass it down to all needed components. I am happy to say that this worked great and is extremely responsive! Overall, I felt as though this was a decent challenge, but I was able to complete MVP in one full day and get it available to teachers and students quickly.

## Unsolved Problems
- I want to make the UI a bit more pleasing and less cluttered
- Code needs some refactoring
- Maybe a score tally
- Use Context API to clean up code significantly
- Figure out why the app wont build with transitions


