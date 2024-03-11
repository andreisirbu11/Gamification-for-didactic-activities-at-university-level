function showContent(contentType) {
    console.log(contentType);
    var feedback = document.getElementById("studentFeedback");

    switch (contentType) {
        case 'materials':
            feedback.innerHTML = `
            <h2>Feedback for Materials</h2>
            <div class="material-course-feedback">
                <div id="first-feedback" class="feedback-container" onclick="seen('first-feedback')" >
                    <p>There are missing pages on the materials!! Please check course 3</p>
                    <div class="img-container">
                         <img src="./images/check-mark.png" alt="Checkmark" class="checkmark-icon">
                    </div>
                </div>
                <div id="second-feedback" class="feedback-container" onclick="seen('second-feedback')" >
                    <p>The materials are too old.</p>
                    <div class="img-container">
                        <img src="./images/check-mark.png" alt="Checkmark" class="checkmark-icon">
                    </div>
                </div>
                <div  id="third-feedback" class="feedback-container" onclick="seen('third-feedback')" >
                    <p>Put more links for examples!</p>
                    <div class="img-container">
                    <img src="./images/check-mark.png" alt="Checkmark" class="checkmark-icon">
                    </div>
                </div>
            </div>`;
            break;
        case 'quizzes':
            feedback.innerHTML = `
            <h2>Feedback for Quizzes</h2>
            <div class="material-course-feedback">
                <div id="first-feedback-quizz" class="feedback-container" onclick="seen('first-feedback-quizz')" >
                    <p>The quizzes are too hard.</p>
                <div class="img-container">
                     <img src="./images/check-mark.png" alt="Checkmark" class="checkmark-icon">
                </div>
                </div>
            <div id="second-feedback-quizz" class="feedback-container" onclick="seen('second-feedback-quizz')" >
                <p>The pictures on qizz 10 had a really low resolution.</p>
                <div class="img-container">
                    <img src="./images/check-mark.png" alt="Checkmark" class="checkmark-icon">
                </div>
            </div>
            <div  id="third-feedback-quizz" class="feedback-container" onclick="seen('third-feedback-quizz')" >
                <p>More time!</p>
                <div class="img-container">
                <img src="./images/check-mark.png" alt="Checkmark" class="checkmark-icon">
                </div>
            </div>
        </div>
            `;
            break;
        case 'optimization':
            feedback.innerHTML = `
             <h2>Optimizations</h2>
             <div class="optimization-container">
                ${getStoredFeedbackHTML()}
             </div>
             `;
            
            break;
        case 'guide':
            feedback.innerHTML = `
            <h2>Guide</h2>
            <div class="feedback">
                <p>Select a section to see student feedback</p>
                <p>You can mark the feedback as noted.</p>
                <p>In the Optimization section you can see the noted feedback and if you click on it you can delete it.</p>
            </div>`;
            break;
        default:
            feedback.innerHTML = '<p>Default Content</p>';
            break;
    }
    
}

function seen(elementId) {
    const optimizationContainer = document.querySelector('.optimization-container') || (function () {
        const container = document.createElement('div');
        container.classList.add('optimization-container');
        document.body.appendChild(container);
        return container;
    })();

    const element = document.getElementById(elementId);

    if (element) {
        const isClicked = element.classList.toggle('clicked');
        const feedbackData = {
            id: elementId,
            content: element.innerHTML
        };

        if (isClicked) {
            console.log('Feedback clicked:', elementId);
            sessionStorage.setItem(elementId, JSON.stringify(feedbackData));
            showCustomModal('Feedback added to Optimizations', 2000);
        } else {
            console.log('Feedback unclicked:', elementId);
            sessionStorage.removeItem(elementId);
            const optimizationElement = optimizationContainer.querySelector(`[data-id="${elementId}"]`);
            if (optimizationElement) {
                console.log(optimizationElement);
                optimizationElement.remove();
            }
            showCustomModal('Feedback deleted', 2000, () => {
                optimizationContainer.innerHTML = getStoredFeedbackHTML();
            });
        }
    }
}

function showCustomModal(message, duration, callback) {
    const optimizationContainer = document.querySelector('.optimization-container');
    const modal = document.createElement('div');
    modal.classList.add('custom-modal');
    modal.innerHTML = message;
    optimizationContainer.appendChild(modal);

    setTimeout(() => {
        modal.remove();
        if (callback) {
            callback();
        }
    }, duration);
}

function getStoredFeedbackHTML() {
    var sessionStorageKeys = Object.keys(sessionStorage);

    var feedbackHTML = sessionStorageKeys.map(function (key) {
        var feedbackDataString = sessionStorage.getItem(key);

        try {
            var feedbackData = JSON.parse(feedbackDataString);

            if (feedbackData && typeof feedbackData === 'object' && feedbackData.id && feedbackData.content) {
                var isClicked = sessionStorage.getItem(key) ? 'clicked' : '';
                var iconSrc = './images/alarm.png'; 

              
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(feedbackData.content, 'text/html');

                var paragraphElement = htmlDoc.querySelector('p');

                var html = `<div id="${feedbackData.id}" class="feedback-container ${isClicked}" onclick="seen('${feedbackData.id}')">
                                <div class="text-container">
                                    ${paragraphElement.outerHTML}
                                </div>
                                <div class="img-container">                
                                <img src="${iconSrc}" alt="Icon">
                                </div>
                            </div>`;
               
                return html;
            } else {
                console.error('Invalid feedbackData:', feedbackData);
                return '';
            }
        } catch (error) {
            console.error('Error parsing JSON for key:', key);
            return '';
        }
    }).join('');

    return feedbackHTML;
}






