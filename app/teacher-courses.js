document.getElementById('add-course').addEventListener('click', function () {
    var popUp = document.getElementById("add-course-pop-up");
    popUp.style.display = "block";
    var overlay = document.querySelector('.courses-overlay');
    popUp.classList.add('show');
    overlay.classList.add('show');
});

function openPopup() {
    document.getElementById("courses-overlay").style.display = "block";
    document.getElementById("add-course-pop-up").style.display = "block";
}

function closePopup() {
    var popUp = document.getElementById("add-course-pop-up");
    popUp.style.display = "none";
    var overlay = document.querySelector('.courses-overlay');
    popUp.classList.remove('show');
    overlay.classList.remove('show');
}

function addCourse() {
    var courseName = document.getElementById("course-name").value;
    console.log(courseName);
    var year = document.getElementById("year").value;
    
    var newCourseCard = document.createElement("div");
    newCourseCard.className = "course-card";

    
    var newCourseTitle = document.createElement("h2");
    newCourseTitle.textContent = courseName;
    var newCourseYear = document.createElement("p");
    newCourseYear.textContent = year;

    
    newCourseCard.appendChild(newCourseTitle);
    newCourseCard.appendChild(newCourseYear);

    
    document.getElementById("courses").appendChild(newCourseCard);
    console.log(newCourseCard)

    closePopup();
}

function openSD() {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
        mainContainer.style.display = "none";
    }
    document.getElementById("sd-content").style.display = "block";
}

function openPIU() {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
    mainContainer.style.display = "none";
    }
    document.getElementById("piu-content").style.display = "block";
}

function searchParticipants() {
    var input, filter, ul, li, img, p, i, txtValue;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    ul = document.getElementById('participants-list');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        img = li[i].getElementsByTagName('img')[0];
        p = li[i].getElementsByTagName('p')[0];
        txtValue = p.textContent || p.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

function openAddParticipantModal() {
    document.getElementById("overlay-AS").style.display = "block";
    document.getElementById('addParticipantModal').style.display = 'block';
}

function closeAddParticipantModal() {
    document.getElementById("overlay-AS").style.display = "none";
    document.getElementById('addParticipantModal').style.display = 'none';
}

function addParticipant(studentName) {
    
    var participantList = document.getElementById('participants-list');
    var participants = participantList.getElementsByTagName('li');

    for (var i = 0; i < participants.length; i++) {
        var existingName = participants[i].getElementsByTagName('p')[0].textContent;
        if (existingName === studentName) {
            alert(studentName + ' is already enrolled in the course!');
            return; 
        }
    }

   
    var ul = document.getElementById('participants-list');
    var li = document.createElement('li');

    var img = document.createElement('img');
    img.src = './images/user.png'; 
    img.alt = 'Profil Nou';
    img.style.maxWidth = '20px';
    img.style.borderRadius = '50%';

    var p = document.createElement('p');
    p.textContent = studentName;

    li.appendChild(img);
    li.appendChild(p);
    ul.appendChild(li);

    document.getElementById("overlay-AS").style.display = "none";
    closeAddParticipantModal();
}


document.getElementById('searchStudent').addEventListener('input', function () {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchStudent');
    filter = input.value.toUpperCase();
    ul = document.getElementById('studentList');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
});

function uploadMaterial() {
    var fileInput = document.getElementById('materialFile');
    var uploadedMaterialsList = document.getElementById('uploadedMaterialsList');

   
    if (fileInput.files.length > 0) {
        var materialFile = fileInput.files[0];

        
        var li = document.createElement('li');
        li.textContent = materialFile.name;

        
        uploadedMaterialsList.appendChild(li);

       
    } else {
        alert('Choose a file to upload.');
    }
}
