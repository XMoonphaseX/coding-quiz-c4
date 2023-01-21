/* Functions:

timer
  when timer is = 0 display final score and input box for name
store score

view highscores

start game
  timer
  display question[random]
  display ordered list with one right answer

check
  if buttonpressed = answer
    display correct
    correct ++
  else 
    display wrong
    timer --
    wrong ++

init
  initalize page */

// Variables
let viewHighscores = document.querySelector('#viewHighscores');
let timeRem = document.querySelector('#timeLeft');
let timeLeft = 60;
let question = document.querySelector('.question');
let paragraph = document.querySelector('#p');
let startButton = document.querySelector('.start');
let button1 = document.querySelector('.num1');
let button2 = document.querySelector('.num2');
let button3 = document.querySelector('.num3');
let button4 = document.querySelector('.num4');
let choices = document.querySelector('.choice')
let ol = document.querySelector('#list')
let answersArr = []

// Array questions
let questionsArr = [
  {
    'question': 'Commonly used data types DO NOT include:',
    'trueAnswer': 'alert',
    'wrongAnswer1': 'string',
    'wrongAnswer2': 'boolean',
    'wrongAnswer3': 'int',
  },
  {
    'question': 'Inside which HTML element do we put the JavaScript?',
    'trueAnswer': '<script>',
    'wrongAnswer1': '<js>',
    'wrongAnswer2': '<scripting>',
    'wrongAnswer3': '<javascript>',
  },
  {
    'question': 'Where is the correct place to insert a JavaScript?',
    'trueAnswer': 'The bottom of the <body> section',
    'wrongAnswer1': 'The <head> section',
    'wrongAnswer2': 'The top of the <body> section',
    'wrongAnswer3': 'Both the <head> section and the <body> section are correct'
  },
  {
    'question': 'What is the correct syntax for referring to an extrenal script called "xxx.js"?',
    'trueAnswer': '<script src="xxx.js">',
    'wrongAnswer1': '<script name="xxx.js">',
    'wrongAnswer2': '<script id="xxx.js">',
    'wrongAnswer3': '<script href="xxx.js">',
  },
  /* {
    'question': '',
    'trueAnswer': '',
    'wrongAnswer1': '',
    'wrongAnswer2': '',
    'wrongAnswer3': '',
  }, */
]

// Initalize funtion
function init() {
  viewHighscores.textContent = 'View Highscores';
  timeRem.textContent = 'Time: ' + timeLeft + ' seconds';
  question.textContent = 'Coding Quiz Challenge'
  paragraph.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds!'
  ol.setAttribute('style', 'display: none')
}

// startGame function
function startGame() {
  startButton.setAttribute('style', 'display: none');
  paragraph.setAttribute('style', 'display: none');
  countdown();
  let ranQuestion = randomizer()
  answersArr.push(
    ranQuestion.trueAnswer,
    ranQuestion.wrongAnswer1,
    ranQuestion.wrongAnswer2,
    ranQuestion.wrongAnswer3
    )
  console.log(answersArr);
  question.textContent = ranQuestion.question;
  ol.setAttribute('style', 'display: flex')
  button1.textContent = '1. ' + answerRandomizer();
  button2.textContent = '2. ' + answerRandomizer();
  button3.textContent = '3. ' + answerRandomizer();
  button4.textContent = '4. ' + answersArr[0];
}

function gameOver() {
  timeRem.setAttribute('style', 'display: none');
  
}

// randomizer function
function randomizer() {
  let ranQuestion = (questionsArr[Math.floor(Math.random() * questionsArr.length)]);
  return ranQuestion;
}

// answerRandomizer function
function answerRandomizer() {
  index = Math.floor(Math.random() * answersArr.length)
  console.log(index)
  let ranAnswer = answersArr[index];
  console.log(ranAnswer)
  answersArr.splice(index, 1)
  return ranAnswer;
}

// Countdown function
function countdown() {
  let timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft != 1) {
      // Set the `textContent` of `timeLeft` to show the remaining seconds
      timeRem.textContent = 'Time: ' + timeLeft + ' seconds';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timeRem.textContent = 'Time: ' + timeLeft + ' second';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timeLeft` to an empty string
      timeRem.textContent = '';
      gameOver();
    }
  }, 1000);
}

init();
startButton.addEventListener("click", startGame)