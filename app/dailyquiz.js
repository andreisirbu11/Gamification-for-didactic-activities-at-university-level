function openCreateDailyQuizModalCpe() {
    document.getElementById('create-daily-quiz-modal-cpe').style.display = 'flex';
}

function closeCreateDailyQuizModalCpe() {
    document.getElementById('create-daily-quiz-modal-cpe').style.display = 'none';
}

document.getElementById('create-daily-quiz-form-cpe').addEventListener('submit', function(event) {
    event.preventDefault();

    const dailyQuizDate = document.getElementById('daily-quiz-date-cpe').value;
    const dailyQuizQuestion = document.getElementById('daily-quiz-question-cpe').value;
    const dailyQuizAnswer = document.getElementById('daily-quiz-answer-cpe').value;

   
    console.log('Creating Daily Quiz for:', dailyQuizDate);
    console.log('Question:', dailyQuizQuestion);
    console.log('Answer:', dailyQuizAnswer);

    closeCreateDailyQuizModalCpe();
    event.target.reset();
});
