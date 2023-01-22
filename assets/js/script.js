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
// let choices = document.getElementsByClassName('.choice')
let ol = document.querySelector('#list')
let TorF = document.querySelector('#TorF')
let ranQuestion, ranAnswer, values

let score = {
  'correct': 0,
  'incorrect': 0,
  'time': 0,
}

// Array questions
let questionsArr = [
  {
    'question': 'Commonly used data types DO NOT include:',
    'answers': {
      'trueAnswer': 'alert',
      'wrongAnswer1': 'string',
      'wrongAnswer2': 'boolean',
      'wrongAnswer3': 'int',
    }
  },

  {
    'question': 'Inside which HTML element do we put the JavaScript?',
    'answers': {
      'trueAnswer': '<script>',
      'wrongAnswer1': '<js>',
      'wrongAnswer2': '<scripting>',
      'wrongAnswer3': '<javascript>',
    }
  },

  {
    'question': 'Where is the correct place to insert a JavaScript?',
    'answers': {
      'trueAnswer': 'The bottom of the <body> section',
      'wrongAnswer1': 'The <head> section',
      'wrongAnswer2': 'The top of the <body> section',
      'wrongAnswer3': 'Both the <head> section and the <body> section are correct'
    }
  },

  {
    'question': 'What is the correct syntax for referring to an extrenal script called "xxx.js"?',
    'answers': {
      'trueAnswer': '<script src="xxx.js">',
      'wrongAnswer1': '<script name="xxx.js">',
      'wrongAnswer2': '<script id="xxx.js">',
      'wrongAnswer3': '<script href="xxx.js">',
    }
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
  button1.addEventListener("click", checkAnswer);
  button2.addEventListener("click", checkAnswer);
  button3.addEventListener("click", checkAnswer);
  button4.addEventListener("click", checkAnswer);
}

//  Draw game function
function drawGame() {
  ranQuestion = randomizer()
  // console.log(answersArr);
  question.textContent = ranQuestion.question;
  ol.setAttribute('style', 'display: flex')
  button1.textContent = '1. ' + answerRandomizer();
  button2.textContent = '2. ' + answerRandomizer();
  button3.textContent = '3. ' + answerRandomizer();
  button4.textContent = '4. ' + values[0];
}

// Check answer function
function checkAnswer() {
  /* console.log(this.textContent)
  console.log('true ans: ' + ranQuestion.answers.trueAnswer)
  console.log(this.textContent.slice(3,this.textContent.length)) */
  let text = this.textContent.slice(3,this.textContent.length);
  if (text == ranQuestion.answers.trueAnswer) {
    TorF.textContent = 'Correct!';
    TorF.setAttribute('style', 'font-style: italic');
    score.correct = score.correct + 1;
    // console.log(score);
    drawGame();
    return true;
  } else {
    TorF.textContent = 'Incorrect!';
    TorF.setAttribute('style', 'font-style: italic');
    score.incorrect = score.incorrect + 1
    // console.log(score);
    drawGame();
    return false;
  }
}

// Function store score
function storeScore() {
  localStorage.setItem("score", JSON.stringify(todos));
}

// Game over function
function gameOver() {
  ol.setAttribute('style', 'display: none')
  question.textContent = 'All Done!';
}

// randomizer function
function randomizer() {
  let ranQuestion = (questionsArr[Math.floor(Math.random() * questionsArr.length)]);
  // console.log(ranQuestion)
  values = Object.values(ranQuestion.answers);
  return ranQuestion;
}

// answerRandomizer function
function answerRandomizer() {
  let i = Math.floor(Math.random() * values.length)
  // console.log(i)
  let ranAnswer = values[i];
  let splice = values.splice(i, 1);
  // console.log(values + '||' + splice)
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