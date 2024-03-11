
localStorage.setItem("countdown", 61);


function startOrResumeCountdown() {
    var countdown = localStorage.getItem("countdown");
  
   
    if (countdown !== null && !isNaN(countdown) && countdown > 0) {
        startCountdown(parseInt(countdown, 10));
    }
  }
  

  function startCountdown(initialValue) {
    var countdown = initialValue;
  
    var countdownInterval = setInterval(function () {
        countdown--;
        var minutes = Math.floor(countdown / 60);
        var seconds = countdown % 60;
        document.getElementById("countdown").innerText = "Time left: " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  
        
        localStorage.setItem("countdown", countdown);
  
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          document.getElementById("raspuns").disabled = true;
          document.getElementById("trimiteButton").disabled = true;
          document.getElementById("message").innerText = "Time has expired.";
        }
    }, 1000);
  }
  
  
  function showDailyChallengePopUp() {
    var popUp = document.getElementById("daily-challenge-answer");
    popUp.style.display = "block";
    var overlay = document.querySelector('.overlay');
    popUp.classList.add('show');
    overlay.classList.add('show');
  
    startOrResumeCountdown(); 
  }
  
  function closeDailyChallengePopUp() {
    var popUp = document.getElementById("daily-challenge-answer");
    popUp.style.display = "none";
    var overlay = document.querySelector('.overlay');
    popUp.classList.remove('show');
    overlay.classList.remove('show');
  }
  
 
  document.getElementById("ghicitoare-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    closeDailyChallengePopUp(); 
    
    document.getElementById('start-challenge-btn').disabled = true;
    document.getElementById("warning-message").style.display = "block";
    var currentDayRiddle = document.getElementById("current-day-riddle");
   
    currentDayRiddle.classList.remove("unanswered"); 
    currentDayRiddle.classList.add("answered"); 
    var riddlesParagraph = document.getElementById("riddlesText");
    riddlesParagraph.textContent = "Completed: 1";
    showDailyChallengeAnswerSendNotification();
  });
  
 
  function showDailyChallengeAnswerSendNotification() {
    var notification = document.getElementById("notification");
    notification.style.display = "block";
  
    
    setTimeout(function () {
        notification.style.display = "none";
    }, 2000);
  }