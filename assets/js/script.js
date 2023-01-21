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
let question = document.querySelector('.question');
let paragraph = document.querySelector('#p');
let startButton = document.querySelector('.start');
let button1 = document.querySelector('.num1');
let button2 = document.querySelector('.num2');
let button3 = document.querySelector('.num3');
let button4 = document.querySelector('.num4');
let choices = document.querySelector('.choice')
let ol = document.querySelector('#list')
let TorF = document.querySelector('#TorF')
let ranQuestion
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
    'answers': {
      'trueAnswer': '',
      'wrongAnswer1': '',
      'wrongAnswer2': '',
      'wrongAnswer3': '',',
    }  
  }, */
]

// Initalize funtion
function init() {
  startButton.addEventListener("click", startGame);
  viewHighscores.textContent = 'View Highscores';
  /* timeRem.textContent = 'Time: ' + time + ' seconds'; */
  question.textContent = 'Coding Quiz Challenge'
  paragraph.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds!'
  ol.setAttribute('style', 'display: none');
}

// startGame function
function startGame() {
  countdown(60);
  startButton.setAttribute('style', 'display: none');
  paragraph.setAttribute('style', 'display: none');
  drawGame();
  checkAnswer();
}

//  Draw game function
function drawGame() {
  ranQuestion = randomizer()
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

// TODO: Check answer function
function checkAnswer() {
  console.log(this.textContent)

  /* button1.addEventListener("click", function() {
    if (this.textContent.slice(3,button1.textContent.length) == ranQuestion.trueAnswer) {
      console.log('correct')
    } else {
      console.log('incorrect')
    }
  });
  button2.addEventListener("click", function() {
    if (this.textContent.slice(3,button2.textContent.length) == ranQuestion.trueAnswer) {
      console.log('correct')
    } else {
      console.log('incorrect')
    }
  });
  button3.addEventListener("click", function() {
    if (this.textContent.slice(3,button3.textContent.length) == ranQuestion.trueAnswer) {
      console.log('correct')
    } else {
      console.log('incorrect')
    }
  });
  button4.addEventListener("click", function() {
    if (this.textContent.slice(3,button4.textContent.length) == ranQuestion.trueAnswer) {
      console.log('correct')
    } else {
      console.log('incorrect')
    }
  }); */
}

// Game over function
function gameOver() {
  ol.setAttribute('style', 'display: none')
  question.textContent = 'All Done!';
}

// randomizer function
function randomizer() {
  let ranQuestion = (questionsArr[Math.floor(Math.random() * questionsArr.length)]);
  console.log(ranQuestion)
  return ranQuestion;
}

// answerRandomizer function
function answerRandomizer() {
  index = Math.floor(Math.random() * answersArr.length)
  /* console.log(index) */
  let ranAnswer = answersArr[index];
  /* console.log(ranAnswer) */
  answersArr.splice(index, 1)
  return ranAnswer;
}

// Countdown function
function countdown(time) {
  let timeInterval = setInterval(function () {
    // As long as the `time` is greater than 1
    if (time > 1) {
      // Set the `textContent` of `time` to show the remaining seconds
      /* console.log(time) */
      timeRem.textContent = 'Time: ' + time + ' seconds';
      // Decrement `time` by 1
      time--;
    }else if (time === 1) {
      console.log(time)
      // When `time` is equal to 1, rename to 'second' instead of 'seconds'
      timeRem.textContent = 'Time: ' + time + ' second';
      time--;
    }else {
      timeRem.textContent = '';
      console.log(time)
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

init();
button1.addEventListener("click", checkAnswer)
button2.addEventListener("click", checkAnswer)
button3.addEventListener("click", checkAnswer)
button4.addEventListener("click", checkAnswer)