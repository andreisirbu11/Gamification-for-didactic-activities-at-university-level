function showAchievementDetails(details) {
   
    document.getElementById('popup-text').textContent = details;

    
    document.getElementById('popup-container').style.display = 'flex';
}

function closePopup() {
    
    document.getElementById('popup-container').style.display = 'none';
}
