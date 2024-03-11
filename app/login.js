const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const signInButton = document.getElementById('sign-in-button');

signInButton.addEventListener('click', () => {
    checkCredentials(usernameInput.value, passwordInput.value);
});

function checkCredentials(username, password) {
    if (username === 'student' && password === 'student') {
        window.location.href = 'index.html';
    } else if (username === 'profesor' && password === 'profesor') {
        window.location.href = 'teacher.html';
    } else {
        alert('User not found!');
    }
}