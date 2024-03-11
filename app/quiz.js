let totalQuestions = 5;
let pointsPerQuestion = 10;
let answeredQuestions = 0;
let correctAnswers = 0;
let selectedAnswerIndex = null;
let totalPoints = 0;
let currentQuestionIndex;

const submitAnswerButton = document.getElementById("submit-answer-button-cpe");
const nextQuestionButton = document.getElementById("next-question-button-cpe");
const viewResultsButton = document.getElementById("view-results-button-cpe");

let questions_sd = [
  {
    id: 1,
    question_text: "What is a common use of a distributed system?",
    options: [
      "Local data storage",
      "Single user applications",
      "Web services",
      "Desktop publishing",
    ],
    correct_option: "Web services",
  },
  {
    id: 2,
    question_text: "What is a key benefit of distributed computing?",
    options: [
      "Simpler algorithms",
      "Centralized management",
      "Data redundancy",
      "Scalability",
    ],
    correct_option: "Scalability",
  },
  {
    id: 3,
    question_text: "Which of these is an example of a distributed system?",
    options: [
      "A single laptop",
      "A standalone server",
      "A blockchain",
      "A USB flash drive",
    ],
    correct_option: "A blockchain",
  },
  {
    id: 4,
    question_text: "In a distributed system, what does 'fault tolerance' mean?",
    options: [
      "The system can function despite component failures",
      "The system is free from errors",
      "The system can prevent hacking attempts",
      "The system requires no maintenance",
    ],
    correct_option: "The system can function despite component failures",
  },
  {
    id: 5,
    question_text:
      "What does 'load balancing' refer to in a distributed system?",
    options: [
      "Balancing the power supply",
      "Distributing tasks evenly across servers",
      "Ensuring equal data storage",
      "Balancing the system temperature",
    ],
    correct_option: "Distributing tasks evenly across servers",
  },
];
let results = [];
currentQuestionIndex = 0;

let questions = [];

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("activitatea1")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("inner-popup-cpe").style.display = "block";
      document.getElementById("quizPopup-quiz-cpe").style.display = "flex";
      questions = questions_sd;
    });
});

function closePopupCpe() {
  document.getElementById("quizPopup-quiz-cpe").style.display = "none";
}

function startQuizCpe() {
  document.getElementById("inner-popup-cpe").style.display = "none";
  document.getElementById("quiz-container-cpe").style.display = "block";
  questions = questions_sd;
  correctAnswers = 0;
  
  displayQuestion();
}

function closeQuizPopupCpe() {
  document.getElementById("quizPopupQuiz-cpe").style.display = "none";
}

function submitQuizCpe() {
  
  console.log("Răspunsuri trimise!");
  
  closeQuizPopupCpe();
}

function displayQuestion() {
  if (questions.length === 0) {
    console.error("No questions to display");
    return;
  }

  currentQuestionIndex = Math.floor(Math.random() * questions.length);
  const question = questions[currentQuestionIndex];

  document.getElementById("question-cpe").innerText = question.question_text;
  const choicesList = document.getElementById("choices-cpe");
  choicesList.innerHTML = "";

 
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerText = option;
    li.dataset.choiceIndex = index;
    li.addEventListener("click", function () {
      selectAnswer(index, li);
    });
    choicesList.appendChild(li);
  });

  updateQuestionCounter();
  selectedAnswerIndex = null;
  submitAnswerButton.disabled = true;
}

function updateQuestionCounter() {
  document.getElementById(
    "question-counter-cpe"
  ).innerText = `${++answeredQuestions} / ${totalQuestions}`;
}

function selectAnswer(index, liElement) {
  document.querySelectorAll("#choices-cpe li").forEach((li) => {
    li.classList.remove("selected");
  });
  selectedAnswerIndex = index;
  liElement.classList.add("selected");
  submitAnswerButton.disabled = false;
}

submitAnswerButton.addEventListener("click", () => {
  const question = questions[currentQuestionIndex];
  const selectedOption = question.options[selectedAnswerIndex];
  const selectedOptionElement = document.querySelector(
    `[data-choice-index="${selectedAnswerIndex}"]`
  );

  if (selectedOption === question.correct_option) {
    correctAnswers++;
    totalPoints += pointsPerQuestion;
    selectedOptionElement.classList.add("correct");
  } else {
    selectedOptionElement.classList.add("incorrect");
    const correctIndex = question.options.indexOf(question.correct_option);
    document
      .querySelector(`[data-choice-index="${correctIndex}"]`)
      .classList.add("correct");
  }

  document.querySelectorAll("#choices-cpe li").forEach((li) => {
    li.classList.add("no-hover");
  });

  document.getElementById(
    "score-cpe"
  ).innerText = `Correct answers: ${correctAnswers}`;

  results.push({
    question: question.question_text,
    selected: selectedOption,
    correct: question.correct_option,
    isCorrect: selectedOption === question.correct_option,
  });
  submitAnswerButton.style.display = "none";
  if (totalQuestions === answeredQuestions || questions.length === 0) {
    showFinishButton();
  } else {
    nextQuestionButton.style.display = "block";
  }
});

nextQuestionButton.addEventListener("click", () => {
  questions.splice(currentQuestionIndex, 1);
  if (questions.length === 0) {
    showFinishButton();
  } else {
    displayQuestion();
  }
  document.querySelectorAll("#choices-cpe li").forEach((li) => {
    li.classList.remove("no-hover", "selected", "correct", "incorrect");
  });

  nextQuestionButton.style.display = "none";
  submitAnswerButton.style.display = "block";
});

function showFinishButton() {
  const finishButton = document.getElementById("finish-button-cpe");
  submitAnswerButton.style.display = "none";
  nextQuestionButton.style.display = "none";
  finishButton.style.display = "block";
  finishButton.addEventListener("click", showFinalScore);
}

function showFinalScore() {
  document.getElementById("quiz-container-cpe").style.display = "none";
  document.getElementById("submit-answer-button-cpe").style.display = "none";
  document.getElementById("next-question-button-cpe").style.display = "none";

 
  const grade = Math.round((correctAnswers / totalQuestions) * 10);
  const totalPointsRounded = Math.round(totalPoints);

  const finalScoreCard = document.getElementById("final-score-card-cpe");
  finalScoreCard.querySelector(
    "#correct-answers-cpe span"
  ).textContent = `${correctAnswers} / ${totalQuestions}`;
  finalScoreCard.querySelector(
    "#final-score-cpe span"
  ).textContent = `${totalPointsRounded}`;
  finalScoreCard.querySelector(
    "#final-grade-cpe span"
  ).textContent = `${grade}`;

  finalScoreCard.style.display = "block";
}

viewResultsButton.addEventListener("click", () => {
  const finalScoreCard = document.getElementById("final-score-card-cpe");
  finalScoreCard.style.display = "none";

  displayAllResults();
});

function displayAllResults() {
  const resultsContainer = document.getElementById("results-container-cpe");

  results.forEach((result, index) => {
    const questionElem = document.createElement("div");
    questionElem.classList.add("result-question-cpe");
    questionElem.innerHTML = `
            <h3>Question ${index + 1}: ${result.question}</h3>
            <p>Your Answer: ${result.selected}</p>
            <p>Correct Answer: ${result.correct}</p>
            <p>${result.isCorrect ? "Correct" : "Incorrect"}</p>`;
    resultsContainer.appendChild(questionElem);
  });

  const finishReviewButton = document.createElement("button");
  const feedbackbutton = document.createElement("button");
  finishReviewButton.textContent = "Finish Review";
  finishReviewButton.id = "finish-review-button-cpe";
  feedbackbutton.textContent = "Feedback";
  feedbackbutton.id = "feedback-button-cpe";
  finishReviewButton.addEventListener("click", function () {
    document.getElementById("quizPopup-quiz-cpe").style.display = "none";
    document.getElementById("results-container-cpe").style.display = "none";
    totalQuestions = 5;
    pointsPerQuestion = 10;
    answeredQuestions = 0;
    correctAnswers = 0;
    selectedAnswerIndex = null;
    totalPoints = 0;
    currentQuestionIndex = 0;
    results = [];
    questions = [];
    results.innerHTML = ``;
  });

  feedbackbutton.addEventListener("click", function () {
    document.getElementById("feedback-popup-cpe").style.display = "flex";
  });

  const btndiv = document.createElement("div");
  btndiv.classList.add("btn-div-cpe");
  btndiv.appendChild(finishReviewButton);
  btndiv.appendChild(feedbackbutton);

  resultsContainer.appendChild(btndiv);

  resultsContainer.style.display = "block";
}

function closeFeedbackPopupCpe() {
  document.getElementById("feedback-popup-cpe").style.display = "none";
}

function submitFeedbackCpe() {
  var feedbackText = document.getElementById("feedback-textarea-cpe").value;
  console.log(feedbackText);
  closeFeedbackPopupCpe();
}
