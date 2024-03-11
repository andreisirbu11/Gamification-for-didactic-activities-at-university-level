let quizDataCpe = {
  title: "",
  questions: [],
};

function openCreateQuizModalCpe() {
  document.getElementById("create-quiz-modal-cpe").style.display = "flex";
}

function closeCreateQuizModalCpe() {
  document.getElementById("create-quiz-modal-cpe").style.display = "none";
}

function addAnswerCpe() {
  const answerContainer = document.getElementById("answer-container-cpe");
  const answerBlock = document.createElement("div");
  answerBlock.className = "answer-block-cpe";

  const answerInput = document.createElement("input");
  answerInput.type = "text";
  answerInput.name = "quizAnswer";
  answerInput.placeholder = "Answer";
  answerBlock.appendChild(answerInput);

  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "correctAnswer";
  radioInput.value = answerContainer.children.length;
  answerBlock.appendChild(radioInput);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-answer-btn-cpe";
  deleteBtn.onclick = function () {
    answerBlock.remove();
    updateRadioValuesCpe();
  };

  answerBlock.appendChild(deleteBtn);
  answerContainer.appendChild(answerBlock);
}

function updateRadioValuesCpe() {
  const allRadioInputs = document.querySelectorAll(
    '#answer-container-cpe .answer-block-cpe input[type="radio"]'
  );
  allRadioInputs.forEach((radioInput, index) => {
    radioInput.value = index;
  });
}

function addQuestionCpe() {
  const questionText = document.getElementById("quiz-question-cpe").value;
  const answerElements = document.querySelectorAll(
    '.answer-block-cpe input[type="text"]'
  );
  const correctAnswerElement = document.querySelector(
    '.answer-block-cpe input[type="radio"]:checked'
  );

  let answers = Array.from(answerElements).map((input) => input.value);
  let correctAnswer = correctAnswerElement ? correctAnswerElement.value : null;

  quizDataCpe.questions.push({
    questionText,
    answers,
    correctAnswer,
  });

  document.getElementById("quiz-question-cpe").value = "";
  document.getElementById("answer-container-cpe").innerHTML = "";
}

function nextQuestionCpe() {
  addQuestionCpe();
  console.log(quizDataCpe);
}

document
  .getElementById("create-quiz-form-cpe")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addQuestionCpe(); 
    showQuizSummaryCpe(); 
    closeCreateQuizModalCpe(); 
    event.target.reset(); 
    quizDataCpe = { title: "", questions: [] };
  });

function showQuizSummaryCpe() {
  let summaryContent = document.getElementById("quiz-summary-content-cpe");
  summaryContent.innerHTML = ""; 

  quizDataCpe.questions.forEach((question, index) => {
    let questionElement = document.createElement("div");
    questionElement.innerHTML = `<h3>Question ${index + 1}: ${
      question.questionText
    }</h3>`;

    let answersList = document.createElement("ul");
    question.answers.forEach((answer) => {
      let answerItem = document.createElement("li");
      answerItem.textContent = answer;
      answersList.appendChild(answerItem);

      if (question.correctAnswer === answer) {
        answerItem.style.fontWeight = "bold";
        answerItem.style.color = "green";
      }
    });

    questionElement.appendChild(answersList);
    summaryContent.appendChild(questionElement);
  });


  document.getElementById("quiz-summary-modal-cpe").style.display = "flex";
}

function closeQuizSummaryModalCpe() {
  document.getElementById("quiz-summary-modal-cpe").style.display = "none";
}

////////////////////////////////////////////////// Turneu


function openCreateTournamentModalCpe() {
  document.getElementById("create-tournament-modal-cpe").style.display = "flex";
}


function closeCreateTournamentModalCpe() {
  document.getElementById("create-tournament-modal-cpe").style.display = "none";
}


function nextCreateTournamentCpe() {
  var title = document.getElementById("tournament-title-cpe").value;
  var description = document.getElementById("tournament-description-cpe").value;
  var icon = document.getElementById("tournament-icon-cpe").files[0];

  
  console.log("Tournament Title:", title);
  console.log("Description:", description);
  console.log("Icon:", icon);

  
  closeCreateTournamentModalCpe();

  
  openAddQuestionModalCpe();
  
}


document
  .getElementById("overlay")
  .addEventListener("click", closeCreateTournamentModalCpe);

function openAddQuestionModalCpe() {
  document.getElementById("add-question-modal-cpe").style.display = "flex";
}

function closeAddQuestionModalCpe() {
  document.getElementById("add-question-modal-cpe").style.display = "none";
}

document
  .getElementById("toggle-answer-type-cpe")
  .addEventListener("change", function () {
    var textAnswer = document.getElementById("text-answer-cpe");
    var pictureAnswers = document.getElementById("picture-answers-cpe");

   
    if (this.checked) {
      textAnswer.style.display = "none";
      pictureAnswers.style.display = "block";
    } else {
      textAnswer.style.display = "block";
      pictureAnswers.style.display = "none";
    }
  });

document
  .getElementById("add-question-form-cpe")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const questionText = document.getElementById("question-text-cpe").value;
    const textAnswer = document.getElementById("text-answer-input-cpe").value;
    const pictureAnswer1 = document.getElementById("picture-answer-1-cpe")
      .files[0];
    const pictureAnswer2 = document.getElementById("picture-answer-2-cpe")
      .files[0];
    const isPictureAnswer = document.getElementById(
      "toggle-answer-type-cpe"
    ).checked;

  
    console.log("Question Text:", questionText);
    if (isPictureAnswer) {
      console.log("Picture Answer 1:", pictureAnswer1);
      console.log("Picture Answer 2:", pictureAnswer2);
    } else {
      console.log("Text Answer:", textAnswer);
    }

   
    closeAddQuestionModalCpe();
    event.target.reset();
  });

let currentQuestionsCpe = [];

function addNextQuestionCpe() {
  const questionText = document.getElementById("question-text-cpe").value;
  const textAnswer = document.getElementById("text-answer-input-cpe").value;
  const isPictureAnswer = document.getElementById(
    "toggle-answer-type-cpe"
  ).checked;
  let pictureAnswer1, pictureAnswer2;

  if (isPictureAnswer) {
    pictureAnswer1 = document.getElementById("picture-answer-1-cpe").files[0];
    pictureAnswer2 = document.getElementById("picture-answer-2-cpe").files[0];
  }

  const newQuestion = {
    questionText,
    textAnswer,
    isPictureAnswer,
    pictureAnswer1,
    pictureAnswer2,
  };

  currentQuestionsCpe.push(newQuestion);

  
  document.getElementById("question-text-cpe").value = "";
  if (isPictureAnswer) {
    document.getElementById("picture-answer-1-cpe").value = "";
    document.getElementById("picture-answer-2-cpe").value = "";
  } else {
    document.getElementById("text-answer-input-cpe").value = "";
  }
  document.getElementById("toggle-answer-type-cpe").checked = false;
  
  document.getElementById("text-answer-cpe").style.display = "block";
  document.getElementById("picture-answers-cpe").style.display = "none";

  console.log("Current Questions:", currentQuestionsCpe);
}

function finishCreatingTournamentCpe() {
  
  console.log("Final Questions:", currentQuestionsCpe);
  
  closeAddQuestionModalCpe();
  currentQuestionsCpe = [];
}


