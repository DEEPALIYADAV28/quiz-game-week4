const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('option');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedOption = null; 

async function fetchQuestions() {
  const response = await fetch('/questions');
  const questionsData = await response.json();
  return questionsData;
}

function displayQuestion(question) {
  questionElement.textContent = question.question;
  optionsElement.innerHTML = '';
  selectedOption = null; 

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectOption(button, option));
    optionsElement.appendChild(button);
  });
}

function selectOption(button, option) {
  const buttons = optionsElement.querySelectorAll('button');
  buttons.forEach((btn) => btn.classList.remove('selected'));

  button.classList.add('selected');
  selectedOption = option; 
}

function handleSubmit() {
  if (!selectedOption) {
    alert('Please select an option before submitting!');
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
    alert('Correct!');
  } else {
    alert(`Incorrect! The correct answer was: ${currentQuestion.answer}`);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionElement.textContent = 'Quiz Over!';
  optionsElement.innerHTML = '';
  submitButton.style.display = 'none';
  scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
}

fetchQuestions().then((data) => {
  questions = data;
  if (questions.length > 0) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    questionElement.textContent = 'No questions available!';
  }
});

submitButton.addEventListener('click', handleSubmit);