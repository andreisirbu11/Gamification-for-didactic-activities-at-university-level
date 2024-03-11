function handleClick(squareNumber) {

    console.log(squareNumber);
    
    var modalContainer = document.getElementById("modalContainer");
    var overlay = document.getElementById("overlay");
    var modal = document.getElementById("myModal");
    var isOpen = modalContainer.style.display === "flex";
    
    if (!isOpen) {
        modalContainer.style.display = "flex";
        modal.style.display = "block";
        overlay.style.display = "block";
        
        document.querySelectorAll(".menu-item").forEach(function(item) {
            item.style.pointerEvents = "none";
        });
        squareCheck(squareNumber);
    } else {
        modalContainer.style.display = "none";
        document.getElementById("tournament-body").classList.remove("modal-open");
        overlay.style.display = "none";
        
    }

    var clickedSquare = document.querySelector('.square:nth-child(' + squareNumber + ')');
    clickedSquare.classList.toggle('clicked', isOpen);
   
}



function enterTournee() {
    var modalContainer = document.getElementById("modalContainer");
    var modal = document.getElementById("myModal");

    var largerContent = `
        <div class="modal-header" id="modal-header">
            <h1>General knowledge tournament</h1>
                <span class="exit-button" onclick="closeModal()">
                    <img src="./images/exit.png" alt="Close Icon">
                </span>
        </div>
        <div class="question" id="modal-quest">
            <h2>Urmeaza 5 intrebari random din diferite categorii.</h2>
            <p> Sunt intrebari cu un singur raspuns corect!</br>
            Nu poti raspunde din nou la o intrebare daca dai skip.</br>
            Pentru a da skip apasa butonul next.</br>
            Unele intrebari sunt grila iar altele trebuie sa scrii raspunsul.</br>
            Pentru a contiuna apasa butonul next.</br>
            Daca vrei sa reununti apasa exit.</br></p>
        </div>
        <span class="next-button" id="next-button" onclick="nextQuestion()">
                <img src="./images/next.png" alt="Next Icon">
            </span>
    `;

    
    modal.innerHTML = largerContent;

    modal.style.width = "800px";
    modal.style.height = "400px";
    modalContainer.style.width = "75%";

    modalContainer.style.display = "block";
}

var currentQuestionIndexTournee = 0;
var isFirstQuestion = true;

function nextQuestion() {
    var question = document.getElementById("modal-quest");
    var nextQ = document.getElementById("next-button");

    question.innerHTML = '<h2>Waiting for other participants</h2>';
    nextQ.style.visibility = 'hidden';
    
    if (isFirstQuestion) {
        setTimeout(function() {
            showNextQuestion();
            nextQ.style.visibility = 'visible';
        }, 3000);
    } else {
        showNextQuestion();
        nextQ.style.visibility = 'visible';
    }

    function showNextQuestion() {
        question.innerHTML = '';

        var questionsArray = [
            {
                text: "Care dintre imaginile prezentate este un GPU?",
                answers: [
                    "./images/gpu.png",
                    "./images/motherboard.png"
                ]
            },
            {
                text: "Care dintre limbajele prezentate este OOP?",
                answers: [
                    "./images/c++.png",
                    "./images/c.png"
                ]
            },
            {
                text: "Care este folosit pentru manipularea paginii?",
                answers: [
                    "./images/css.png",
                    "./images/html.png"
                ]
            },
            {
                text: "Care este capitala Franței?",
                type: "text-input",
                correctAnswer: "Paris"
            },
            {
                text: "2+2*2-1?",
                type: "text-input",
                correctAnswer: "5"
            }
        ];

        if (currentQuestionIndexTournee < questionsArray.length) {
            var currentQuestion = questionsArray[currentQuestionIndexTournee];

            var nextQuestionContent = "";

            if (currentQuestion.type === "text-input") {
                nextQuestionContent = `
                    <h2 class="question-text">${currentQuestion.text}</h2>
                    <div class="text-quest">
                        <input type="text" id="textAnswer" placeholder="Introduceți răspunsul">
                    </div> 
                `;
            } else {
                nextQuestionContent = `
                    <h2 class="question-text">${currentQuestion.text}</h2>
                    <div class="tournament-answer">
                        <span onclick="nextQuestion()">
                            <img src="${currentQuestion.answers[0]}" alt="Answer 1">
                        </span>
                        <span onclick="nextQuestion()">
                        <img src="${currentQuestion.answers[1]}" alt="Answer 2">
                           
                        </span>
                    </div>
                `;
            }

            question.innerHTML = nextQuestionContent;
            currentQuestionIndexTournee++;
            isFirstQuestion = false;
        } else {
            nextQ.style.visibility='hidden';
            question.innerHTML = `<h2>Întrebările s-au terminat!</h2>
            <h3>X/5 Raspunsuri corecte</h3>
            <div class="tournament-answer">
            <img src="./images/bravo.png" alt="Congrats">
            </div>
            `;
        }
    }
}


function closeModal() {
    console.log(currentQuestionIndexTournee);
    if (currentQuestionIndexTournee > 0) {
        showConfirmationModal();
    } else {
        closeTournamentModal();
        currentQuestionIndexTournee=0;
    }
}

function closeTournamentModal() {
    var modalContainer = document.getElementById("modalContainer");
    var modal = document.getElementById("myModal");

    if (modalContainer) {
        modalContainer.style.display = "none";
        document.getElementById("tournament-body").classList.remove("modal-open");
    }

    var overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "none";
    }

    document.querySelectorAll(".menu-item").forEach(function(item) {
        item.style.pointerEvents = "auto";
    });

    
    currentQuestionIndexTournee = 0;

    
    hideConfirmationModal();
}

function showConfirmationModal() {
    var confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
        
        confirmationModal.innerHTML = `
            <div class="modal-content" id="addContainer">
                <h3>Are you sure you want to leave?</h3>
                <button class="accept-button" onclick="confirmLeave()">Yes</button>
                <button class="cancel-button" onclick="cancelLeave()">No</button>
            </div>
        `;

        confirmationModal.style.display = "block";
        confirmationModal.style.visibility = 'visible';
    }
}


function confirmLeave() {
    closeTournamentModal();
    hideConfirmationModal();
}

function cancelLeave() {
    hideConfirmationModal();
}

function hideConfirmationModal() {
    var confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
        confirmationModal.style.display = "none";
        confirmationModal.style.visibility = 'hidden';
    }
}


function squareCheck(squareNumber) {
    var modalContainer = document.getElementById("modalContainer");
    var modal = document.getElementById("myModal");
    var modalContent = document.querySelector(".modal-content");

    console.log(modalContainer, modal, modalContent);


    switch (squareNumber) {
        case 1:
            modalContent.innerHTML = `
            <div class="addContainer" id="addContainer">
                <span class="close" onclick="closeModal()"><img src="./images/close-icon.png" alt="Close Icon"></span>
                <h3>Press the like button to participate in the turnee</h3>
                <span class="accept" onclick="enterTournee()">
                    <img src="./images/social.png" alt="Accept Icon">
                </span>           
             </div>
        `;
            break;

        case 2:
            modalContent.innerHTML = `
            <span class="close" onclick="closeTournamentModal()"><img src="./images/close-icon.png" alt="Close Icon"></span>
                <h3>There are no tournaments related to hardware at the moment</h3>
            `;
            break;

        case 3:
            modalContent.innerHTML = `
            <span class="close" onclick="closeTournamentModal()"><img src="./images/close-icon.png" alt="Close Icon"></span>
                <h3>There are no tournaments related to mathemathics at the moment</h3>
            `;
            break;

        case 4:
            modalContent.innerHTML = `
            <span class="close" onclick="closeTournamentModal()"><img src="./images/close-icon.png" alt="Close Icon"></span>
                <h3>There are no tournaments related to programming at the moment</h3>
            `;
            break;
        case 5:
            modalContent.innerHTML = `
            <span class="close" onclick="closeTournamentModal()"><img src="./images/close-icon.png" alt="Close Icon"></span>
                <h3>There are no tournaments related interfaces at the moment<h3p>
            `;
            break;

        default:
           
            console.log("Invalid squareNumber.");
            break;
    }

    modal.style.width="200px";
    modal.style.height="100px";
    modal.innerHTML = '';
    modal.appendChild(modalContent);
   


    modalContainer.style.display = "flex";
    modal.style.display = "block";
}





