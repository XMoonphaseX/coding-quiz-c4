/* 
When questions answered == 15 then gameover
*/

// Variables
let viewHighscores = document.querySelector('#viewHighscores');
let timeRem = document.querySelector('#timeLeft');
let question = document.querySelector('.question');
let paragraph = document.querySelector('#p');
let startButton = document.querySelector('.start');
let allDone = document.querySelector('#allDone');
let initalsLabel = document.querySelector('#initals');
let initalsInput = document.querySelector('#initalsInput');
let initalsSubmit = document.querySelector('#submit');
let goBack = document.querySelector('.goBack');
let clearScores = document.querySelector('.clearHighscores')
let button1 = document.querySelector('.num1');
let button2 = document.querySelector('.num2');
let button3 = document.querySelector('.num3');
let button4 = document.querySelector('.num4');
let dev1 = document.querySelector('#dev1');
let dev2 = document.querySelector('#dev2');
let dev3 = document.querySelector('#dev3');
let time = 60;
// let choices = document.getElementsByClassName('.choice')
let ol = document.querySelector('#numList')
let hsList = document.querySelector('#hsList')
let TorF = document.querySelector('#TorF')
let ranQuestion, ranAnswer, values
let localScores = []

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

  {
    'question': 'How do you create a function in JavaScript?',
    'answers': {
      'trueAnswer': 'function myFunction()',
      'wrongAnswer1': 'function:myFunction()',
      'wrongAnswer2': 'function = myFunction()',
      'wrongAnswer3': 'myFunction() = function',
    }  
  },

  {
    'question': 'Which built-in method returns the calling string value converted to upper case?',
    'answers': {
      'trueAnswer': 'toUpperCase()',
      'wrongAnswer1': 'toUpper()',
      'wrongAnswer2': 'changeCase(case)',
      'wrongAnswer3': 'None of the above.',
    }  
  },

  {
    'question': 'Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?',
    'answers': {
      'trueAnswer': 'split()',
      'wrongAnswer1': 'slice()',
      'wrongAnswer2': 'replace()',
      'wrongAnswer3': 'search()',
    }  
  },

  {
    'question': 'Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?',
    'answers': {
      'trueAnswer': 'every()',
      'wrongAnswer1': 'concat()',
      'wrongAnswer2': 'push()',
      'wrongAnswer3': 'some()',
    }  
  },

  {
    'question': 'Which of the following function of Array object represents the source code of an object?',
    'answers': {
      'trueAnswer': 'toSource()',
      'wrongAnswer1': 'splice()',
      'wrongAnswer2': 'toString()',
      'wrongAnswer3': 'unshift()',
    }  
  },

  {
    'question': 'Which of the following type of variable is visible only within a function where it is defined?',
    'answers': {
      'trueAnswer': 'local variable',
      'wrongAnswer1': 'global variable',
      'wrongAnswer2': 'Both of the above.',
      'wrongAnswer3': 'None of the above.',
    }  
  },

  {
    'question': 'Which is the correct way to write a comment in JavaScript?',
    'answers': {
      'trueAnswer': '// ....',
      'wrongAnswer1': '{# ... #}',
      'wrongAnswer2': '<!--- .... ---!>',
      'wrongAnswer3': '\\ ...',
    }  
  },

  {
    'question': 'Which one of the following is correct?',
    'answers': {
      'trueAnswer': 'i = i++1;',
      'wrongAnswer1': 'i += 1;',
      'wrongAnswer2': 'i =+ 1;',
      'wrongAnswer3': '+i+;',
    }  
  },

  {
    'question': 'IsNaN() Evaluates And Argument To Determine if Given Value:',
    'answers': {
      'trueAnswer': 'Is Not a Number',
      'wrongAnswer1': 'Is Not a New Object',
      'wrongAnswer2': 'Is Not a Null',
      'wrongAnswer3': 'None Of The Above',
    }  
  },

  {
    'question': 'Which Of The Dialog Box Display a Message And a Data Entry Field?',
    'answers': {
      'trueAnswer': 'Alert()',
      'wrongAnswer1': 'Prompt()',
      'wrongAnswer2': 'Confirm()',
      'wrongAnswer3': 'Msg()',
    }  
  },

  {
    'question': 'A Function Associated With An object is Called:',
    'answers': {
      'trueAnswer': 'Method',
      'wrongAnswer1': 'Function',
      'wrongAnswer2': 'Link',
      'wrongAnswer3': 'None',
    }  
  },

  /* {
    'question': '',
    'answers': {
      'trueAnswer': '',
      'wrongAnswer1': '',
      'wrongAnswer2': '',
      'wrongAnswer3': '',
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
  allDone.setAttribute('style', 'display: none');
  goBack.setAttribute('style', 'display: none');
  clearScores.setAttribute('style', 'display: none');
  paragraph.setAttribute('style', 'display: flex');
  startButton.setAttribute('style', 'display: flex')
}

// submitInitals function
function submitInitals(event) {
  event.preventDefault()
  //console.log(initalsInput.value)
  storeScore(initalsInput.value);
  allDone.setAttribute('style', 'display: none')
  highscores();
}

// startGame function
function startGame() {
  countdown();
  startButton.setAttribute('style', 'display: none');
  paragraph.setAttribute('style', 'display: none');
  drawGame();
  button1.addEventListener("click", checkAnswer);
  button2.addEventListener("click", checkAnswer);
  button3.addEventListener("click", checkAnswer);
  button4.addEventListener("click", checkAnswer);
  dev1.addEventListener("click", function() {time = time + 60});
  dev2.addEventListener("click", function() {time = time - 30});
  dev3.addEventListener("click", gameOver);
}

// highscores function
function highscores() {
  goBack.setAttribute('style', 'display: flex');
  clearScores.setAttribute('style', 'display: flex');
  TorF.setAttribute('style', 'display: none');
  button1.setAttribute('style', 'display: none');
  button2.setAttribute('style', 'display: none');
  button3.setAttribute('style', 'display: none');
  button4.setAttribute('style', 'display: none');
  startButton.setAttribute('style', 'display: none');
  timeRem.setAttribute('style', 'display: none');
  startButton.setAttribute('style', 'display: none');
  ol.setAttribute('style', 'display: none');
  hsList.setAttribute('style', 'display: flex');
  localScores = JSON.parse(localStorage.getItem('scores')) || [];
  question.textContent = 'Highscores';
  goBack.textContent = 'Go Back';
  clearScores.textContent = 'Clear Highscores';
  // Render a new li for each score indx
  for (var i = 0; i < localScores.length; i++) {
    let score = localScores[i];

    let li = document.createElement("li");
    li.textContent = (i + 1) + '.' + score;
    li.setAttribute("data-index", i);
    li.setAttribute('style', 'font-size: 150%');
    hsList.appendChild(li);
  }
  goBack.addEventListener('click', init);
}

// Draw game function
function drawGame() {
  hsList.setAttribute('style', 'display: none');
  ranQuestion = randomizer()
  // console.log(answersArr);
  question.textContent = ranQuestion.question;
  ol.setAttribute('style', 'display: flex')
  button1.textContent = '1. ' + answerRandomizer();
  button2.textContent = '2. ' + answerRandomizer();
  button3.textContent = '3. ' + answerRandomizer();
  button4.textContent = '4. ' + values[0];
  button1.setAttribute('style', 'display: flex');
  button2.setAttribute('style', 'display: flex');
  button3.setAttribute('style', 'display: flex');
  button4.setAttribute('style', 'display: flex');
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
    drawGame();
    return true;
  } else {
    TorF.textContent = 'Incorrect!';
    TorF.setAttribute('style', 'font-style: italic');
    time = time - 10
    drawGame();
    return false;
  }
}

// Function store score
function storeScore(initals) {
  if (isNaN(initals)) {
    let score = initals + ': ' + time
    console.log(score)
    console.log(localScores)
    localScores = JSON.parse(localStorage.getItem('scores')) || [];
    localScores.push(score);
    localStorage.setItem("scores", JSON.stringify(localScores));
  } else {
    alert('ERROR NOT A VALID CHARACTER')
  }
}

// Function clear highscores
function clearHighscores() {

}

// Game over function
function gameOver() {
  local = JSON.parse(localStorage.getItem('scores'));
  paragraph.setAttribute('style', 'display: none');
  ol.setAttribute('style', 'display: none');
  question.textContent = 'All Done!';
  initalsLabel.setAttribute('style', 'display: flex');
  initalsLabel.textContent = 'Enter initals: ';
  initalsSubmit.textContent = 'Submit';
  allDone.setAttribute('style', 'display: flex');
  initalsSubmit.addEventListener("click", submitInitals);
}

// randomizer function
function randomizer() {
  
  for(let q = 0; q < 15; q++){
    let ranQuestion = (questionsArr[Math.floor(Math.random() * questionsArr.length)]);
    // console.log(ranQuestion)
    values = Object.values(ranQuestion.answers);
    return ranQuestion;
  }
  if(q = 14) {
    gameOver();
  }
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
function countdown() {
  let timeInterval = setInterval(function () {
    time--;
    // As long as the `time` is greater than 1
    if (time > 1) {
      // Set the `textContent` of `time` to show the remaining seconds
      /* console.log(time) */
      timeRem.textContent = 'Time: ' + time + ' seconds';
      // Decrement `time` by 1
    }else if (time === 1) {
      console.log(time)
      // When `time` is equal to 1, rename to 'second' instead of 'seconds'
      timeRem.textContent = 'Time: ' + time + ' second';
    }else {
      timeRem.textContent = '';
      console.log(time)
      clearInterval(timeInterval);
      gameOver();
    }
    if (question.textContent == 'All Done!') {
      clearInterval(timeInterval);
    }
  }, 1000);
}

init();
button1.addEventListener("click", this.checkAnswer);
button2.addEventListener("click", this.checkAnswer);
button3.addEventListener("click", this.checkAnswer);
button4.addEventListener("click", this.checkAnswer);
viewHighscores.addEventListener("click", highscores)